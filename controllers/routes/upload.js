const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const parseInput = require('../parseInput')

const db = require('../../utils/db')
const { uploadPath } = require('../../utils/path')

exports.getUpload = (req, res) => {
    res.render('upload',  { title: 'upload' })
}

exports.postUpload = (req, res) => {
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
