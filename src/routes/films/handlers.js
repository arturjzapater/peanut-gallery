const fetch = require('node-fetch')
const { base } = require('../../conf/api')
const {
    addReview,
    deleteReview,
    getReviews,
 } = require('../../lib/db')

const count = prop => xs => Math.round(xs.filter(x => x[prop]).length / xs.length * 100)
const countCinema = count('worthCinema')
const countOwning = count('worthOwning')
const countSeeing = count('worthSeeing')

const countWorthiness = reviews => ({
    see: countSeeing(reviews),
    cinema: countCinema(reviews),
    own: countOwning(reviews),
})

const findOwnReview = (user, reviews) => user && reviews.find(x => x.author === user.id)

const mergeFilm = ([ reviews, film ]) => ({
    title: film.Title,
    year: film.Year,
    rated: film.Rated,
    released: film.Released,
    runtime: film.Runtime,
    genre: film.Genre,
    director: film.Director,
    writer: film.Writer,
    plot: film.Plot,
    ratings: film.Ratings,
    production: film.Production,
    imdbID: film.imdbID,
    poster: film.Poster,
    reviews,
    worth: countWorthiness(reviews),
})

const request = uri => fetch(uri)
    .then(res => res.json())

const handleGetFilm = client => (req, res, next) => {
    Promise.all([
        getReviews(client, req.params.id),
        request(`${base}&i=${req.params.id}`),
    ])
        .then(mergeFilm)
        .then(film => res.render('film', {
            ...film,
            user: req.user,
            ownReview: findOwnReview(req.user, film.reviews),
        }))
        .catch(next)
}

const handleDeleteReview = client => (req, res, next) => {
    deleteReview(client, req.params.review, req.user.id)
        .then(() => res.redirect(`/films/${req.params.id}`))
        .catch(next)
}

const handleHome = (req, res) => res.redirect('/search')

const handlePostReview = client => (req, res, next) => {
    const review = {
        ...req.body,
        film: req.params.id,
        author: req.user.id,
        timestamp: Date.now(),
    }
    addReview(client, review)
        .then(() => res.redirect(`/films/${req.params.id}`))
        .catch(next)
}

const handleSearch = (req, res, next) => {
    const { search } = req.query
    if (search !== undefined) {
        request(`${base}&s=${search}`)
            .then(({ Search }) => Search || [])
            .then(films => res.render('search', {
                films,
                user: req.user,
                search,
            }))
            .catch(next)
    } else {
        res.render('search', {
            films: [],
            user: req.user,
        })
    }
}

module.exports = {
    handleDeleteReview,
    handleGetFilm,
    handleHome,
    handlePostReview,
    handleSearch,
}
