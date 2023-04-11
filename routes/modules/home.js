const router = require('express').Router()
const Todo = require('../../models/todo')

router.get('/', async (req, res) => {
  try {
    // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    const todos = await Todo.find({}).lean().sort({ _id: 'asc' }).exec()
    res.render('index', { todos })
  } catch {
    (err) => console.log(err)
  }
})

module.exports = router
