var ejs = require("ejs");
var mysql = require("../controllers/mysql");
var mysql_query = require("../utility/utility");
var crypto = require('crypto');


function handle_get_building_list(msg,callback){
	console.log("Inside Server get building list function");
	
	var GuardSSN = msg.GuardSSN;
	var getbuildingListQuery = "call proc_getBuildingListForGuard("+GuardSSN+");";
	console.log("Timeline Query  : " + getbuildingListQuery);
	
	mysql_query.getDataExecuteQuery(getbuildingListQuery,callback,"No building data available");	
};


function handle_get_timeline(msg,callback){
	console.log("Inside Server get timeline function");
	
	var GuardSSN = msg.GuardSSN;
	var getTimelineQuery = "call proc_getGuardTimelineDetail("+GuardSSN+");";
	console.log("Timeline Query  : " + getTimelineQuery);
	
	
	mysql_query.getDataExecuteQuery(getTimelineQuery,callback,"No timeline data available");
		
};

function handle_get_alerttype(msg,callback){
	console.log("Inside Server get alert type function");
	
	var alertTypeQuery = "call proc_getAlertTypes();";
	//console.log("alert type Query  : " + alertTypeQuery);
		
	mysql_query.getDataExecuteQuery(alertTypeQuery,callback,"No alerttype data available");
		
};

function handle_add_alert(msg, callback){	
	console.log("Inside Server add alert function");
	//var res = {};
	var userID ;
	
	var alertDescription = msg.alertDescription;
	var alertDate = msg.alertDate;
	var alertTime = msg.alertTime;
	var alertCheckpoint = msg.alertCheckpoint;
	var alertBuilding = msg.alertBuilding;
	var alertType = msg.alertType;
	var alertSeverity = msg.alertSeverity;
	var alertGuardSSN = msg.alertGuardSSN;
	
	var addAlertQuery =  "call proc_insertAlertData('"+alertDescription+"','"+alertDate+"','"+ alertTime +"','"+
											alertCheckpoint+"','"+alertBuilding+"','"+alertType+"','"+alertSeverity+"',"
											+alertGuardSSN+");";
	console.log("add alert query :"+addAlertQuery);
	
	mysql_query.postDataExecuteQuery(addAlertQuery,callback,"alert not added");

};


function handle_get_guard_schedule(msg,callback){
	console.log("Inside get schedule function");
	
	var getScheduleQuery = "call proc_getGuardSchedule("+msg.GuardSSN+","+msg.month+");";
	
	mysql_query.getDataExecuteQuery(getScheduleQuery,callback,"No Schedule available");
}

function handle_Get_All_Guard_Details(msg,callback){
	console.log("Inside get guard function");
	
	var getAllGuardsQuery = "call proc_getAllGuardDetails()";
	
	mysql_query.getDataExecuteQuery(getAllGuardsQuery,callback,"No Guard available");
}

function handle_Get_All_Checkpoints(msg,callback){
	console.log("Inside checkpoint function");
	
	var getAllCheckpoints = "call proc_getCheckpointsForAllBuildings()";
	
	mysql_query.getDataExecuteQuery(getAllCheckpoints,callback,"No Checkpoint available");
}

function postAddUpdateGuardRequest(msg, callback){	
	console.log("Inside Server add update Guard function");
	var res = {};
	
	var guard_ssn = msg.guard_ssn;
	var background_status_check = msg.background_status_check;
	var email_id = msg.email_id;
	var password = msg.password;
	var first_name = msg.first_name;
	var last_name = msg.last_name;
	var address = msg.address;
	var city = msg.city;
	var state = msg.state;
	var zipcode = msg.zipcode;
	var phone_number = msg.phone_number;
	var querytype = msg.query;
	console.log("jheeeel");
	if(querytype === 0)
	{
		var checkExistUserQuery = "call proc_checkPersonExists("+guard_ssn+");";
		
		mysql.fetchData(function(err,results){
			if(err) {
				throw err;
			} else {
						if(results[0].affectedRows > 0)
						{
							res.code = "201";
							res.value = "Guard Already Exists";
							res.error = "none";
							res.status = true;
							callback(null, res);
									
						}
						else
						{
							var salt = crypto.randomBytes(64).toString('hex');
							crypto.pbkdf2(password, salt, 10000, 64, function(err, derivedKey) {
								
								var postAddGuardQuery =  "call proc_AddGuard("+guard_ssn+",'"+ background_status_check +"','"
								+email_id+"','"+first_name+"','"+last_name+"','"+address+"','"+city+"','"+state+"','"
								+zipcode+"','"+phone_number+"','"+derivedKey+"','"+salt+"');";
								console.log("add guard query :"+postAddGuardQuery);
		
								mysql_query.postDataExecuteQuery(postAddGuardQuery,callback,"Guard not added");
		
								
							});	
						}
			}
		}, checkExistUserQuery);	
	}
	else if(querytype === 1)
	{
		var salt = crypto.randomBytes(64).toString('hex');
		crypto.pbkdf2(password, salt, 10000, 64, function(err, derivedKey) {
		
			var postUpdateGuardQuery =  "call proc_UpdateGuard("+guard_ssn+",'"+ background_status_check +"','"
			+email_id+"','"+first_name+"','"+last_name+"','"+address+"','"+city+"','"+state+"','"
			+zipcode+"','"+phone_number+"','"+derivedKey+"','"+salt+"');";
			console.log("update guard query :"+postUpdateGuardQuery);
	
			mysql_query.postDataExecuteQuery(postUpdateGuardQuery,callback,"Guard not updated");
		});
	}
}


