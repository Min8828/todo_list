// use dotenv while in informal env
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const methodOverride = require('method-override')
const engine = require('express-handlebars').engine

const app = express()
const port = 3000

const routes = require('./routes')
require('./config/mongoose') // mongoose

// setting template engine
app.engine(
  'hbs',
  engine({
    layoutsDir: 'views/layouts', // directory to handlebars files
    defaultLayout: 'main',
    extname: 'hbs' // specify the file extension as .hbs
  })
)
app.set('view engine', 'hbs')

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // override with POST having '?_method=<http method>'

// routes
app.use(routes)

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
