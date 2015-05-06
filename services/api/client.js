var ejs = require("ejs");
var mysql = require("../controllers/mysql");
var mysql_query = require("../utility/utility");
var crypto = require('crypto');

function getAllClientDetailsRequest(msg, callback){
	console.log("reached clientrequest");
	var getClient = "call proc_get_All_Clients();"; // SQL Query
	console.log("Query Get Client Log : " + getClient.toString());
	
	mysql_query.getDataExecuteQuery(getClient,callback,"No Client available");

}

function postAddUpdateClientRequest(msg, callback){	
	console.log("Inside Server add update Client function");
	var res = {};
	
	var client_ssn = msg.client_ssn;
	var service_amount = msg.service_amount;
	var amount_paid = msg.amount_paid;
	var amount_due = msg.amount_due;
	var contract_start_date = msg.contract_start_date;
	var contract_end_date = msg.contract_end_date;
	var email_id = msg.email_id;
	var password = msg.password;
	var first_name = msg.first_name;
	var last_name = msg.last_name;
	var address = msg.address;
	var city = msg.city;
	var state = msg.state;
	var zipcode = msg.zipcode;
	var phone_number = msg.phone_number;
	
	var buildingName = msg.building_Name;
	var buildingAddress = msg.building_Address;
	var buildingZipcode= msg.building_Zipcode;
	var buildingReleaseDate= msg.building_Releasedate;
	var serviceFee= msg.service_Fee;
	
	var latitude= msg.latitude;
	var longitude= msg.longitude;
	var checkpoint_name= msg.checkpoint_name;
	
	var querytype = msg.query;
	console.log("query type:"+querytype);
	if(querytype == 0)
	{
		var checkExistUserQuery = "call proc_checkPersonExists("+client_ssn+");";
		console.log("query:"+checkExistUserQuery);
		mysql.fetchData(function(err,results){
			if(err) {
				throw err;
			} else {
						if(results[0].affectedRows > 0)
						{
						
							res.code = "200";
							res.value = "Client Already Exists";
							res.error = "none";
							res.status = true;
							callback(null, res);
						}	
						else
						{
							
							var salt = crypto.randomBytes(64).toString('hex');
							crypto.pbkdf2(password, salt, 10000, 64, function(err, derivedKey) {
							
								var addClientQuery =  "call proc_addClient("+client_ssn+",'"+contract_start_date+"','"+contract_end_date+"','"+email_id+"','"+first_name+"','"+last_name+"','"
								+address+"','"+city+"','"+state+"','"+zipcode+"','"+phone_number+"','"+derivedKey+"','"+salt+"');";
								console.log("add alert query :"+addClientQuery);
								mysql.fetchData(function(err,results){
									if(err) {
										throw err;
									} else {
										// Values for error or Success
										
										var addBuildingQuery = "call proc_addBuildingDetails('"+buildingName+"','"+buildingAddress+"','"+buildingZipcode+"','"+
										buildingReleaseDate+"',"+serviceFee+","+client_ssn+");";
										console.log("add building query :"+addBuildingQuery);
										
										mysql.fetchData(function(err,results){
											if(err) {
												throw err;
											} else {
												var getBuildingId = "select building_id from building_table where building_name = '"+buildingName+"' and person_ssn="+client_ssn+";"
												
												
												mysql.fetchData(function(err,results){
													if(err){
														throw err;
													}else{
														if (results.length > 0){
															var building_id = results[0].building_id;
															
															var addCheckpointQuery = "call proc_AddCheckpoint("+building_id+",'"+latitude+"','"+longitude+"','"+checkpoint_name+"');";
															mysql_query.postDataExecuteQuery(addCheckpointQuery,callback,"checkpoint not added");
														}
														else
														{
															res.code="401";
															res.value="no checkpoint";
															callback(null,res);
														}	
													}	
												},getBuildingId);
											}
										}, addBuildingQuery);
									}
								}, addClientQuery);
							});
							
					}
			}
		}, checkExistUserQuery);	
	}
	else if(querytype == 1)
	{
		
		console.log("client password update");
		var salt = crypto.randomBytes(64).toString('hex');
		crypto.pbkdf2(password, salt, 10000, 64, function(err, derivedKey) {
	
			var UpdateClientQuery =  "call proc_UpdateClient("+client_ssn+","+service_amount+","+ amount_paid +","+
			amount_due+",'"+contract_start_date+"','"+contract_end_date+"','"+email_id+"','"+first_name+"','"+last_name+"','"
			+address+"','"+city+"','"+state+"','"+zipcode+"','"+phone_number+"','"+derivedKey+"','"+salt+"');";
			console.log("update client query :"+UpdateClientQuery);	
			
			mysql_query.postDataExecuteQuery(UpdateClientQuery,callback,"client not updated");
		});
	}
	
}

function handleDeleteClientRequest (msg, callback) {
	
	var client_ssn = msg.client_ssn;
	
	var deleteClientQuery =  "call proc_deleteClient("+client_ssn+");";
	console.log("delete client query :"+deleteClientQuery);	
	
	mysql_query.postDataExecuteQuery(deleteClientQuery,callback,"client not deleted");
}

function handleGetTotalNumberOfClientRequest (msg, callback) {
	var getTotalNumberOfClientsQuery = "call proc_GetTotalClientsForAdmin();"; // SQL Query
	console.log("Query Get Client Log : " + getTotalNumberOfClientsQuery.toString());
	
	mysql_query.getDataExecuteQuery(getTotalNumberOfClientsQuery,callback,"No Client data available");
}

function handleGetTotalNumberOfAlertsRequest (msg, callback) {
	var getTotalNumberOfAlertsQuery = "call proc_GetTotalAlertForAdmin();"; // SQL Query
	console.log("Query Get Total Number Alerts Log : " + getTotalNumberOfAlertsQuery.toString());
	
	mysql_query.getDataExecuteQuery(getTotalNumberOfAlertsQuery,callback,"No Alert data available");
}

function handleGetTotalNumberOfPendingClientsRequest (msg, callback) {
	var getTotalNumberOfPendingClientsQuery = "call proc_GetTotalPendingClients();"; // SQL Query
	console.log("Query Get Total Number Alerts Log : " + getTotalNumberOfPendingClientsQuery.toString());
	
	mysql_query.getDataExecuteQuery(getTotalNumberOfPendingClientsQuery,callback,"No Pending Client data available");
}

function handleGetTotalNumberOfClientRequest (msg, callback) {
	var handleGetTotalNumberOfClientRequestQuery = "call proc_GetTotalClientsForAdmin();"; // SQL Query
	console.log("Query Get Total Number of clients Log : " + handleGetTotalNumberOfClientRequestQuery.toString());
	
	mysql_query.getDataExecuteQuery(handleGetTotalNumberOfClientRequestQuery,callback,"No Pending Client data available");
}

exports.handle_Get_Total_Number_Of_Client_Request=handleGetTotalNumberOfClientRequest;
exports.handle_Get_All_Client_Details_Request = getAllClientDetailsRequest;
exports.handle_Add_Update_Client_Request = postAddUpdateClientRequest;
exports.handle_Delete_Client_Request = handleDeleteClientRequest;
exports.handle_Get_Total_Number_Of_Alerts_Request = handleGetTotalNumberOfAlertsRequest;
exports.handle_Get_Total_Number_Of_Pending_Clients_Request = handleGetTotalNumberOfPendingClientsRequest;
