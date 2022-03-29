const singleCorpus = require('../corpus/singleCorpus')

module.exports = (id, sessionID, inputText, size, cb) => {
    singleCorpus(id, sessionID, (corpus) => {
        let res = []

        corpus.forEach(({ markup, id }) => {
            markup.forEach(({ text }) => {
                if (text === inputText) {
                    res.push({ text, id })
                }
            })
        })

        cb(res)
    })
}
