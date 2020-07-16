const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const { films } = require('./routes')

const { PORT = 5000 } = process.env

module.exports = client => {
    const app = express()

    app.set('views', './views')
    app.set('view engine', 'pug')

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    app.use(express.static(path.join(__dirname, 'public')))

    app.use('/', films(client))

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

    process.on('SIGINT', () => {
        console.log('Closing server')
        client.close()
            .then(() => process.exit())
            .catch(console.error)
    })
}
