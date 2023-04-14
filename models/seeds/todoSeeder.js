if (process.env.NODE_ENV !== 'production') require('dotenv').config() 

const Todo = require("../../models/todo")
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}`, isDone: false })
  }
  console.log(' done')
})
