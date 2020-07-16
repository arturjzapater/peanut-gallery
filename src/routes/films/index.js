const router = require('express').Router()
const checkLogin = require('../../middleware/checkLogin')
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
        .post(checkLogin, handlePostReview(client))
    
    router.route('/reviews/:review')
        .delete(checkLogin, handleDeleteReview(client))

    router.route('/search')
        .get(handleSearch)

    return router
}
