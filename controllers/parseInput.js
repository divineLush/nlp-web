const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const { uploadPath } = require('../utils/path')

const parsePos = pos => Math.abs(parseInt(pos))

// filter out garbage, map to nums and sort
const cleanLabels = labels => labels
    // filter out all the garbage among the labels
    .filter(({ begin, end, label }) => {
        const hasLabel = typeof label !== 'undefined'
        const isBegin = typeof begin !== 'undefined'
        const isEnd = typeof end !== 'undefined'

        const intBegin = parsePos(begin)
        const intEnd = parsePos(end)

        const isBeginNum = !isNaN(intBegin)
        const isEndNum = !isNaN(intEnd)

        const notEqual = intBegin !== intEnd

        return hasLabel && isBegin && isEnd && isBeginNum && isEndNum && notEqual
    })
    // map "begin" and "end" to numbers
    .map((el) => ({
        ...el,
        label: el.label.toLowerCase(),
        begin: parsePos(el.begin),
        end: parsePos(el.end)
    }))
    .sort((a, b) => {
        if (a.begin < b.begin)
            return -1

        if (a.begin > b.begin)
            return 1

        return 0
    })


module.exports = (fileName, cb) => {
    const inputPath = uploadPath(fileName)

    fs.readFile(inputPath, (err, fileBuff) => {
        if (err) return []

        let corpus = []

        JSON.parse(fileBuff).forEach(({ labels, text }) => {
            if (!labels.length)
                return;

            const clean = cleanLabels(labels)

            const markup = []
            const textLabels = []
            let tokenNum = 0

            const first = text.substring(0, clean[0].begin).trim()
            if (first.length)
                markup.push({ text: first })

            const second = text.substring(clean[0].begin, clean[0].end).trim()
            if (second.length) {
                textLabels.push(clean[0].label)
                markup.push({ text: second, label: clean[0].label })
            }

            console.log(clean)

            clean.forEach(({ begin, end, label }, index) => {
                if (index === 0)
                    return

                const simpleText = text.substring(clean[index - 1].end, begin).trim()
                if (simpleText.length)
                    markup.push({ text: simpleText })

                const labelText = text.substring(begin, end).trim()
                if (labelText.length) {
                    markup.push({ text: labelText, label })

                    if (!textLabels.includes(label))
                        textLabels.push(label)

                    tokenNum++
                }
            })

            const lastBegin = clean[clean.length - 1].begin
            const lastEnd = clean[clean.length - 1].end
            const last = text.substring(Math.max(lastBegin, lastEnd)).trim()
            if (last.length)
                markup.push({ text: last })

            corpus.push({
                labels: textLabels,
                id: uuidv4(),
                markup,
                tokenNum
            })
        })

        cb(corpus)
    })
}
