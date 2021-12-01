const db = require('../../utils/db')

module.exports = (_id, sessionID, cb) => {
    const query = {
        selector: { _id, sessionID }
    }

    db.find(query)
        .then(({ docs }) => {
            const corpus = docs.length ? docs[0].corpus : []
            cb(corpus)
        })
        .catch(console.error)
}