function handle_Add_Update_Alert_Request(msg,callback){
	console.log("Inside Server add update Alert function-----");
	
	var alertid = msg.alert_id;
	var alerttype = msg.alert_type;
	var querytype = msg.querytype;
	console.log("sdfs:"+querytype);
	if(querytype === 0)
	{
		var postAddAlertQuery = "call proc_AddAlert('"+alerttype+"');";
		console.log("Query:"+postAddAlertQuery);
		mysql_query.postDataExecuteQuery(postAddAlertQuery,callback,"Alerttype not added");
	}else if(querytype === 1)
	{
		var postUpdateAlertQuery = "call proc_UpdateAlert("+alertid+",'"+alerttype+"');";
		console.log("Query:"+postUpdateAlertQuery);
		mysql_query.postDataExecuteQuery(postUpdateAlertQuery,callback,"Alerttype not updated");
		
	}
}

function handleDeleteGuardRequest (msg, callback) {
	
	var guard_ssn = msg.guard_ssn;
	
	var deleteGuardQuery =  "call proc_deleteGuard("+guard_ssn+");";
	console.log("delete client query :"+deleteGuardQuery);	
	
	mysql_query.postDataExecuteQuery(deleteGuardQuery,callback,"guard not deleted");
}

function handle_Delete_AlertType_Request(msg, callback){
	
	var alert_id = msg.alert_type_id;
	
	var deleteAlertTypeQuery = "call proc_deleteAlertType("+alert_id+");";
	console.log("delete alerttype query :"+deleteAlertTypeQuery);
	
	mysql_query.postDataExecuteQuery(deleteAlertTypeQuery,callback,"guard not deleted");
}

function handle_assign_guard_to_building(msg,callback){
	console.log("Inside handle_assign_guard_to_building");
	var res={};
	var object = msg.shiftguards;
	for(var i=0;i<object.length;i++){
	//temp.forEach(function(object){
		//console.log(object[i].guard_ssn);
		var assignGuardQuery = "call proc_assignGuardToBuilding("+object[i].guard_ssn+","+object[i].building_id+","+object[i].shift_id+",'"+object[i].shift_from_date+"','"+object[i].shift_to_date+"');";
		console.log(assignGuardQuery);
		mysql.fetchData(function(err,results){
			if(err)
				throw err;
			else{
					if(i == object.length)
					{
						res.code = "200";
						res.value = "Success";
						res.error = "none";
						res.status = true;
						//res.resultsData = results[0];	
						callback(null, res);		
					}
				}
			},assignGuardQuery);
	}
	
	//var guardssn = msg.shiftguards.guard_ssn;
	/*var buildingid = msg.shiftguards.building_id;
	var shiftid = msg.shiftguards.shift_id;
	var shiftFromDate = msg.shiftguards.shift_from_date;
	var shiftToDate = msg.shiftguards.shift_to_date;
	*/
	//var assignGuardQuery = "proc assignGuardToBuilding("+guardssn+","+buildingid+","+shiftid+",'"+shiftFromDate+"','"+shiftToDate+"');";
	
	//mysql_query.postDataExecuteQuery(assignGuardQuery,callback,"Guard not assigned");
}


function handle_get_Guard_Last_Location (msg,callback){
	console.log("Inside handle_Guard_Last_Location");
	
	var getGuardLocationQuery = "call proc_getGuardAndLastCheckpoint("+msg.guardssn+");";
	console.log("get Guard Location query :"+getGuardLocationQuery);
	
	mysql_query.getDataExecuteQuery(getGuardLocationQuery,callback,"guard location not available");
}

exports.handle_get_Guard_Last_Location = handle_get_Guard_Last_Location;
exports.handle_assign_guard_to_building = handle_assign_guard_to_building;
exports.handle_get_building_list = handle_get_building_list;
exports.handle_get_timeline = handle_get_timeline;
exports.handle_get_alerttype = handle_get_alerttype;
exports.handle_add_alert = handle_add_alert;
exports.handle_get_guard_schedule = handle_get_guard_schedule;
exports.handle_Get_All_Guard_Details = handle_Get_All_Guard_Details;
exports.handle_Get_All_Checkpoints = handle_Get_All_Checkpoints;
exports.handle_Add_Update_Alert_Request = handle_Add_Update_Alert_Request;
exports.handle_Add_Update_Guard_Request = postAddUpdateGuardRequest;
exports.handle_Delete_Guard_Request = handleDeleteGuardRequest;
exports.handle_Delete_AlertType_Request = handle_Delete_AlertType_Request;
