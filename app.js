const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/todo')

// use dotenv while in informal env
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI) // 設定連線到 mongoDB
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => console.log('mongodb error!')) // 連線異常
db.once('open', () => console.log('mongodb connected!')) // 連線成功

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
