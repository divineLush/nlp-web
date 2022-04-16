const singleCorpus = require('../corpus/singleCorpus')

module.exports = (query, id, sessionID, cb) => {
    singleCorpus(id, sessionID, (corpus) => {
        const corpusToRender = corpus.filter(({ markup }) =>
            (markup.find(({ text }) => text.includes(query))))

        cb(corpusToRender)
    })
}
