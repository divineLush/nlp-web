const concordance = require('../corpus/concordance')

exports.getConcordance = (req, res) => {
    const { id } = req.params
    res.render('concordance', { title: 'concordance', id })
}

exports.getConcordanceRes = (req, res) => {
    const { sessionID } = req
    const { id, text, size } = req.params

    concordance(id, sessionID, text, parseInt(size), (conc) => {
        res.render('concordanceresult', { title: 'concordance result', id, conc })
    })
}

exports.postConcordance = (req, res) => {
    const { id } = req.params
    const { text, size } = req.body
    res.redirect(`/concordance/result/${id}/${text}/${size}`)
}
