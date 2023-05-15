const personsRouter = require('express').Router()
const Person = require('../models/person')

// koko puhelinluettelon näyttäminen json-muodossa
personsRouter.get('/', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

// yksittäisen henkilön esittäminen
personsRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

// yksittäisen henkilön poisto
personsRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// henkilön lisääminen
personsRouter.post('/api/persons', (req, res, next) => {
  const body = req.body
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch(error => next(error))
})

// henkilön numeron muokkaaminen
personsRouter.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  Person.findByIdAndUpdate(req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

module.exports = personsRouter