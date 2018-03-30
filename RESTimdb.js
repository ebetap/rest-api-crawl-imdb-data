const mysql = require("mysql");

function REST_ROUTER(router,mysqlAuth,md5){
	var self = this;
	self.Routes(router,mysqlAuth,md5);	
}


REST_ROUTER.prototype.Routes = function(router,mysqlAuth,md5){
	router.get('/datafilm',(req,res) => {
		var query = 'SELECT * FROM ??';
		var table = 'first_mining';
		query = mysql.format(query,table);
		mysqlAuth.query(query,(err,rows) => {
			if (err) {
				res.json({"Message" : err});
			}else{
				res.json({rows});
			}
		});
	});
};


module.exports = REST_ROUTER;