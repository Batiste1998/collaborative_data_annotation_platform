const express = require('express')
const mongoose = require('mongoose')

// Création du serveur Express
const app = express()

// Connexion à la base de données
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => console.log('status: ', db.states[db._readyState]))

app.use(express.json())

const accountsRouter = require('./routes/accounts')
app.use('/', accountsRouter)

// Lancement du serveur
app.listen(3000, () => console.log('Serveur lancé sur http://localhost:3000'));