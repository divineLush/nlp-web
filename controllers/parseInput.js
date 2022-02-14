const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const { uploadPath } = require('../utils/path')

const parsePos = pos => Math.abs(parseInt(pos))

// filter out garbage, map to nums and sort
const cleanLabels = labels => labels
    // filter out all the garbage among the labels
    .filter(({ begin, end, label }) => {
        const isLabelValid = typeof label === 'string' || Array.isArray(label)

        const isBegin = typeof begin !== 'undefined'
        const isEnd = typeof end !== 'undefined'

        const intBegin = parsePos(begin)
        const intEnd = parsePos(end)

        const isBeginNum = !isNaN(intBegin)
        const isEndNum = !isNaN(intEnd)

        const notEqual = intBegin !== intEnd

        return isLabelValid && isBegin
            && isEnd && isBeginNum
            && isEndNum && notEqual
    })
    // map "begin" and "end" to numbers
    .map((el) => {
        const label = (typeof el.label === 'string' || typeof el.label === 'number')
            ? el.label.toLowerCase()
            : el.label.map(x => new String(x).toString().toLowerCase())

        return {
            ...el,
            label,
            begin: parsePos(el.begin),
            end: parsePos(el.end)
        }
    })
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

            // handle text before first label
            const first = text.substring(0, clean[0].begin).trim()
            if (first.length)
                markup.push({ text: first })

            // handle first label
            const second = text.substring(clean[0].begin, clean[0].end).trim()
            if (second.length) {
                const lbl = clean[0].label
                if (typeof lbl === 'string') {
                    textLabels.push(lbl)
                } else {
                    lbl.forEach(el => {
                        textLabels.push(el)
                    })
                }

                markup.push({ text: second, label: clean[0].label })
            }

            // handle every other label
            clean.forEach(({ begin, end, label }, index) => {
                if (index === 0)
                    return

                const simpleText = text.substring(clean[index - 1].end, begin).trim()
                if (simpleText.length)
                    markup.push({ text: simpleText })

                const labelText = text.substring(begin, end).trim()
                if (labelText.length) {
                    markup.push({ text: labelText, label })

                    const notIncluded = x => !textLabels.includes(x)

                    if (typeof label === 'string' && notIncluded(label)) {
                        textLabels.push(label)
                    } else if (Array.isArray(label)) {
                        label.forEach(el => {
                            if (notIncluded(el))
                                textLabels.push(el)
                        })
                    }

                    tokenNum++
                }
            })

            // handle text after the last label
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
