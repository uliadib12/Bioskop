// memanggil library mysql
const mysql = require('mysql');

// membuat koneksi ke database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_bioskop'
});

// export module db
module.exports = db;