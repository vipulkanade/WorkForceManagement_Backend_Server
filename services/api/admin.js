var ejs = require("ejs");
var mysql = require("../controllers/mysql");

function handle_get_admin_request(msg, callback){	
	var res = {};
	var userID ;
	var getAdmin = ""; // SQL Query
	console.log("Query Get Admin Log : " + getAdmin.toString());
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
			if((results.length > 0)){

					// Values for error or Success
					res.code = "200";
					res.value = "Success";
					res.error = "none";
					res.admin_details = results[0];
					res.status = true;
					
					console.log("valid login");	
					callback(null, res);
			} else {
				
				res.code = "401";
				res.value = "User not Valid";
				console.log("Invalid Login");
				callback(null, res);
			}		
		}
	}, getAdmin);	
}

exports.handle_get_admin_request = handle_get_admin_request;