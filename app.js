const ex = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

const viewRoutes = require('./routes/view')
const error = require('./controllers/error')

const app = ex()

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(ex.static(path.join(__dirname, 'public')))
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'nlp-key-cat-kitten'
}))
app.use(viewRoutes)
app.use(error.getNotFound)

app.listen(3000)
