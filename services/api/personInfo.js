var ejs = require("ejs");
var mysql = require("../controllers/mysql");
var mysql_query = require("../utility/utility");

function handle_Get_Person_Name_Type_Details_Request(msg, callback){	
	
	var getPersonNameType = "call proc_get_Person_Info("+msg.ssn+");";
	console.log("Query Login Log : " + getPersonNameType.toString());
	mysql_query.getDataExecuteQuery(getPersonNameType,callback,"Person details not available");

}

exports.handle_Get_Person_Name_Type_Details_Request = handle_Get_Person_Name_Type_Details_Request;