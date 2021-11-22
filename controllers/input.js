const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const root = path.dirname(process.mainModule.filename)

const inputPath = path.join(root, 'data', 'input', 'input.json')

exports.parseInput = (cb) => {
    fs.readFile(inputPath, (err, fileBuff) => {
        if (err) return []

        let globalRes = []

        JSON.parse(fileBuff).forEach(({ labels, text }) => {
            const markup = []
            const labelsByText = []
            let tokenNum = 0

            for (const label in labels) {
                for (const coords of labels[label]) {
                    const { begin, end } = coords

                    if (!Number.isFinite(begin) || !Number.isFinite(end)) continue

                    const cleanCoords = begin < end
                        ? { begin, end } : { begin: end, end: begin }

                    const token = text.substring(cleanCoords.begin, cleanCoords.end)
                    if (token) {
                        tokenNum++
                        lowLabel = label.toLowerCase()

                        labelsByText.push(lowLabel)

                        markup.push({
                            label: lowLabel,
                            coords: cleanCoords,
                            token
                        })
                    }
                }
            }

            globalRes.push({
                labels: labelsByText,
                id: uuidv4(),
                markup,
                tokenNum
            })
        })

        // const sortedRes = globalRes.map(text =>
        //     text.sort((a, b) => a.coords.begin - b.coords.begin)
        // )

        // console.log('global', globalRes[0])
        // console.log('sorted', sortedRes[0])

        cb(globalRes)
    })
}
