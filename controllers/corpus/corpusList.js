const db = require('../../utils/db')
const formattedDate = require('../../utils/formatDate')

module.exports = (sessionID, cb) => {
    const query = {
        selector: { sessionID }
    }

    db.find(query)
        .then(({ docs }) => {
            const corpuslist = docs.length ? docs : []

            const list = corpuslist.map(({ corpus, _id, originalName, uploadDate }) => {
                const totalTokens = corpus.reduce((sum, { tokenNum }) => sum + tokenNum, 0)
                const textsNum = corpus.length

                return {
                    totalTokens,
                    _id,
                    originalName,
                    textsNum,
                    uploadDate: formattedDate(uploadDate)
                }
            })

            cb(list)
        })
        .catch(console.error)
}
