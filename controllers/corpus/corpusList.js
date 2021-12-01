const db = require('../../utils/db')

module.exports = (sessionID, cb) => {
    const query = {
        selector: { sessionID }
    }

    db.find(query)
        .then(({ docs }) => {
            const corpuslist = docs.length ? docs : []
            cb(corpuslist)
        })
        .catch(console.error)
}
