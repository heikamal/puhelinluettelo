const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Person = require('../models/person')

const initialPersons = [
  {
    name: 'Hagrid',
    number: '040-4537654'
  },
  {
    name: 'Testi Testinen',
    number: '040-22334466'
  },
]

beforeEach(async () => {
  await Person.deleteMany({})
  let personObject = new Person(initialPersons[0])
  await personObject.save()
  personObject = new Person(initialPersons[1])
  await personObject.save()
})

test('persons are returned as json', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})