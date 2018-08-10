require('./config/config')

const express = require('express')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')

const app = express()
const urlRoutes = require('./routes/urlRoutes')

app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use('/', urlRoutes)
app.get('*', (request, response) => {
  response.redirect('/')
})

mongoose
.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
.then(() => {
  app.listen(process.env.PORT || 3000)
})
.catch((error) => {
  console.log(error)
})