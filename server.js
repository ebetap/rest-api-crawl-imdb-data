const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const md5 = require("md5");
const rest = require("./REST.js");
const application = express();


function REST() {
	var self = this;
	self.connectMysql();
}
//Create Connection
REST.prototype.connectMysql = function() {
	var self = this;
	var pool = mysql.createPool({
		host			: 'localhost', // your server
		user			: 'root', //your mySQL username
		password		: 'namamu',//your MySQL password
		database		: 'restful_api', //your database
		debug			: false
	});
	self.configureExpress(pool);
}
//Configuration
REST.prototype.configureExpress = function(pool){
	var self = this;
	application.use(bodyParser.urlencoded({extended:true}));
	application.use(bodyParser.json());
	var router = express.Router();
	application.use('/api',router);
	var rest_router = new rest(router,pool,md5);
	self.startServer();
}
//create function to start The server
REST.prototype.startServer = function() {
	application.listen(3000,function(){
		console.log("Server berjalan di port 3000");
	});
}

REST.prototype.stop = function(err){
	console.log("Ada masalah di mysql :" +err);
	process.exit(1);
}

new REST();