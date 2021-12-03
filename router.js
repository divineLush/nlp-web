const { Router } = require('express')
const multer = require('multer')

const getIndex = require('./controllers/routes/index')

const {
    getCorpus,
    getCorpusID,
    postCorpus,
    postCorpusSearch,
    getText
} = require('./controllers/routes/corpus')

const r = Router()
const upload = multer({ dest: 'uploads/' })

r.get('/', getIndex)

r.get('/corpus', getCorpus)
r.get('/corpus/:id', getCorpusID)

r.get('/corpus/:id/:textID', getText)

r.post('/corpus/search', postCorpusSearch)
r.post('/corpus/upload', upload.single('upload'), postCorpus)

module.exports = r
