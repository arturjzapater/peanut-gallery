const { db, collection } = require('../conf/db')

const getCollection = client => client.db(db).collection(collection)

const getReviews = (client, film) => getCollection(client)
    .find({ film })
    .toArray()

module.exports = { getReviews }
