const router = require('express').Router()
const { handleGetFilm, handlePostReview, handleSearch } = require('./handlers')

module.exports = client => {
    router.route('/films/:id')
        .get(handleGetFilm(client))

    router.route('/films/:id/reviews')
        .post(handlePostReview(client))

    router.route('/search')
        .get(handleSearch)

    return router
}
