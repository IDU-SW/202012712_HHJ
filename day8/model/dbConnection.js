const mysql = require('mysql2');

const dbConfig = {
   host: 'localhost',
   user: 'root',
   password: 'hyeonju',
   port: 3306,
   database: 'hellojs',
   multipleStatements: true,
};

const pool = mysql.createPool(dbConfig).promise();
module.exports = pool;