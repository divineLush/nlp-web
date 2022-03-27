const singleCorpus = require('../corpus/singleCorpus')

exports.getConcordance = (req, res) => {
    const { id } = req.params
    res.render('concordance', { title: 'concordance', id })
}

exports.getConcordanceRes = (req, res) => {
    const { sessionID } = req
    const { id } = req.params
    console.log(id)
    singleCorpus(id, sessionID, (corpus) => {
        console.log(corpus)
        let res = []
        corpus.forEach(({ markup }) => {

        })

        res.render('concordanceresult', { title: 'concordance', id })
    })
}

exports.postConcordance = (req, res) => {
    const { id } = req.params
    const { text, size } = req.body
    res.redirect(`/concordance/result/${id}/${text}/${size}`)
}
