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

const nonExistingId = async () => {
  const person = new Person({
    name: 'Vale Möykkynen',
    number: '045-2345678'
  })
  await person.save()
  await person.remove()

  return person._id.toString()
}

const personsInDb = async () => {
  const persons = await Person.find({})
  return persons.map(person => person.toJSON())
}

module.exports = {
  initialPersons, nonExistingId, personsInDb
}