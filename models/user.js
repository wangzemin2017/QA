//构造与用户相关的方法
"use strict";

const db = require('./db.js');

function User(user){
	this.username = user.username;
	this.password = user.password;
	this.email = user.email;
	this.avatarPath = user.avatarPath;
}

User.prototype.save = function(callback){
	db.query('INSERT INTO user VALUES(NULL, ?, ?, ?, ?)',
		[this.username, this.password, this.email, this.avatarPath],
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

User.changeAvatarById = function(avatarPath, id, callback){
	db.query('UPDATE user SET avatarPath = ? WHERE id = ?', [avatarPath, id], function(err, result){
		if(err){
			return callback(err, null);
		}
		callback(null, result);
	});
};

module.exports = User;