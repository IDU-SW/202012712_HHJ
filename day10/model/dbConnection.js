const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
   const db = client.db('hellojs');
   console.log("에러 : ", err);
});

module.exports = MongoClient;