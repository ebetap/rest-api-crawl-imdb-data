const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const rest = require("./RESTimdb.js");
const app = express();

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

function REST(){
	var self = this;
	this.connectMysql();
}

//Create a Connection to mySQL database
REST.prototype.connectMysql = function() {
	var self = this;
	var mysqlAuth = mysql.createPool(
		{
			connectionLimit : 100,
			host 			: 'localhost',
			user			: 'root',
			password		: 'namamu',
			database		: 'db_imdb',
			debug			: false
		}
	);
	this.configExpress(mysqlAuth);
};

//Create configuration & Routes
REST.prototype.configExpress = function(mysqlAuth){
	var self = this;
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	var router = express.Router();
	app.use('/api',router);
	var rest_router = new rest(router,mysqlAuth,md5);
	self.startServer();
}

REST.prototype.startServer = function() {
	app.listen(3000,() => {
		console.log('Server running on port 3000');
	});
}

REST.prototype.stop = function(err){
	if(err) throw err;
}

new REST();