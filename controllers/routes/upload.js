const { v4: uuidv4 } = require('uuid')

const parseInput = require('../parseInput')

const db = require('../../utils/db')

exports.getUpload = (req, res) => {
    res.render('upload',  { title: 'upload' })
}

exports.postUpload = (req, res) => {
    const { filename, originalname } = req.file
    const { sessionID } = req
    parseInput(filename, (corpus, fileBuff) => {
        const dbCorpus = {
            corpus,
            sessionID,
            uploadDate: new Date(),
            originalName: originalname
        }

        db.insert(dbCorpus, uuidv4())
            .then(({ id, rev }) => {
                db.attachment.insert(
                    `${id}-file`,
                    originalname,
                    fileBuff,
                    'text/plain',
                    // { rev }
                ).then(() => {
                    res.redirect('/corpus')
                })

                // clean up after 2 hours
                // setTimeout(() => {
                //     fs.unlink(uploadPath(filename), console.error)
                //     db.destroy(id, rev)
                // }, 7200000)
            })
            .catch(console.error)
    })
}
