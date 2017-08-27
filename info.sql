CREATE DATABASE IF NOT EXISTS info;

USE info;

CREATE TABLE user(
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(20) NOT NULL,
	password VARCHAR(60) NOT NULL,
	email VARCHAR(60) NOT NULL
);

CREATE TABLE question(
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
	content TEXT NOT NULL,
	time DATETIME NOT NULL,
	userId INT NOT NULL
);

CREATE TABLE comment(
	id INT PRIMARY KEY AUTO_INCREMENT,
	content TEXT NOT NULL,
	time DATETIME NOT NULL,
	userId INT NOT NULL,
	questionId INT NOT NULL
);