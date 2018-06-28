const express = require('express'),
  bodyParser = require('body-parser'),
  Sequelize = require('sequelize'),
  cors = require('cors')

const sequelize = new Sequelize('quote_manager_db', 'root', '', {
  dialect: 'mysql',
  define: {
    timestamps: false
  }
})

const Client = sequelize.define('client', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 20]
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
}, {
  underscored: true
})

const Item = sequelize.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 20]
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      len: [1, 10],
      min: {
        args: [0],
        msg: "Must be a non-negative number"
      }
    }
  },
  price: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
    validate: {
      len: [1, 10],
      min: {
        args: [0],
        msg: "Must be a non-negative number"
      }
    }

  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
})

Client.hasMany(Item);

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/create', (req, res, next) => {
  sequelize.sync({ force: true })
    .then(() => res.status(201).send('created'))
    .catch((error) => next(error))
})

app.get('/clients', (req, res, next) => {
  Client.findAll()
    .then((clients) => res.status(200).json(clients))
    .catch((error) => next(error))
})

app.post('/clients', (req, res, next) => {
  Client.create(req.body)
    .then(() => res.status(201).send('created'))
    .catch((error) => next(error))
})

app.get('/clients/:id', (req, res, next) => {
  Client.findById(req.params.id, { include: [Item] })
    .then((client) => {
      if (client) {
        res.status(200).json(client)
      }
      else {
        res.status(404).send('not found')
      }
    })
    .catch((error) => next(error))
})

app.put('/clients/:id', (req, res, next) => {
  Client.findById(req.params.id)
    .then((client) => {
      if (client) {
        return client.update(req.body, { fields: ['name', 'email'] })
      }
      else {
        res.status(404).send('not found')
      }
    })
    .then(() => {
      if (!res.headersSent) {
        res.status(201).send('modified')
      }
    })
    .catch((error) => next(error))
})

app.delete('/clients/:id', (req, res, next) => {
  Client.findById(req.params.id)
    .then((client) => {
      if (client) {
        return client.destroy()
      }
      else {
        res.status(404).send('not found')
      }
    })
    .then(() => {
      if (!res.headersSent) {
        res.status(201).send('removed')
      }
    })
    .catch((error) => next(error))
})

app.get('/clients/:cid/items', (req, res, next) => {
  Client.findById(req.params.cid)
    .then((client) => {
      if (client) {
        return client.getItems()
      }
      else {
        res.status(404).send('not found')
      }
    })
    .then((items) => {
      if (!res.headers) {
        res.status(200).json(items)
      }
    })
    .catch((error) => next(error))
})

app.post('/clients/:cid/items', (req, res, next) => {
  Client.findById(req.params.cid)
    .then((client) => {
      if (client) {
        let items = req.body
        items.client_id = client.id
        return Item.create(items)
      }
      else {
        res.status(404).send('not found')
      }
    })
    .then(() => {
      if (!res.headersSent) {
        res.status(201).send('created')
      }
    })
    .catch((error) => next(error))
})

app.get('/clients/:cid/items/:iid', (req, res, next) => {
  Item.findById(req.params.iid, {
      where: {
        client_id: req.params.cid
      }
    })
    .then((item) => {
      if (item) {
        res.status(200).json(item)
      }
      else {
        res.status(404).send('not found')
      }
    })
    .catch((error) => next(error))
})

app.put('/clients/:cid/items/:iid', (req, res, next) => {
  Item.findById(req.params.iid, {
      where: {
        client_id: req.params.cid
      }
    })
    .then((item) => {
      if (item) {
        return item.update(req.body, { fields: ['itemName', 'quantity', 'price'] })
      }
      else {
        res.status(404).send('not found')
      }
    })
    .then(() => {
      if (!res.headers) {
        res.status(201).send('modified')
      }
    })
    .catch((error) => next(error))
})

app.delete('/clients/:cid/items/:iid', (req, res, next) => {
  Item.findById(req.params.iid, {
      where: {
        client_id: req.params.cid
      }
    })
    .then((item) => {
      if (item) {
        return item.destroy()
      }
      else {
        res.status(404).send('not found')
      }
    })
    .then(() => {
      if (!res.headers) {
        res.status(201).send('removed')
      }
    })
    .catch((error) => next(error))
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send('some error...')
})

app.listen(8080)
