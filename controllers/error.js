exports.getNotFound = (req, res, next) => {
    // const file = path.join(__dirname, 'views', '404.html')
    // res.status(404).sendFile(file)
    res.status(404).render('404')
}
