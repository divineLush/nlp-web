const { Router } = require('express')
const multer = require('multer')

const getIndex = require('./controllers/routes/index')

const {
    getCorpus,
    getCorpusID,
    postCorpus,
    postCorpusSearch
} = require('./controllers/routes/corpus')

const r = Router()
const upload = multer({ dest: 'uploads/' })

r.get('/', getIndex)

r.get('/corpus', getCorpus)
r.get('/corpus/:id', getCorpusID)

r.get('/text/:id', (req, res) => {
    const id = req.params.id
    res.render('text', { title: 'text', id })
})

r.post('/corpus/search', postCorpusSearch)
r.post('/corpus/upload', upload.single('upload'), postCorpus)

module.exports = r
