const ex = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const viewRoutes = require('./routes/view')
const error = require('./controllers/error')

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const ItemSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

const app = ex()

const PORT = 3000;

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(ex.static(path.join(__dirname, 'public')))
app.use(viewRoutes)
app.use(error.getNotFound)

app.listen(PORT)
