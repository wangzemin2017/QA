"use strict";

const db = require('./db.js');

function Answer(answer){
	this.content = answer.content;
	this.time = answer.time;
	this.userId = answer.userId;
	this.questionId = answer.questionId;
}

Answer.prototype.save = function(callback){
	db.query('INSERT INTO answer VALUES(NULL, ?, ?, ?, ?)', [this.content, this.time, this.userId, this.questionId], function(err, result){
		if(err){
			return callback(err, null);
		}
		callback(null, result);
	});
};

// Answer.getAllAnswers = function(){
// 	db.
// }

module.exports = Answer;