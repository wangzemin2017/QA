//数据库相关方法
"use strict";

const mysql = require('mysql');

let pool = mysql.createPool({
	connectionLimit: 50,
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'info'
});

exports.query = function(sql, option, cb){
	let params = [];
	let callback;
	if(arguments.length === 2 && typeof arguments[1] === 'function'){
		callback = option;
	}else if(arguments.length === 3 && Array.isArray(arguments[1]) && typeof arguments[2] === 'function'){
		params = option;
		callback = cb;
	}else{
		throw new Error('参数个数不匹配，请重新输入');
	}

	pool.getConnection(function(err, connection){
		connection.query(sql, params, function(){
			connection.release();
			callback.apply(null, arguments);
		});
	});
};

