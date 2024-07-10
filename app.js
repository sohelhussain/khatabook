const express = require('express');
const app = express();
require('dotenv').config();
const indexRouter = require('./routes/index-router');
const db = require('./config/mongoose-connection');
const cookieParser = require('cookie-parser');

const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/', indexRouter)

app.listen(3000);