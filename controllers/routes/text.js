const db = require('../../utils/db')

exports.getText = (req, res) => {
    const id = req.params.id
    res.render('text', { title: 'text', id })
}
