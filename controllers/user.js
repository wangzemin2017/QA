//与用户相关的方法
"use strict";

const User = require('../models/user.js');
const utility = require('utility');
const formidable = require('formidable');

const uPattern = /^[a-zA-Z0-9_-]{6,15}$/;
const ePattern = /^([0-9a-zA-Z_\-\.])+\@([0-9a-zA-Z_\-\.])+\.([a-zA-Z]{2,4})$/;

//展示注册界面
exports.showRegister = function(req, res, next){
	res.render('register.xtpl');
};

//处理用户的注册请求
exports.register = function(req, res, next){
	//获取用户信息
	let username = req.body.username;
	let password = req.body.password;
	let email = req.body.email;
	let vcode = req.body.vcode;
	let avatar = 'avatar.png';

	if(username === '' || password === '' || email === ''){
		return res.json({
			code: '0',
			message: '请将信息填写完整！'
		});
	}else if(!uPattern.test(username)){
		return res.json({
			code: '0',
			message: '用户名不符合规范！'
		});
	}else if(!ePattern.test(email)){
		return res.json({
			code: '0',
			message: '邮箱不符合规范！'
		});
	}

	User.getByUsername(username, function(err, result){
		if(err){
			return next(err);
		}

		if(result){
			return res.json({
				code: '0',
				message: '用户名已存在！'
			});
		}

		password = utility.md5(utility.md5(password + req.app.locals.config.secret));

		let user = new User({
			username,
			password,
			email,
			avatar
		});

		user.save(function(err, result){
			if(err){
				return next(err);
			}
			if(result.insertId <= 0){
				return res.json({
					code: '0',
					message: 'fail'
				});
			}
			user.id = result.insertId;
			req.session.user = user;
			res.json({
				code: '1',
				message: 'success'
			}); 
		});
	});
};

exports.showLogin = function(req, res, next){
	res.render('login');
};

exports.login = function(req, res, next){
	let username = req.body.username.trim();
	let password = req.body.password;

	if(username === '' || password === ''){
		return res.json({
			code: '0',
			message: '用户名或密码不能为空！'
		});
	}

	User.getByUsername(username, function(err, result){
		if(err){
			return next(err);
		}

		if(!result){
			return res.json({
				code: '0',
				message: '用户名不存在！'
			});
		}

		password = utility.md5(utility.md5(password + req.app.locals.config.secret));
		if(result.password !== password){
			return res.json({
				code: '0',
				message: '密码错误！'
			});
		}

		req.session.user = result;
		res.json({
			code: '1',
			message: 'success'
		});
	});
};

exports.logout = function(req, res, next){
	req.session.user = null;
	// res.redirect('/');
	res.render('logout.xtpl');
};

exports.showPersonalPage = function(req, res, next){
	let username = req.session.user.username;
	User.getByUsername(username, function(err, result){
		res.render('settings.xtpl', {
			user: result
		});
	});
};

exports.changeAvatar = function(req, res, next){
	let form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	form.uploadDir = req.app.locals.config.avatarDir;

	form.parse(req, function(err, fields, files){
		if(err){
			return res.json({
				code: '0',
				message: 'fail'
			});
		}

		let avatar = files.avatar;
		let tmpPath = avatar.path;
		let size = avatar.size;
		let name = avatar.name;
		
	})
}