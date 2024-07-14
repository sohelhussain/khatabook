const express = require('express');
const app = express();
require('dotenv').config();
const indexRouter = require('./routes/index-router');
const hisaabRouter = require('./routes/hisaab-router');
const db = require('./config/mongoose-connection');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');

const path = require('path');

app.set('view engine', 'ejs');
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXP_SES
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/hisaab', hisaabRouter);

app.listen(3000);