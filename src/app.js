const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const cookies = require('./conf/cookies')
const { auth, films } = require('./routes')
const passport = require('./lib/passport')

const { PORT = 5000 } = process.env

module.exports = client => {
    const app = express()

    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'pug')

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    app.use(cookieSession({
        name: 'session',
        maxAge: 24 * 60 * 60 * 1000,
        keys: cookies.keys,
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    app.use(express.static(path.join(__dirname, 'public')))

    app.use('/', films(client))
    app.use('/auth', auth)

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

    process.on('SIGINT', () => {
        console.log('Closing server')
        client.close()
            .then(() => process.exit())
            .catch(console.error)
    })
}
