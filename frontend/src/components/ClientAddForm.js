import React, { Component } from 'react'

class ClientAddForm extends Component {
   constructor(props) {
      super(props)
      this.state = {
         clientName: '',
         clientEmail: ''
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
					Name:
				  <input type="text" value={this.state.clientName} onChange={this.handleInputChange} name="clientName" />
					Email:
					<input type="text" value={this.state.clientEmail} onChange={this.handleInputChange} name="clientEmail" />
					<input type="button" value="add" onClick={() => this.props.onAdd({
						name : this.state.clientName,
						email : this.state.clientEmail
					})} />
				</form>
			</div>
   }
}

export default ClientAddForm
