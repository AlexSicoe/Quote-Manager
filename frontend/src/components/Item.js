import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item,
            isEditing: false,
            itemName: this.props.item.name,
            itemQuantity: this.props.item.quantity,
            itemPrice: this.props.item.price
        }
        this.handleInputChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        console.warn(nextProps)
        this.setState({ item: nextProps.item })
    }
    render() {
        if (!this.state.isEditing) {
            return (
                <div>
  				Item name: {this.props.item.name}, Quantity: {this.props.item.quantity}, Price: ${this.props.item.price}
  				<form>
						<input type="button" value="delete" onClick={() => this.props.onDelete(this.state.item.id)} />
						<input type="button" value="edit" onClick={() => this.setState({isEditing : true})} />
					</form>
  			</div>
            )
        }
        else {
            return (
                //TODO table
                <div>
					<form>
						Name: <input type="text" value={this.state.itemName} onChange={this.handleInputChange} name="itemName" />
						Quantity: <input type="text" value={this.state.itemQuantity} onChange={this.handleInputChange} name="itemQuantity" />
						Price: <input type="text" value={this.state.itemPrice} onChange={this.handleInputChange} name="itemPrice"/>
					  <input type="button" value="save" onClick={() => {
					    this.props.onSave(this.state.item.id, {
		            name : this.state.itemName, 
		            quantity : this.state.itemQuantity,
		            price : this.state.itemPrice
		          })
					    this.setState({isEditing : false})
					  }} />
						<input type="button" value="cancel" onClick={() => this.setState({isEditing : false})} />
					</form>
				</div>
            )
        }
    }
}

export default Item
