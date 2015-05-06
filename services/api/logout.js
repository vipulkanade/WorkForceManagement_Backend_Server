
exports.handle_logout_request = handle_logout_request;


function handle_logout_request(msg,callback){
	var res = {};
	console.log(msg.useremail + " is Signed out successfully");
	res.code = "200";
	res.value = "Success";
	res.error = "none";
	res.status = true;
	callback(null,res);			
}

