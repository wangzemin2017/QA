"use strict";

const Answer = require('../models/answer.js');
const moment = require('moment');

exports.answer = function(req, res, next){
	let content = req.body.content;
	let time = moment().format('YYYY-MM-DD HH:mm:ss');
	let userId = req.session.user.id;
	let questionId = req.body.questionId;

	// console.log([content, time, userId, questionId])
	if(!content){
		return res.json({
			code: '0',
			message: '回答内容不能为空！'
		});
	}
	let answer = new Answer({
		content,
		time,
		userId,
		questionId
	});
	answer.save(function(err, result){
		if(err){
			return next(err);
		}
		if(result.insertId <= 0){
			return res.json({
				code: '0',
				message: 'fail'
			});
		}
		res.json({
			code: '1',
			message: 'success'
		});
	});
};