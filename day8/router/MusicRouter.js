const express = require('express');
const router = express.Router();
const musics = require('../model/MusicModel');

router.get('/musics', async (req, res) => {
    const data = await musics.getMusicList();
    
    res.render('musics', {musics:data, count:data.length});
});

router.get('/musics', showMusicList);
router.get('/musics/:musicId', showMusicDetail);
router.post('/musics', addMusic);
router.get('/music/add',addMusicForm);

module.exports = router;

async function showMusicList(req, res) {
    try {
        // 영화 상세 정보 Id
        const musicId = req.params.musicId;
        const info = await musics.getMusicDetail(musicId);

        res.render('musicsdetail', {detail:info});
    }
    catch ( error ) {
        console.error('연결 실패', error);
        //console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}



// Async-await를 이용하기
async function showMusicDetail(req, res) {
    try {
        // 영화 상세 정보 Id
        const musicId = req.params.musicId;
        console.log('musicId : ', musicId);
        const info = await musics.getMusicDetail(musicId);
        //res.send(info);
        res.render('musicsdetail', {detail:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}


// 새 영화 추가
function addMusicForm(req, res) {
    res.render('musicadd');
}
// POST 요청 분석 -> 바디 파서
async function addMusic(req, res) {
    const title = req.body.title;

    if (!title) {
        res.status(400).send({error:'title 누락'});
        return;
    }

    const singer = req.body.singer;
    const introduction = req.body.introduction;

    try {
        const result = await musics.addMusic(title, singer, introduction);
        //res.send({msg:'success', data:result});
        res.render('addSuccess', {data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}