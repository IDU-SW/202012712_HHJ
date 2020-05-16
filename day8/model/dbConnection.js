const mysql = require('mysql2');

const dbConfig = {
   host: '127.0.0.1',
   user: 'root',
   password: 'hyeonju',
   port: 3306,
   database: 'hellojs',
   multipleStatements: true,
};

const pool = mysql.createPool(dbConfig).promise();
module.exports = pool;