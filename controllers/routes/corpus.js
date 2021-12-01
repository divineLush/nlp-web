const parseInput = require('../parseInput')
const corpusList = require('../corpus/corpusList')
const singleCorpus = require('../corpus/singleCorpus')

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
        res.render('corpus', { title: 'corpus', corpus })
    })
}

exports.postCorpus = (req, res) => {
    const { filename } = req.file
    const { sessionID } = req
    parseInput(filename, sessionID, (corpus) => {
        corpusList(sessionID, (corpuslist) => {
            res.render('corpuslist', { title: 'corpus list', corpuslist })
        })
    })
}

exports.postCorpusSearch =(req, res) => {
    res.redirect('/')
}
