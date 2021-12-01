const db = require('../../utils/db')

module.exports = (sessionID, cb) => {
    const query = {
        selector: { sessionID }
    }

    db.find(query)
        .then(({ docs }) => {
            const corpuslist = docs.length ? docs : []

            const list = corpuslist.map(({ corpus, _id, originalName }) => {
                const totalTokens = corpus.reduce((sum, { tokenNum }) => sum + tokenNum, 0)

                return { totalTokens, _id, originalName }
            })

            cb(list)
        })
        .catch(console.error)
}
