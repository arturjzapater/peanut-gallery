const { ObjectId } = require('mongodb')
const { db, collection } = require('../conf/db')

const getCollection = client => client.db(db).collection(collection)

const addReview = (client, review) => getCollection(client)
    .insertOne(review)

const deleteReview = (client, review, author) => getCollection(client)
    .deleteOne({ author, _id: ObjectId(review) })

const getReviews = (client, film) => getCollection(client)
    .find({ film }, { sort: [ [ 'timestamp', -1 ] ] })
    .toArray()

module.exports = { 
    addReview,
    deleteReview,
    getReviews,
}
