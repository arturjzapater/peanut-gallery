const fetch = require('node-fetch')
const { base } = require('../../conf/api')
const { getReviews } = require('../../lib/db')

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
    reviews,
})

const handleGetFilm = client => (req, res, next) => {
    Promise.all([
        getReviews(client, req.params.id),
        request(`${base}&i=${req.params.id}`),
    ])
        .then(mergeFilm)
        .then(data => res.json(data))
        .catch(next)
}

const handleSearch = (req, res, next) => {
    request(`${base}&s=${req.query.search}`)
        .then(parseResults)
        .then(data => res.json(data))
        .catch(next)
}

module.exports = {
    handleGetFilm,
    handleSearch,
}
