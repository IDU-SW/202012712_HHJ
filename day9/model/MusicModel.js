const fs = require('fs');

const Sequelize = require('Sequelize');
const sequelize = new Sequelize('hellojs', 'root', 'hyeonju', { 
     dialect: 'mysql', host: 'localhost'
});

class Musics extends Sequelize.Model { }
    Musics.init({
        id: { 
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: Sequelize.STRING,
        singer: Sequelize.STRING,
        introduction: Sequelize.STRING
    }, {tableName:'musics', sequelize, timestamps: false});


class Music {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.musics = JSON.parse(data)
    }

    async oneDataInsert(music) {
        try {
            let musicData = await Musics.create({ 
                            title : musics.title, 
                            singer : musics.singer,  
                            introduction : musics.introduction
                        }, {logging:false});
            const newData = musicData.dataValues;

            return newData;
        } catch (error) {
            console.error(error);
        }
    }


    async allDataInsert() {
        const data = fs.readFileSync('./model/data.json');
        const musics = JSON.parse(data);
        for (var music of musics ) {
            await this.oneDataInsert(music);
        }
    }

    
    getMusicList = async() => {
        let returnValue;
        await Musics.findAll({})
        .then( results => {
            returnValue = results;
        })
        .catch( error => {
            console.error('Error :', error);
        });
        return returnValue;
    }


    addMusic = async(title, singer, introduction) => {
        const musics = {title, singer, introduction};
        try {
            const returnValue = await this.oneDataInsert(musics);
            console.log(returnValue);
            return returnValue;
        } catch (error) {
            console.error(error);
        }
    }

    
    getMusicDetail = async(Id) => {
        try {
            const ret = await Musics.findAll({
                where:{id:Id}
            });

            if ( ret ) {
                return ret[0];
            }
            else {
                console.log('데이터 없음');
            }
        }
        catch (error) {
            console.log('Error :', error);
        }
    }
}

module.exports = new Music();