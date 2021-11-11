const fs = require('fs')
const path = require('path')

const root = path.dirname(process.mainModule.filename)

const inputPath = path.join(root, 'data', 'input', 'input.json')

exports.parseInput = (cb) => {
    fs.readFile(inputPath, (err, fileBuff) => {
        if (err) return [];

        let globalRes = []

        const texts = JSON.parse(fileBuff)

        texts.map(({ labels, text }) => {
            let res = []

            for (const label in labels) {
                for (const coords of labels[label]) {
                    const token = text.substring(coords[0], coords[1])
                    if (token)
                        res.push({ label: label.toLowerCase(), token })
                }
            }

            globalRes.push(res)
        })

        cb(globalRes)
    })
}
