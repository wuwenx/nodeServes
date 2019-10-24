const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'wuwx',
    password: 'wuwx1224.',
    database: 'nodeSql'
})
connection.connect((err) => {
    if (err) {
        console.log(err)
    }
});
module.exports = connection
