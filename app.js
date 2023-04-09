const express = require('express')
const mongoose = require('mongoose')
const engine = require('express-handlebars').engine
const Todo = require('./models/todo')

// use dotenv while in informal env
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const app = express()
const port = 3000

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

// setting static files
app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URI) // 設定連線到 mongoDB
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => console.log('mongodb error!')) // 連線異常
db.once('open', () => console.log('mongodb connected!')) // 連線成功

app.get('/', async (req, res) => {
  try {
    const todos = Todo.find({}).lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    res.render('index', { todos })
  } catch {
    (err) => console.log(err)
  }
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
