import axios from 'axios'

const SERVER = 'https://proj2-alexsicoe96.c9users.io:8080'

class ClientStore{
	constructor(ee){
		this.emitter = ee
		this.content = []
		this.selected = {}
	}
	getAll(){
		axios(SERVER + '/clients')
			.then((response) => {
				this.content = response.data
				this.emitter.emit('CLIENT_LOAD')
			})
			.catch((error) => console.warn(error))
	}
	deleteOne(id){
		axios.delete(SERVER + '/clients/' + id)
			.then(() => this.getAll())
			.catch((error) => console.warn(error))	
	}
	addOne(client){
		axios.post(SERVER + '/clients', client)
			.then(() => this.getAll())
			.catch((error) => console.warn(error))	
	}
	saveOne(client, id){
		axios.put(SERVER + '/clients/' + id, client)
			.then(() => this.getAll())
			.catch((error) => console.warn(error))
		}
	getOne(id){
		axios(SERVER + '/clients/' + id)
			.then((response) => {
				this.selected = response.data
				this.emitter.emit('SINGLE_CLIENT_LOAD')
			})
			.catch((error) => console.warn(error))		
	}
}

export default ClientStore