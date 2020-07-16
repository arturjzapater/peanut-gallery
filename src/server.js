const { MongoClient } = require('mongodb')
const { uri, opts } = require('./conf/db')
const app = require('./app')

MongoClient.connect(uri, opts)
    .then(app)
    .catch(console.error)
