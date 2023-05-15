const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const Person = require('../models/person')

beforeEach(async () => {
  jest.setTimeout(60000)
  await Person.deleteMany({})
  const personObjects = helper.initialPersons
    .map(person => new Person(person))
  const promiseArray = personObjects.map(person => person.save())
  await Promise.all(promiseArray)
})

test('all persons are returned', async () => {
  const response = await api.get('/api/persons')

  expect(response.body).toHaveLength(helper.initialPersons.length)
})

test('a specific person is within the response', async () => {
  const response = await api.get('/api/persons')

  const contents = response.body.map(r => r.name)
  expect(contents).toContain(
    'Hagrid'
  )
})

test('a valid number can be added', async () => {
  const newPerson = {
    name: 'Testi Testinen',
    number: '050-4923742'
  }

  await api
    .post('/api/persons')
    .send(newPerson)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const personsAtEnd = await helper.personsInDb()

  expect(personsAtEnd).toHaveLength(helper.initialPersons.length + 1)
  const contents = personsAtEnd.map(n => n.name)
  expect(contents).toContain(
    'Testi Testinen'
  )
})

test('a person without number is not added', async () => {
  const newPerson = {
    number: '050-4923742'
  }

  await api.post('/api/persons').send(newPerson).expect(400)

  const personsAtEnd = await helper.personsInDb()

  expect(personsAtEnd).toHaveLength(helper.initialPersons.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})