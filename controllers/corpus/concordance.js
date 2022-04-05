const singleCorpus = require('../corpus/singleCorpus')

module.exports = (id, sessionID, inputText, size, cb) => {
    singleCorpus(id, sessionID, (corpus) => {
        let res = []

        corpus.forEach(({ markup, id }, idx) => {
            markup.forEach(({ text }) => {
                if (text.includes(inputText)) {
                    let before = ''
                    if (markup[idx - 1]) {
                        const str = markup[idx - 1].text
                        before = `${str.substring(str.length - size, str.length)} `
                    }

                    const after = markup[idx + 1] ? ` ${markup[idx + 1].text.substring(0, size)}` : ''

                    res.push({ before, text, after, id })
                }
            })
        })

        cb(res)
    })
}
