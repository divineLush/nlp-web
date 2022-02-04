const singleCorpus = require('../corpus/singleCorpus')

module.exports = (query, id, sessionID, cb) => {
    singleCorpus(id, sessionID, (corpus) => {
        console.log('search corpus', id, corpus)
        const corpusToRender = corpus.filter(({ markup }) =>
            (markup.find(({ token }) => token.includes(query)) != undefined)
        )

        cb(corpusToRender)
    })
}
