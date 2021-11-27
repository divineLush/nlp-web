const { MongoClient } = require('mongodb')

const url = 'mongodb://mongo:27017/docker-node-mongo'
const client = new MongoClient()
const dbName = 'nlpWeb'

const connectDb = (cb) => {
    MongoClient.connect(url)
        .then((client) => {
            console.log('connected to mongo!')
            cb(client)
        })
        .catch((err) => { console.log('db connection error') })
}

module.exports = connectDb
