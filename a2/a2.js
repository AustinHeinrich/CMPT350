// Austin Heinrich
// backend for assignment 2

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.sendFile(__dirname + '/messageboard.html'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
