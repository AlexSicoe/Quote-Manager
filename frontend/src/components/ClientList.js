import React, { Component } from 'react';
import { EventEmitter } from 'fbemitter'
import ClientAddForm from './ClientAddForm'
import Client from './Client'
import ClientDetails from './ClientDetails'

import ClientStore from '../stores/ClientStore'


const emitter = new EventEmitter()
const store = new ClientStore(emitter)

const deleteClient = (id) => {
  store.deleteOne(id)
}

const addClient = (client) => {
  store.addOne(client)
}

const saveClient = (client, id) => {
  store.saveOne(client, id)
}

class ClientList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: {},
      clients: [],
      detailFor: -1
    }
    this.handleInputChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
    this.details = (id) => {
      store.getOne(id)
      emitter.addListener('SINGLE_CLIENT_LOAD', () => {
        this.setState({
          selected: store.selected,
          detailFor: id
        })
      })
    }
  }
  componentDidMount() {
    store.getAll()
    emitter.addListener('CLIENT_LOAD', () => {
      this.setState({ clients: store.content })
    })
  }
  render() {
    if (this.state.detailFor === -1) {
      return (
        <div className="ClientList">
          <div>
            <h2>Clients</h2>
            {
              this.state.clients.map(
                (a) => <Client client={a} key={a.id} onDelete={deleteClient} onSave={saveClient} onSelect={this.details}/>
            )}
          </div>
          <div>
            <h2>Add client</h2>
            <ClientAddForm onAdd={addClient} />
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <ClientDetails client={this.state.selected}/> 
        </div>)
    }
  }
}

export default ClientList
