const path = require("path")

const root = path.dirname(require.main.filename)

exports.uploadPath = fileName => path.join(root, 'uploads', fileName)
