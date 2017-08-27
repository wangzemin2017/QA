//入口文件
"use strict";

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const config = require('./config.js');
const router = require('./router.js');

const app = express();
app.locals.config = config;

app.use('/www', express.static('www'));

app.use(cookieParser());

app.use(session({
	secret: config.secret,
	resave: false,
	saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'xtpl');

app.use(router);

if(config.debug){
	app.use(function(err, req, res, next){
		res.send('服务器被你玩坏了...' + err.message);
	});
}

app.listen(3000, '127.0.0.1', function(){
	console.log('Server is listening at port 3000');
});