const http = require('http')
const path = require('path')

const ex = require('express')
const bodyParser = require('body-parser')

const viewRoutes = require('./routes/view')
const error = require('./controllers/error')

const app = ex()

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(ex.static(path.join(__dirname, 'public')))

app.use(viewRoutes)

app.use(error.getNotFound)

const server = http.createServer(app)
server.listen(3000)
