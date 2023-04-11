// use dotenv while in informal env
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const engine = require('express-handlebars').engine
const Todo = require('./models/todo')
const routes = require('./routes')

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI) // 設定連線到 mongoDB
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => console.log('mongodb error!')) // 連線異常
db.once('open', () => console.log('mongodb connected!')) // 連線成功

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
