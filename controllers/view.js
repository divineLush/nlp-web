const input = require('./input')
const search = require('./search')

exports.getIndex = (req, res, next) => {
    console.log('session', req.sessionID)
    res.render('index', { title: 'home' })
}

exports.getViewer = (req, res, next) => {
    console.log('session', req.sessionID)
    input.parseInput((texts) => {
        res.render('viewer', { title: 'viewer', texts })
    })
}

exports.getAnalytics = (req, res, next) => {
    console.log('session', req.sessionID)
    input.parseInput((texts) => {
        res.render('analytics', { title: 'viewer', texts })
    })
}

exports.getDetailedViewer = (req, res, next) => {
    console.log('session', req.sessionID)
    const id = req.params.id
    res.render('viewer', { id })
}

exports.postSearch = (req, res, next) => {
    console.log('session', req.sessionID)
    const { query } = req.body
    search.execute(query, (res) => {
        console.log(res)
        res.render('viewer/search', { res })
    })
}
