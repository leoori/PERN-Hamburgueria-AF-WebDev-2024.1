const { query, text } = require('express')
const {Pool} = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pern_hamburgueria',
    password: '1503',
    port: 5432,
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}