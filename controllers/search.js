const fs = require('fs')
const { inputPath } = require('../utils/path')

exports.execute = (query, cb) => {
    fs.readFile(inputPath, (err, fileBuff) => {
        if (err) return []

        const file = JSON.parse(fileBuff)

        res = file.map(({ text }) => { return text })

        cb(res)
    })
}
