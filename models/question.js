//构造提问相关的方法
"use strict";

const db = require('./db.js');

function Question(question){
	this.title = question.title;
	this.content = question.content;
	this.time = question.time;
	this.userId = question.userId;
}

Question.prototype.save = function(callback){
	db.query('INSERT INTO question VALUES(NULL, ?, ?, ?, ?)',
		[this.title, this.content, this.time, this.userId],
		function(err, result){
			if(err){
				return callback(err, null);
			}
			callback(null, result);
		});
}; 

Question.getByQuestionId = function(id, callback){
	db.query('SELECT * FROM question WHERE id = ?', [id], function(err, result){
		if(err){
			return callback(err, null);
		}
		callback(null, result[0]);
	});
};

Question.getAllCount = function(callback){
	db.query('SELECT COUNT(id) as count FROM question', function(err, result){
		if(err){
			return callback(err, null);
		}
		callback(null, result[0].count);
	});
};

Question.getByPageNumber = function(skipNumber, pageSize, callback){
	db.query('SELECT q.id, q.title, q.time, u.username, u.avatarPath FROM question as q INNER JOIN user as u ON q.userId = u.id ORDER BY time DESC LIMIT ?, ?', 
		[skipNumber, pageSize], 
		function(err, result){
			if(err){
				return callback(err, null);
			}
			callback(null, result);
	});
};

Question.updateEdit = function(title, content, time, id, callback){
	db.query('UPDATE question SET title =?, content =?, time =? WHERE id =?', [title, content, time, id], function(err, result){
		if(err){
			return callback(err, null);
		}
		callback(null, result);
	});
};

module.exports = Question;