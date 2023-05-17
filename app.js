const express = require('express')
const app = express()
const Person = require('./models/person')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const personsRouter = require('./controllers/persons')

mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

logger.info('connecting to', url)
mongoose.connect(url)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(express.static('build'))
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)

// info-ruudun esittäminen
app.get('/info', (req, res) => {
  const date = new Date()
  Person.count({}).then(count => {
    res.send(`Phonebook has info for ${count} people <br> ${date}`)
  })
})

app.get('/version', (req, res) => {
  res.send('version 3')
})

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app