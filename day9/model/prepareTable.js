const conn = require('./dbConnection');

exports.prepareTable = () => {
    const sql = 'drop table if exists example.musics ; CREATE TABLE example.musics ( id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(20), singer VARCHAR(50), introduction VARCHAR(150)););';
    conn.query(sql).then(ret => {
        console.log('musics 테이블 준비 완료');
        conn.end();
    }).catch(err => {
        console.log('musics 테이블 준비 실패 :', err);
        conn.end();
    });
}