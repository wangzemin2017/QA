//与首页相关的方法
"use strict";

const Question = require('../models/question.js');

exports.showMain = function(req, res, next){
	Question.getAllCount(function(err, count){
		if(err){
			return next(err);
		}
		let pageSize = req.app.locals.config.pageSize;
		let totalPage = Math.ceil(parseInt(count) / pageSize);
		res.render('main.xtpl', {
			user: req.session.user,
			totalPage: totalPage
		});
	});
};