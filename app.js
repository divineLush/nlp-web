const ex = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

const router = require('./router')
const notFound = require('./controllers/routes/notFound')

const app = ex()

app.set('view engine', 'eta')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(ex.static(path.join(__dirname, 'public')))
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'nlp-key-cat-kitten'
}))
app.use(router)
app.use(notFound)

app.listen(3000)
