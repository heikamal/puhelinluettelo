const morgan = require('morgan')

const requestLogger = morgan(function (tokens, req, res) {
  let logged = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')

  if (req.method === 'POST'){
    logged = logged.concat(' ')
    logged = logged.concat(JSON.stringify(req.body))
  }
  return logged
})

// virheidenkäsittelijät
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'uknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}