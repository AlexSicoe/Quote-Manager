import React, { Component } from 'react'
import { EventEmitter } from 'fbemitter'
import ItemStore from '../stores/ItemStore'
import Item from './Item'
import ItemAddForm from './ItemAddForm'

const emitter = new EventEmitter()
const store = new ItemStore(emitter)

class ClientDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
        this.deleteItem = (itemId) => {
            store.deleteOne(this.props.client.id, itemId)
        }
        this.addItem = (item) => {
            console.log('adding for : ' + this.props.client.id)
            store.addOne(this.props.client.id, item)
        }
        this.saveItem = (itemId, item) => {
            store.saveOne(this.props.client.id, itemId, item)
        }
    }
    componentDidMount() {
        store.getAll(this.props.client.id)
        emitter.addListener('ITEM_LOAD', () => {
            this.setState({ items: store.content })
        })
    }
    render() {
        return (<div>
			I am 
			 {" " + this.props.client.name + " "}
		    and I would like to get a quote for the following items:
			<div>
				{this.state.items.map((e) => <Item item={e} onDelete={this.deleteItem} onSave={this.saveItem} key={e.id} />)}
			</div>
			<div>
				<ItemAddForm onAdd={this.addItem} />
			</div>
		</div>)
    }
}

export default ClientDetails
