const { db, collection } = require('../conf/db')

const getCollection = client => client.db(db).collection(collection)

const getReviews = (client, film) => client.db(db)
    .collection(collection)
    .find({ film })
    .toArray()

module.exports = { getCollection, getReviews }
