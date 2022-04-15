const db = require('../../utils/db')

const arrConcat = arr => arr.reduce((prev, curr) => prev += ` ${curr}`)

module.exports = (id, sessionID, inputText, size, cb) => {
    const query = {
        selector: { _id: id, sessionID }
    }

    db.find(query)
        .then(({ docs }) => {
            const doc = docs.length ? docs[0] : null
            if (!doc) cb([])

            const { originalName } = doc

            db.attachment.get(`${id}-file`, originalName)
                .then((body) => {
                    // corpus from input file
                    const corpus = JSON.parse(body)

                    const res = []
                    corpus.forEach(({ text }) => {
                        const split = text.split(" ")

                        split.forEach((text, idx) => {
                            if (!text.includes(inputText)) return

                            const lowerBound = idx - size <= 0 ? 0 : idx - size
                            const upperBound = size + idx + 1 >= split.length ? split.length - 1 : size + idx + 1

                            console.log(size + idx + 1, split.length)
                            const before = arrConcat(split.slice(lowerBound, idx))
                            const after = arrConcat(split.slice(idx+1, upperBound))

                            res.push({
                                before,
                                after,
                                text
                            })
                        })
                    })

                    cb(res)
                })
                .catch(console.error)
            })
            .catch(console.error)
}
