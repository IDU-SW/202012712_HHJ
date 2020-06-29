const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
const musics = require('../model/MusicModel');

router.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'Secret Key'})
 );

router.use(bodyParser.urlencoded({extended:false}));

const user = {
    id : 'admin',
    password : '1234',
    name : 'admin',
 }

  
router.post('/login', handleLogin);
router.delete('/logout',handleLogout);

router.get('/musics', async (req, res) => {
    const data = await musics.getMusicList();
    
    res.render('musics', {musics:data, count:data.length});
});

// CRUD 적용
router.get('/musics', showMusicList);

router.get('/musics/:musicId', showMusicDetail);

router.post('/musics', addMusic);
router.get('/music/add',addMusicForm);

router.get('/musics/detail/:musicId', updateMusicForm);
router.post('/musics/edit', updateMusic);

router.delete('/musics/:musicId', deleteMusic);
router.post('/musics/delete', deleteMusic);


module.exports = router;

// 로그인
function handleLogin(req, res) {
    const id = req.body.id;
    const password = req.body.password;
 
    if ( id === user.id && password === user.password ) {
       // 로그인 성공시 : 세션에 사용자 ID 저장
       req.session.userid = id;
       res.sendStatus(200);
    }
    else {
       res.sendStatus(401);
    }
 }

 // 로그아웃
 function handleLogout(req, res) {
    req.session.destroy( err => {
       if ( err ) {
          res.sendStatus(500);
       }
       else {
          // 로그아웃 성공
          res.sendStatus(200);
       }
    });
 }

// 음악 목록
async function showMusicList(req, res) {
    try {
        const musicId = req.params.musicId;
        const info = await musics.getMusicDetail(musicId);

        res.render('musicsDetail', {detail:info});
    }
    catch ( error ) {
        console.error('연결 실패', error);
        //console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}



// 음악 상세 보기
async function showMusicDetail(req, res) {
    try {
        const musicId = req.params.musicId;
        console.log('musicId : ', musicId);
        const info = await musics.getMusicDetail(musicId);
        //res.send(info);
        res.render('musicsDetail', {detail:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

// 음악 추가 폼
function addMusicForm(req, res) {
    res.render('musicsAdd');
}

// 음악 추가
async function addMusic(req, res) {
    const title = req.body.title;

    const singer = req.body.singer;
    const introduction = req.body.introduction;

    if (!title || !singer || !introduction) {
        res.status(400).send({error:'모두 입력해주세요!'});
        return;
    }

    try {
        const result = await musics.addMusic(title, singer, introduction);
        //res.send({msg:'success', data:result});
        res.render('addSuccess', {data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

// 음악 수정 폼
async function updateMusicForm(req, res) {
    try {
       
        const musicId = req.params.musicId;
        console.log('musicId : ', musicId);
        const info = await musics.getMusicDetail(musicId);

        res.render('musicsUpdate', {detail:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

// 음악 수정
async function updateMusic(req, res) {

    const id = req.body.id;
    const title = req.body.title;

    if (!title) {
        res.status(error.code).send({msg:error.msg});
        return;
    }
    const singer = req.body.singer;
    const introduction = req.body.introduction;
  

    try {
        const result = await musics.updateMusic(id, title, singer, introduction);
        console.log(result);
        res.render('updateSuccess',{data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

// 음악 삭제
async function deleteMusic(req, res) {
    try {
        const id = req.body.id; 
        const result = await musics.deleteMusic(id);
        res.render('deleteSuccess');
    }
    catch ( error ) {
        res.status(error.code).send({msg:error.msg});
    }
}

