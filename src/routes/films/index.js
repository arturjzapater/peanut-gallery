const router = require('express').Router()
const { handleGetFilm, handleSearch } = require('./handlers')

module.exports = client => {
    router.route('/films/:id')
        .get(handleGetFilm(client))

    router.route('/search')
        .get(handleSearch)

    return router
}
