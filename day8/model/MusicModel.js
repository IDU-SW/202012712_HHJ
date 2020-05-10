const fs = require('fs');

class Music {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.musics = JSON.parse(data)
    }

    getMusicList = async() => {   
        const sql = 'SELECT * from musics'
        let conn;
        try {
            conn = await pool.getConnection();
            const [rows, metadata] = await conn.query(sql);
            conn.release();
            return rows;
        } catch (error) {
            console.error(error);
        } finally {
            if ( conn ) conn.release();
        }
    }
    addMusic = async(title, singer, introduction) => {

        console.log(title);
        console.log(singer);
        console.log(introduction);

        const data = [title, singer, introduction];
        const sql = 'insert into musics(title, singer, introduction) values(?, ?, ?)';
        let conn;
        try {
            conn = await pool.getConnection();
            const [rows, metadata] = await conn.query(sql, data);
            conn.release();
            console.log('rows',rows);
            return rows[0];
        } catch (error) {
            console.error(error);
            return -1;
        } finally {
            if ( conn ) conn.release();
        }
    }

    getMusicDetail = async(musicId) => {
        const sql = 'SELECT * from musics where id = ?';
        let conn;
        try {
            conn = await pool.getConnection();
            const [rows, metadata] = await conn.query(sql, gameId);
            conn.release();
            console.log(rows);
            return rows[0];
        } catch (error) {
            console.error(error);
        } finally {
            if ( conn ) conn.release();
        }
    }
}

module.exports = new Music();