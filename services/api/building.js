var ejs = require("ejs");
var mysql = require("../controllers/mysql");
var mysql_query = require("../utility/utility");
var util = require('util');

function getAllBuildingDetailsRequest(msg, callback){	

	var getAllBuildingDetailsQuery = "call proc_get_All_Building();"; // SQL Query
	console.log("Query Get Client Log : " + getAllBuildingDetailsQuery.toString());
	
	mysql_query.getDataExecuteQuery(getAllBuildingDetailsQuery,callback,"No building data available");
}

function handle_Add_Update_Buidling_Request(msg,callback){	
	var buildingId = msg.buildingID;
	var buildingName = msg.buildingName;
	var buildingAddress = msg.buildingAddress;
	var buildingZipcode= msg.buildingZipcode;
	var buildingReleaseDate= msg.buildingReleaseDate;
	var serviceFee= msg.serviceFee;
	var clientSSN = msg.personSSN;
	var querytype = msg.querytype;
	console.log("querytupe:"+querytype);
	if(querytype == 0)
	{
		var addBuildingQuery = "call proc_addBuildingDetails('"+buildingName+"','"+buildingAddress+"','"+buildingZipcode+"','"+
		buildingReleaseDate+"',"+serviceFee+","+clientSSN+");";
		console.log("add building query :"+addBuildingQuery);
		
		mysql_query.postDataExecuteQuery(addBuildingQuery,callback,"Building not added");
	}else if(querytype == 1)
	{
		var postUpdateBuildingQuery = "call proc_updateBuilding("+buildingId+",'"+buildingName+"','"+buildingAddress+"','"+buildingZipcode+"','"+
		buildingReleaseDate+"',"+serviceFee+","+clientSSN+");";
		console.log("Update building:"+postUpdateBuildingQuery);
		mysql_query.postDataExecuteQuery(postUpdateBuildingQuery,callback,"Building not updated");
	}
}

function handle_Add_Update_Checkpoint_Request(msg,callback){
	var building_id= msg.building_id;
	var latitude= msg.latitude;
	var longitude= msg.longitude;
	var checkpoint_name= msg.checkpoint_name;
	var querytype = msg.querytype;
	
	
	if(querytype === 0)
	{
		var postAddCheckpointQuery = "call proc_AddCheckpoint("+building_id+",'"+latitude+"','"+longitude+"','"+checkpoint_name+"');";
		console.log(postAddCheckpointQuery);
		mysql_query.postDataExecuteQuery(postAddCheckpointQuery,callback,"checkpoint not added");
	}else if(querytype === 1)
	{
		var postUpdateCheckpointQuery = "call proc_UpdateCheckpoint("+checkpoint_id+","+building_id+",'"+latitude+"','"+longitude+"','"+checkpoint_name+"');";
		console.log(postUpdateCheckpointQuery);
		mysql_query.postDataExecuteQuery(postAddCheckpointQuery,callback,"checkpoint not added");			
	}
}

function handleDeleteBuildingRequest (msg, callback) {
	
	var building_id = msg.building_id;
	
	var deleteBuildingQuery =  "call proc_deleteBuilding("+building_id+");";
	console.log("delete building query :"+deleteBuildingQuery);	
	
	mysql_query.postDataExecuteQuery(deleteBuildingQuery,callback,"guard not deleted");
}

function handleDeleteCheckPointRequest (msg, callback) {
	
	var checkpoint_id = msg.checkpoint_id;
	
	var deleteCheckpointQuery =  "call proc_deleteCheckPoint("+checkpoint_id+");";
	console.log("delete Checkpoint query :"+deleteCheckpointQuery);	
	
	mysql_query.postDataExecuteQuery(deleteCheckpointQuery,callback,"checkpoint not deleted");
}

function getTotalNumberOfBuildings (msg, callback) {
	var getTotalNumberOfBuildingsQuery = "call proc_get_Total_Number_Of_Buildings();"; // SQL Query
	console.log("Query Get Client Log : " + getTotalNumberOfBuildingsQuery.toString());
	
	mysql_query.getDataExecuteQuery(getTotalNumberOfBuildingsQuery,callback,"No building data available");
}

function getTotalNumberOfBuildingsForClient (msg, callback) {
	var client_ssn = msg.client_ssn;
	var getTotalNumberOfBuildingsForClientQuery = "call proc_GetTotalBuildingForClient("+client_ssn+");"; // SQL Query
	console.log("Query Get Client Log : " + getTotalNumberOfBuildingsForClientQuery.toString());
	
	mysql_query.getDataExecuteQuery(getTotalNumberOfBuildingsForClientQuery,callback,"No building data available");
}

function handleGetTotalRevenueOfBuildings (msg, callback) {
	var getTotalRevenueOfBuildingsQuery = "call proc_GetTotalRevenueForAdmin();"; // SQL Query
	console.log("Query Get Client Log : " + getTotalRevenueOfBuildingsQuery.toString());
	
	mysql_query.getDataExecuteQuery(getTotalRevenueOfBuildingsQuery,callback,"No Revenue data available");
}

function handle_verify_client_before_add_building (msg,callback){
	
	var checkClientQuery = "call proc_checkPersonExists("+msg.client_ssn+");";
	
	console.log("query:"+checkClientQuery);
	
	mysql_query.getDataExecuteQuery(checkClientQuery,callback,"client not found");
}

function handle_Get_Building_Guards(msg,callback){
	
	var getBuildingGuardsQuery = "call proc_getBuildingGuards("+msg.building_id+");";
	
	console.log("query:"+getBuildingGuardsQuery);
	
	mysql_query.getDataExecuteQuery(getBuildingGuardsQuery,callback,"No Guards present");
}

/*function handle_request(message,point){
	switch (message.type) {
		case "verifyclient":
			handle_verify_client_before_add_building(message,
					function(err, res) {
				util.log("Handle handle_verify_client_before_add_building request: "
						+ JSON.stringify(res));
				mysql_query.publish_Reply(point, res);
			});
			break;
	}
}*/

//exports.handle_request = handle_request;
exports.handle_Get_Building_Guards = handle_Get_Building_Guards;
exports.handle_verify_client_before_add_building = handle_verify_client_before_add_building;
exports.handle_Add_Update_Checkpoint_Request = handle_Add_Update_Checkpoint_Request;
exports.handle_Add_Update_Buidling_Request = handle_Add_Update_Buidling_Request;
exports.handle_Get_All_Building_Details_Request = getAllBuildingDetailsRequest;
exports.handle_Delete_Building_Request = handleDeleteBuildingRequest;
exports.handle_Total_Number_Of_Buildings = getTotalNumberOfBuildings;
exports.handle_Get_Total_Number_Of_Buildings_For_Client = getTotalNumberOfBuildingsForClient;
exports.handle_Get_Total_Revenue_Of_Buildings = handleGetTotalRevenueOfBuildings;
exports.handle_Delete_Check_Point_Request = handleDeleteCheckPointRequest;