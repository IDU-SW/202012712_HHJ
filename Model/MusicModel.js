const fs = require('fs');

class Music {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.music = JSON.parse(data)
    }

    // Promise 예제
    getMusicList() {
        if (this.music) {
            return this.music;
        }
        else {
            return [];
        }
    }

    addMusic(title, singer, introduction) {
        return new Promise((resolve, reject) => {
            let last = this.music[this.music.length - 1];
            let id = last.id + 1;

            let newMusic = {id, title, singer, introduction};
            this.music.push(newMusic);

            resolve(nerMusic);
        });
    }

    // Promise - Reject
    getMusicDetail(musicId) {
        return new Promise((resolve, reject) => {
            for (var music of this.music ) {
                if ( music.id == musicId ) {
                    resolve(music);
                    return;
                }
            }
            reject({msg:'Can not find Music', code:404});
        });
    }
}

module.exports = new Music();