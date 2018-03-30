const mysql = require("mysql");

function REST_ROUTER(router,pool,md5){
	var self = this;
	self.handleRoutes(router,pool,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,pool,md5) {
	router.get('/',(req,res) => {
		res.json({
			"Message" : "Welcome to Dek b Restful API Service"
		});
	});

	//POST DATA USERS
	router.post('/users', function(req,res){
		var query = "INSERT INTO ??(??,??) VALUES (?,?)";
		var table = ["user_login","user_email","user_password",req.body.email,md5(req.body.password)];
		query = mysql.format(query,table);
		pool.query(query,function(err,rows){
			if(err){
				res.json({"Message" : "Terjadi error saat eksekusi Query"});			
			}else{
				res.json({"Message" : "User berhasil ditambahkan !"});
			}
		});
	});

	//GET ALL USER DATA
	router.get('/users',function(req,res){
		var query = "SELECT user_id,user_email,user_join_date FROM ??";
		var table = "user_login";
		query = mysql.format(query,table);
		pool.query(query,function(err,rows){
			if(err){
				res.json({"Message":"Terjadi error saat eksekusi Query"});

			}else{
				res.json({
					"Message" : "Success",
					"users " : rows
				});
			}
		});
	});

	//GET USER DATA BY ID
	router.get('/users/:user_id', function(req,res){
		var query = "SELECT * FROM ?? WHERE ??=?";
		var table = ["user_login","user_id",req.params.user_id];
		query = mysql.format(query,table);
		pool.query(query, function(err,rows){
			if(err){
				res.json({"Message":"Terjadi error saat eksekusi Query"});
			}else{
				res.json({
					"Message" : "Success",
					"users " : rows
				});
			}
		});
	});

	//PUT USER DATA
	router.put('/users',function(req,res){
		var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["user_login","user_password",md5(req.body.password),"user_email",req.body.email];
        query = mysql.format(query,table);
        pool.query(query, function(err,rows){
        	if(err){
        		res.json({"Message" : "Terjadi Error: " + err});
        	}else{
        		res.json({"Message" : "Password email : " +req.body.email+" telah diubah."});
        	}
        });
	});

	//DELETE USER
	router.delete('/users/:email',function(req,res){
		var query = "DELETE FROM ?? WHERE ?? = ?";
		var table = ["user_login","user_email",req.params.email];
		query = mysql.format(query,table);
		pool.query(query, function(err,rows){
			if(err){
				res.json({"Error" : ""+err });
			}else{
				res.json({"Message" : "Users dengan email : " + req.params.email + " Successfully Deleted !"});
			}
		});
	});
};

module.exports = REST_ROUTER;