const input = require('./input')

exports.getIndex = (req, res, next) => {
    res.render('index', { title: 'home' })
}

exports.getViewer = (req, res, next) => {
    input.parseInput((texts) => {
        res.render('viewer', { title: 'viewer', texts })
    })
}
