const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.set('views', __dirname + '/view');
app.set('view engine' , 'ejs');


app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

const musicRouter = require('./router/MusicRouter');
app.use(musicRouter);

module.exports = app;