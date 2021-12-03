const corpusList = require('../corpus/corpusList')
const singleCorpus = require('../corpus/singleCorpus')
const textByCorpus = require('../corpus/textByCorpus')

exports.getCorpus = (req, res) => {
    const { sessionID } = req
    corpusList(sessionID, (corpuslist) => {
        res.render('corpuslist', { title: 'corpus list', corpuslist })
    })
}

exports.getCorpusID = (req, res) => {
    const { id } = req.params
    const { sessionID } = req
    singleCorpus(id, sessionID, (corpus) => {
        res.render('corpus', { title: 'corpus', corpusID: id, corpus })
    })
}

exports.postCorpusSearch =(req, res) => {
    res.redirect('/')
}

exports.getText = (req, res) => {
    const { id, textID } = req.params
    const { sessionID } = req

    textByCorpus(id, sessionID, textID, (text) => {
        res.render('text', { title: 'text', text })
    })
}
