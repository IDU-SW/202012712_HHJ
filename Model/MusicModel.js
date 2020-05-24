const fs = require('fs');

class Music {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.musics = JSON.parse(data)
    }

    // Promise 예제
    getMusicList() {
        if (this.musics) {
            return this.musics;
        }
        else {
            return [];
        }
    }

    addMusic(title, singer, infomation) {
        return new Promise((resolve, reject) => {
            let last = this.musics[this.musics.length - 1];
            let id = last.id + 1;

            let newMusic = {id, title, singer, infomation};
            this.musics.push(newMusic);

            resolve(newMusic);
        });
    }

    // Promise - Reject
    getMusicDetail(musicId) {
        return new Promise((resolve, reject) => {
            for (var music of this.musics ) {
                if ( music.id == musicId ) {
                    resolve(music);
                    return;
                }
            }
            reject({msg:'Can not find music', code:404});
        });
    }
}

module.exports = new Music();