const { ObjectId } = require('mongodb')
const { db, collection } = require('../conf/db')

const getCollection = client => client.db(db).collection(collection)

const addLike = (client, review, user) => getCollection(client)
    .updateOne({
        _id: ObjectId(review),
        votes: { $ne: user },
    }, {
        $push: { votes: user }, 
    })

const addReview = (client, review) => getCollection(client)
    .insertOne(review)

const deleteReview = (client, review, author) => getCollection(client)
    .deleteOne({ author, _id: ObjectId(review) })

const getReviews = (client, film) => getCollection(client)
    .find({ film }, { sort: [
        [ 'votes', -1 ],
        [ 'timestamp', -1 ],
    ] })
    .toArray()

const removeLike = (client, review, user) => getCollection(client)
    .updateOne({
        _id: ObjectId(review),
        votes: user,
    }, {
        $pull: { votes: user }, 
    })

module.exports = { 
    addLike,
    addReview,
    deleteReview,
    getReviews,
    removeLike,
}
