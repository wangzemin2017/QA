//设置一些常量
"use strict";

const path = require('path');

module.exports = {
	debug: true,
	secret: 'wzm',
	pageSize: 6,
	uploadDir: path.join(__dirname, 'upload/picture'),
	avatarDir: path.join(__dirname, 'upload/avatar')
}