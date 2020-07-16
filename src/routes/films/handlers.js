const fetch = require('node-fetch')
const { base } = require('../../conf/api')
const { addReview, getReviews } = require('../../lib/db')

const request = uri => fetch(uri)
    .then(res => res.json())

const filterSearchFields = ({ Title, Year, imdbID }) => ({
    Title,
    Year,
    imdbID,
})

const parseResults = ({ Search }) => Search.map(filterSearchFields)

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
    reviews,
})

const handleGetFilm = client => (req, res, next) => {
    Promise.all([
        getReviews(client, req.params.id),
        request(`${base}&i=${req.params.id}`),
    ])
        .then(mergeFilm)
        .then(film => res.render('film', {
            ...film,
            user: req.user,
        }))
        .catch(next)
}

const handlePostReview = client => (req, res, next) => {
    const review = {
        ...req.body,
        film: req.params.id,
        user: req.user.id,
        timestamp: Date.now(),
    }
    addReview(client, review)
        .then(() => res.redirect(`/films/${req.params.id}`))
        .catch(next)
}

const handleSearch = (req, res, next) => {
    if (req.query.search !== undefined) {
        request(`${base}&s=${req.query.search}`)
            .then(parseResults)
            .then(films => res.render('search', {
                films,
                user: req.user,
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
    handleGetFilm,
    handlePostReview,
    handleSearch,
}
