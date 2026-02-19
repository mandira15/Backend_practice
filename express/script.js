const express = require('express')
const app = express()
const port = 3000

app.use(express.json()); // readable json body
app.use(express.urlencoded({ extended: true})); // readable urlencoded body

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
