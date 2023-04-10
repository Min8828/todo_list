// use dotenv while in informal env
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const engine = require('express-handlebars').engine
const Todo = require('./models/todo')

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

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI) // 設定連線到 mongoDB
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => console.log('mongodb error!')) // 連線異常
db.once('open', () => console.log('mongodb connected!')) // 連線成功

app.get('/', async (req, res) => {
  try {
    // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    const todos = await Todo.find({}).lean().exec()
    res.render('index', { todos })
  } catch {
    (err) => console.log(err)
  }
})

app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name

  return Todo.create({ name })
    .then(() => redirect('/'))
    .catch((err) => console.log(err))
})

app.get('/todos/:_id', (req, res) => {
  const _id = req.params._id
  return Todo.findById(_id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error))
})

app.get('/todos/:_id/edit', (req, res) => {
  const _id = req.params._id
  return Todo.findById(_id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error))
})

app.post('/todos/:_id/edit', async (req, res) => {
  try {
    const _id = req.params._id
    const name = req.body.name
    const updateTodo = await Todo.findOneAndUpdate({ _id }, { name }).exec()
    await updateTodo.save()
    res.redirect(`/todos/${_id}`)
  } catch {
    (err) => console.log(err)
  }
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
