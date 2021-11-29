const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const { uploadPath } = require('../utils/path')

const nano = require('nano')('http://admin:couchdb@localhost:5984')

exports.parseInput = (fileName, sessionID, cb) => {
    const inputPath = uploadPath(fileName)

    fs.readFile(inputPath, (err, fileBuff) => {
        if (err) return []

        let corpus = []

        JSON.parse(fileBuff).forEach(({ labels, text }) => {
            const markup = []
            const labelsByText = []
            let tokenNum = 0

            for (const label in labels) {
                lowLabel = label.toLowerCase()
                labelsByText.push(lowLabel)

                for (const coords of labels[label]) {
                    const { begin, end } = coords

                    if (!Number.isFinite(begin) || !Number.isFinite(end)) continue

                    const cleanCoords = begin < end
                        ? { begin, end } : { begin: end, end: begin }

                    const token = text.substring(cleanCoords.begin, cleanCoords.end)
                    if (token) {
                        tokenNum++

                        markup.push({
                            label: lowLabel,
                            coords: cleanCoords,
                            token
                        })
                    }
                }
            }

            corpus.push({
                labels: labelsByText,
                id: uuidv4(),
                markup,
                tokenNum
            })
        })

        // const sortedRes = corpus.map(text =>
        //     text.sort((a, b) => a.coords.begin - b.coords.begin)
        // )

        // console.log('global', corpus[0])
        // console.log('sorted', sortedRes[0])
        const nlpweb = nano.use('nlpweb')

        nlpweb.insert({ corpus, sessionID }, uuidv4())
            .then(() => { cb(corpus) })
            .catch(console.error)

        // const query = {
        //     selector: { sessionID }
        // }

        // nlpweb.find(query)
        //     .then(({ docs }) => {
        //         if (!docs.length) {
        //             nlpweb.insert({ corpus, sessionID }, uuidv4())
        //                 .then(() => { cb(corpus) })
        //         } else {
        //             cb(corpus)
        //         }
        //     })
        //     .catch(console.error)

        // const db = getDb()
        // if (db)
        //     db
        //         .collection('corpus')
        //         .insertOne(corpus)
        //         .then(() => { cb(corpus) })
    })
}
