const singleCorpus = require('./singleCorpus')

module.exports = (corpusID, sessionID, textID, cb) => {
    singleCorpus(corpusID, sessionID, (corpus) => {
        if (!corpus.length) cb(null)

        const text = corpus.find(({ id }) => id === textID)
        cb(text)
    })
}
