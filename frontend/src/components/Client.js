import React, { Component } from 'react';

class Client extends Component {
  constructor(props) {
    super(props)
    this.state = {
      client: this.props.client,
      isEditing: false,
      clientName: this.props.client.name,
      clientEmail: this.props.client.email
    }
    this.handleInputChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ client: nextProps.client })
  }
  render() {
    if (!this.state.isEditing) {
      return (
        <div>
  				client: {this.state.client.name} <br/> email: {this.state.client.email}
  				<form>
						<input type="button" value="delete" onClick={() => this.props.onDelete(this.state.client.id)} />
						<input type="button" value="edit" onClick={() => this.setState({isEditing : true})} />
						<input type="button" value="details" onClick={() => this.props.onSelect(this.state.client.id)} />
					</form>
  			</div>
      )
    }
    else {
      return (
        <div>
					<form>
						name: <input type="text" value={this.state.clientName} onChange={this.handleInputChange} name="clientName" />
						<br/>
						email: <input type="text" value={this.state.clientEmail} onChange={this.handleInputChange} name="clientEmail" />
					  <input type="button" value="save" onClick={() => {
					    this.props.onSave({
		            name : this.state.clientName, 
		            email : this.state.clientEmail
		          }, this.state.client.id)
					    this.setState({isEditing : false})
					  }} />
						<input type="button" value="cancel" onClick={() => this.setState({isEditing : false})} />
					</form>
				</div>
      )
    }
  }
}

export default Client
