const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const { uploadPath } = require('../utils/path')

module.exports = (fileName, cb) => {
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

        cb(corpus)
    })
}
