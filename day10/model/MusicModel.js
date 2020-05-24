const fs = require('fs');
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/hellojs';
var ObjectID = require('mongodb').ObjectId;

var db;

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, database) {
    if (err) {
        console.error('MongoDB 연결 실패', err);
        return;
    }
    // connection을 할 때에 database명을 명시해야함
    db = database.db('hellojs');
});

class Music {}

// Read (전체 조회)
Music.getMusicList = () => {
    return db.collection('musics').find({}).toArray()
    
}

// Read Detail (id값 별 상세 조회)
Music.getMusicDetail = async (musicId) => {
    return await db.collection('musics').findOne({ _id: new ObjectID(musicId) });
}

// Add
Music.addMusic = async (title, singer, introduction) => {
    const data = { title, singer, introduction };
    try {
        const returnValue = await dataOneAdd(data);
        return returnValue;
    } catch (error) {
        console.error(error);
    }
}

// Add 
async function dataOneAdd(music) {
    try {
        let musicData = await db.collection('musics').insertOne({
            title: music.title,
            singer: music.singer,
            introduction: music.introduction
        }, { logging: false });
        const newMusic = musicData;
        console.log('입력된 데이터 : ', newMusic);
        return newMusic;
    } catch (error) {
        console.log(error);
    }
}


module.exports = Music;