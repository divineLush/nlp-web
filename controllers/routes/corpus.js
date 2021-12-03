const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const parseInput = require('../parseInput')
const corpusList = require('../corpus/corpusList')
const singleCorpus = require('../corpus/singleCorpus')
const textByCorpus = require('../corpus/textByCorpus')
const db = require('../../utils/db')
const { uploadPath } = require('../../utils/path')

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

exports.postCorpus = (req, res) => {
    const { filename, originalname } = req.file
    const { sessionID } = req
    parseInput(filename, (corpus) => {
        db.insert({ corpus, sessionID, originalName: originalname }, uuidv4())
            .then(({ id, rev }) => {
                res.redirect('/corpus')
                // clean up after 2 hours
                setTimeout(() => {
                    fs.unlink(uploadPath(filename), console.error)
                    db.destroy(id, rev)
                }, 7200000)
            })
            .catch(console.error)
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
