const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000

mongoose
  .connect(
    'mongodb+srv://user000:000password@cluster0.97lloks.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connect to MongoDB atlas successfully'))
  .catch((e) => console.log(e))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
