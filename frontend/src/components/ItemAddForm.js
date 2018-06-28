import React, { Component } from 'react'


class ItemAddForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemName: '',
            itemQuantity: '',
            itemPrice: ''
        }
        this.handleInputChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }
    render() {
        return <div>
				<form>
					<h4>Add a new item:</h4>
					Item Name:
					<input type="text" value={this.state.itemName} onChange={this.handleInputChange} name="itemName" />
                    Quantity:
					<input type="text" value={this.state.itemQuantity} onChange={this.handleInputChange} name="itemQuantity" />
					Price:
					<input type="text" value={this.state.itemPrice} onChange={this.handleInputChange} name="itemPrice" />
					<input type="button" value="add" onClick={() => this.props.onAdd({
						name : this.state.itemName,
						quantity : this.state.itemQuantity,
						price : this.state.itemPrice
					})} />
				</form>
			
			</div>
    }
}

export default ItemAddForm
