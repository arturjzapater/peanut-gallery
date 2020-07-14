const express = require('express')
const bodyParser = require('body-parser')

const { PORT = 5000 } = process.env

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
