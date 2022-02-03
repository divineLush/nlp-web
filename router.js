const { Router } = require('express')
const multer = require('multer')

const getIndex = require('./controllers/routes/index')
const { getUpload, postUpload } = require('./controllers/routes/upload')

const {
    getCorpus,
    getCorpusID,
    getCorpusListSearch,
    postCorpusListSearch,
    getText
} = require('./controllers/routes/corpus')

const r = Router()
const upload = multer({ dest: 'uploads/' })

r.get('/', getIndex)
r.get('/upload', getUpload)
r.get('/corpus', getCorpus)
r.get('/corpus/:id', getCorpusID)
r.get('/corpus/:id/:textID', getText)
r.get('/search/corpuslist/:query', getCorpusListSearch)

r.post('/upload', upload.single('upload'), postUpload)
r.post('/search/corpuslist', postCorpusListSearch)

module.exports = r
