module.exports = (inputDate) => {
    const date = new Date(inputDate)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()

    return `${day}-${month}-${year}`
}
