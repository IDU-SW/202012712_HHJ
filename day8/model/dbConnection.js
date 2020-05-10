var pool = require('./dbConnection');

const mysql = require('mysql2');

const dbConfig = {
   host: 'localhost',
   user: 'root',
   password: 'root',
   port: 3306,
   database: 'nodejs',
   multipleStatements: true,
};

const pool = mysql.createPool(dbConfig).promise();
module.exports = pool;