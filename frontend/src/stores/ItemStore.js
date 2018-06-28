import axios from 'axios'

const SERVER = 'https://proj2-alexsicoe96.c9users.io:8080'

class ItemStore{
	constructor(ee){
		this.emitter = ee
		this.content = []
		this.selected = {}
	}
	getAll(clientId){
		axios(SERVER + '/clients/' + clientId + '/items')
			.then((response) => {
				this.content = response.data
				this.emitter.emit('ITEM_LOAD')
			})
			.catch((error) => console.warn(error))
	}
	deleteOne(clientId, itemId){
		console.warn('sending : ' + SERVER + '/clients/' + clientId + '/items/' + itemId)
		axios.delete(SERVER + '/clients/' + clientId + '/items/' + itemId )
			.then(() => this.getAll(clientId))
			.catch((error) => console.warn(error))	
	}
	addOne(clientId, item){
		axios.post(SERVER + '/clients/' + clientId + '/items', item)
			.then(() => this.getAll(clientId))
			.catch((error) => console.warn(error))	
	}
	saveOne(clientId, itemId, item){
		axios.put(SERVER + '/clients/' + clientId + '/items/' + itemId , item)
			.then(() => this.getAll(clientId))
			.catch((error) => console.warn(error))
		}
}

export default ItemStore