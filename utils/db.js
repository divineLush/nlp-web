const dbName = 'nlpweb'
const nano = require('nano')('http://admin:couchdb@localhost:5984')
const db = nano.use(dbName)

module.exports = db
