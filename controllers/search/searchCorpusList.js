const corpusList = require('../corpus/corpusList')

module.exports = (query, sessionID, cb) => {
    // query db for all corpuses
    // and search

    corpusList(sessionID, (list) => {
        console.log(list)
        const listToRender = list.filter(({ originalName, uploadDate }) => (originalName.includes(query) || uploadDate.includes(query)))

        cb(listToRender)
    })
}
