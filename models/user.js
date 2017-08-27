//构造与用户相关的方法
"use strict";

const db = require('./db.js');

function User(user){
	this.username = user.username;
	this.password = user.password;
	this.email = user.email;
	this.avatar = user.avatar;
}

User.prototype.save = function(callback){
	db.query('INSERT INTO user VALUES(NULL, ?, ?, ?)',
		[this.username, this.password, this.email],
		function(err, result){
			if(err){
				return callback(err, null);
			}
			callback(null, result);
		});
};

User.getByUsername = function(username, callback){
	db.query('SELECT * FROM user WHERE username=?', [username], function(err, result){
		if(err){
			return callback(err, null);
		}
		callback(null, result[0]);
	});
};

module.exports = User;