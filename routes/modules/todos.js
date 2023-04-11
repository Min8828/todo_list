const router = require('express').Router()
const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name

  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

router.get('/:_id', (req, res) => {
  const _id = req.params._id
  return Todo.findById(_id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error))
})

router.get('/:_id/edit', (req, res) => {
  const _id = req.params._id
  return Todo.findById(_id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error))
})

router.put('/:_id/', async (req, res) => {
  try {
    const _id = req.params._id
    const { name, isDone } = req.body
    await Todo.findOneAndUpdate(
      { _id },
      { name, isDone: isDone === 'on' }
    ).exec()
    res.redirect(`/todos/${_id}`)
  } catch {
    (err) => console.log(err)
  }
})

router.delete('/:_id/', async (req, res) => {
  try {
    const _id = req.params._id
    await Todo.findOneAndDelete({ _id })
    res.redirect('/')
  } catch {
    (err) => console.log(err)
  }
})

module.exports = router
