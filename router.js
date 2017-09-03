//总路由文件
"use strict";

const express = require('express');
const router = express.Router();

const mainCtrl = require('./controllers/main.js');
const userCtrl = require('./controllers/user.js');
const questionCtrl = require('./controllers/question.js');

router.get('/', mainCtrl.showMain);

router.get('/page/:pageNumber', questionCtrl.showByPageNum);

router.get('/register', [hasAuthority,userCtrl.showRegister]);
router.post('/register', userCtrl.register);
router.get('/login', [hasAuthority,userCtrl.showLogin]);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/settings', userCtrl.showPersonalPage);
router.post('/settings', [notAuthority,userCtrl.changeAvatar]);

router.get('/ask', [notAuthority,questionCtrl.showAsk]);
router.post('/ask', questionCtrl.ask);
router.post('/ask/upload', questionCtrl.uploadPicture);
router.get('/question/:id', questionCtrl.showQuestion);
router.get('/edit/:id', questionCtrl.showEdit);
router.post('/edit/:id', questionCtrl.edit);

function hasAuthority(){
	if(req.session.user){
		return res.redirect('/');
	}
	next();
}

function notAuthority(){
	if(!req.session.user){
		return res.redirect('/');
	}
	next();
}

module.exports = router;