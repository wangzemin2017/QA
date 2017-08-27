//与提问相关的方法
"use strict";

const User = require('../models/user.js');
const Question = require('../models/question.js');
const moment = require('moment');
const md = require('markdown-it');

exports.showAsk = function(req, res, next){
	let username = req.session.user.username;
	User.getByUsername(username, function(err, user){
		if(err){
			return next(err);
		}
		res.render('ask.xtpl', {
			user: user
		});
	});
};

exports.ask = function(req, res, next){
	let title = req.body.title.trim();
	let content = req.body.content;
	let time = moment().format('YYYY-MM-DD HH:mm:ss');
	let userId = req.session.user.id;

	if(title === '' || content === ''){
		return res.json({
			code: '0',
			message: '标题或内容不能为空！'
		});
	}
	let question = new Question({
		title,
		content,
		time,
		userId
	});
	question.save(function(err, question){
		if(err){
			return next(err);
		}
		if(question.insertId <= 0){
			return res.json({
				code: '0',
				message: 'fail'
			});
		}

		res.json({
			code: '1',
			message: question.insertId
		});
	});
};

exports.showQuestion = function(req, res, next){
	let id = req.params.id;
	Question.getByQuestionId(id, function(err, question){
		if(err){
			return next(err);
		}
		question.content = md().render(question.content);
		res.render('question.xtpl', {
			user: req.session.user,
			question: question
		});
	});
};

exports.showEdit = function(req, res, next){
	let id = req.params.id;
	Question.getByQuestionId(id, function(err, question){
		if(err){
			return next(err);
		}
		res.render('edit.xtpl', {
			user: req.session.user,
			question: question
		});
	});
};

exports.edit = function(req, res, next){
	if(!req.session.user){
		return res.redirect('/');
	}
	let title = req.body.title.trim();
	let content = req.body.content;
	let time = moment().format('YYYY-MM-DD HH:mm:ss');
	let userId = req.session.user.id;

	if(title === '' || content === ''){
		return res.json({
			code: '0',
			message: '标题或内容不能为空！'
		});
	}
	let question = new Question({
		title,
		content,
		time,
		userId
	});
	question.save(function(err, question){
		if(err){
			return next(err);
		}
		if(question.insertId <= 0){
			return res.json({
				code: '0',
				message: 'fail'
			});
		}
		res.json({
			code: '1',
			message: question.insertId
		});
	});
};

exports.showByPageNum = function(req, res, next){
	let pageNumber = req.params.pageNumber;
	let pageSize = req.app.locals.config.pageSize;
	let skipNumber = (pageNumber - 1)*pageSize;
	Question.getByPageNumber(skipNumber, pageSize, function(err, questions){
		if(err){
			return next(err);
		}
		questions.map(function(question){
			question.time = moment(question.time).startOf('second').fromNow();
		});
		res.json({
			questions: questions
		});
	});
};