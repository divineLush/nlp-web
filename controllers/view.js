const input = require('./input')
const search = require('./search')

exports.getIndex = (req, res, next) => {
    res.render('index', { title: 'home' })
}

exports.getViewer = (req, res, next) => {
    input.parseInput((texts) => {
        res.render('viewer', { title: 'viewer', texts })
    })
}

exports.getAnalytics = (req, res, next) => {
    input.parseInput((texts) => {
        res.render('analytics', { title: 'viewer', texts })
    })
}

exports.postSearch = (req, res, next) => {
    const { query } = req.body
    search.execute(query, (res) => {
        res.render('viewer/search', { res })
    })
}
