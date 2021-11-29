const dbName = 'nlpweb'
const nano = require('nano')('http://admin:couchdb@localhost:5984')

const createdb = nano.db.create(dbName)
const useDb = nano.use(dbName)

exports.createDb = createdb
exports.useDb = useDb
