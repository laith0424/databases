
const mysql = require('mysql');


const  root_connection  = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'todo',
} );


module.exports = root_connection;