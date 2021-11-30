const { parseInput } = require('./input')
const search = require('./search')

exports.getIndex = (req, res) => {
    console.log('session', req.sessionID)
    res.render('index')
}

exports.getViewer = (req, res) => {
    console.log('session', req.sessionID)
    const { sessionID } = req
    parseInput(sessionID, (texts) => {
        res.render('viewer', { texts })
    })
}

exports.getAnalytics = (req, res) => {
    console.log('session', req.sessionID)
    const { sessionID } = req
    parseInput(sessionID, (texts) => {
        res.render('analytics', { texts })
    })
}

exports.getDetailedViewer = (req, res) => {
    console.log('session', req.sessionID)
    const id = req.params.id
    res.render('viewer', { id })
}

exports.postSearch = (req, res) => {
    console.log('session', req.sessionID)
    const { query } = req.body
    search.execute(query, (res) => {
        console.log(res)
        res.render('viewer/search', { res })
    })
}

exports.postUpload = (req, res) => {
    console.log(req.file)
    const { filename } = req.file
    const { sessionID } = req
    parseInput(filename, sessionID, (texts) => {
        res.render('viewer', { texts })
    })
}
