const router = require('express').Router()
const {
    handleDeleteReview,
    handleGetFilm,
    handleHome,
    handlePostReview,
    handleSearch,
} = require('./handlers')

module.exports = client => {
    router.get('/', handleHome)

    router.route('/films/:id')
        .get(handleGetFilm(client))

    router.route('/films/:id/reviews')
        .post(handlePostReview(client))
    
    router.route('/reviews/:review')
        .delete(handleDeleteReview(client))

    router.route('/search')
        .get(handleSearch)

    return router
}
