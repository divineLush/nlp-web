const pg = require('pg')

const pool = new pg.Pool({
    host: 'localhost',
    user: 'root',
    database: 'nlp-web',
    password: 'nlpweb',
    port: '5432'
});

module.exports = pool
