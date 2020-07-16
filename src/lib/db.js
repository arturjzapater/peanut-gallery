const { db, collection } = require('../conf/db')

const getCollection = client => client.db(db).collection(collection)

const addReview = (client, review) => getCollection(client)
    .insertOne(review)

const getReviews = (client, film) => getCollection(client)
    .find({ film })
    .toArray()

module.exports = { 
    addReview,
    getReviews,
}
