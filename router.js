//总路由文件
"use strict";

const express = require('express');
const router = express.Router();

const mainCtrl = require('./controllers/main.js');
const userCtrl = require('./controllers/user.js');
const questionCtrl = require('./controllers/question.js');

router.get('/', mainCtrl.showMain);

router.get('/page/:pageNumber', questionCtrl.showByPageNum);

router.get('/register', userCtrl.showRegister);
router.post('/register', userCtrl.register);
router.get('/login', userCtrl.showLogin);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/settings', userCtrl.showPersonalPage);

router.get('/ask', questionCtrl.showAsk);
router.post('/ask', questionCtrl.ask);
router.get('/question/:id', questionCtrl.showQuestion);
router.get('/edit/:id', questionCtrl.showEdit);
router.post('/edit/:id', questionCtrl.edit);

module.exports = router;