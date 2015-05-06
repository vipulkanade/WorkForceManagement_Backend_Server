var ejs = require("ejs");
var mysql = require("../controllers/mysql");
var mysql_query = require("../utility/utility");


// Building Details
function handle_Get_Building_Details_Request (msg, callback){
	var getBuilding = "CALL proc_getBuildingReport(" + msg.ssn +");"; // SQL Query
	console.log("Query Get Building Log : " + getBuilding.toString());
	mysql_query.getDataExecuteQuery(getBuilding,callback,"No Building report data available");
}


function handle_Get_Alert_Details_Request(msg, callback){
	var getAlert = "CALL proc_getAlertReport(" + msg.ssn +");"; // SQL Query
	console.log("Query Get Alert Log : " + getAlert.toString());
	mysql_query.getDataExecuteQuery(getAlert,callback,"No Alert report data available");
}

// Bill Dues display on dashboard
function handle_Get_Dues_Request (msg, callback){
	var getDues = "call proc_getBillDetails(" + msg.ssn +");"; // SQL Query
	console.log("Query Get Alert Log : " + getDues.toString());
	mysql_query.getDataExecuteQuery(getDues,callback,"No dues data available");
}

//Daily Reports
function handle_Get_Daily_Reports_Request (msg, callback){	
	var getDailyReports = "CALL proc_getDailyReport(" + msg.ssn +");"; // SQL Query
	console.log("Query Get Alert Log : " + getDailyReports.toString());
	mysql_query.getDataExecuteQuery(getDailyReports,callback,"No daily report data available");
}

function handle_Get_Alerts_Dashboard_Request (msg, callback){
	var getAlertDashboardReports = "call proc_get_Alert_Dashboard(" + msg.ssn +");"; // SQL Query
	console.log("Query Get Alert Log : " + getAlertDashboardReports.toString());
	
	mysql_query.getDataExecuteQuery(getAlertDashboardReports,callback,"No alert dashboard data available");
}

function handle_Get_Bills (msg, callback){

	var getDailyReports = "CALL proc_get_Billing_Report(" + msg.ssn +");"; // SQL Query
	console.log("Query Get Alert Log : " + getDailyReports.toString());
	
	mysql_query.getDataExecuteQuery(getDailyReports,callback,"No billing report data available");

}

function handle_Get_Donu_Data (msg, callback){

    var getDailyReports = "CALL proc_getDonutGraphData(" + msg.ssn +");"; // SQL Query
    console.log("Query Get Alert Log : " + getDailyReports.toString());
    
    mysql_query.getDataExecuteQuery(getDailyReports,callback,"No donut data available");

}

function handle_Get_Bar_Graph_Data (msg, callback){

    var getDailyReports = "call proc_GetMonthlyAlertGraph(" + msg.ssn +");"; // SQL Query
    console.log("Query Get Alert Log : " + getDailyReports.toString());
    
    mysql_query.getDataExecuteQuery(getDailyReports,callback,"No bar graph data available");

}  

function handle_Get_Total_Alert_Count_Per_Client_Data (msg, callback){

    var getAlertCountPerClient = "call proc_GetTotalAlertForClient(" + msg.ssn +");"; // SQL Query
    console.log("Query Get Alert Log : " + getAlertCountPerClient.toString());
    
    mysql_query.getDataExecuteQuery(getAlertCountPerClient,callback,"No alert count data available");

}

function handle_Get_Total_Building_Count_Per_Client_Data (msg, callback){

    var getBuildingCountPerClient = "call proc_GetTotalBuildingForClient(" + msg.ssn +");"; // SQL Query
    console.log("Query Get Alert Log : " + getBuildingCountPerClient.toString());
    
    mysql_query.getDataExecuteQuery(getBuildingCountPerClient,callback,"No building count data available");

}


function handle_Get_Patrol_Schedule_For_Report_Selected(msg, callback){
	
	var getPatrolSchedule = "call proc_getGuardTimeReport("+msg.buildingID+",'"+msg.reportDate+"');";
	console.log(getPatrolSchedule);	
	mysql_query.getDataExecuteQuery(getPatrolSchedule,callback,"No partol Schedule date available");
}

function handle_Get_Patroling_Report_Data_For_SelectedReport(msg, callback){
	
	var getPatrolReportDataQuery = "call proc_getPatrolingReportData('"+msg.reportDate+"',"+msg.buildingID+","+msg.clientSSN+");";
	console.log(getPatrolReportDataQuery);	
	mysql_query.getDataExecuteQuery(getPatrolReportDataQuery,callback,"No Patroling Report data available");
	
}

function handle_get_Patrol_Data_Guard_Comments (msg, callback){
	
	var getpatrolCommentsQuery = "call proc_getPatrolDataForBuilding("+msg.buildingID+",'"+msg.reportDate+"');";
	mysql_query.getDataExecuteQuery(getpatrolCommentsQuery,callback,"get Patrol data comments available");
}

function handle_get_checkpoints (msg, callback){
	
	var getCheckpointsQuery = "call proc_getCheckpoints("+msg.ssn+");";
	mysql_query.getDataExecuteQuery(getCheckpointsQuery,callback,"get Patrol data comments available");
}

exports.handle_get_checkpoints = handle_get_checkpoints;
exports.handle_get_Patrol_Data_Guard_Comments = handle_get_Patrol_Data_Guard_Comments;
exports.handle_Get_Patroling_Report_Data_For_SelectedReport = handle_Get_Patroling_Report_Data_For_SelectedReport;
exports.handle_Get_Patrol_Schedule_For_Report_Selected = handle_Get_Patrol_Schedule_For_Report_Selected;
exports.handle_Get_Total_Building_Count_Per_Client_Data = handle_Get_Total_Building_Count_Per_Client_Data;
exports.handle_Get_Total_Alert_Count_Per_Client_Data = handle_Get_Total_Alert_Count_Per_Client_Data;
exports.handle_Get_Bar_Graph_Data  = handle_Get_Bar_Graph_Data ;
exports.handle_Get_Donu_Data = handle_Get_Donu_Data;
exports.handle_Get_Bills = handle_Get_Bills;
exports.handle_Get_Alert_Details_Request = handle_Get_Alert_Details_Request;
exports.handle_Get_Daily_Reorts_Request = handle_Get_Daily_Reports_Request;
exports.handle_Get_Building_Details_Request = handle_Get_Building_Details_Request;
exports.handle_Get_Dues_Request = handle_Get_Dues_Request;
exports.handle_Get_Alerts_Dashboard_Request = handle_Get_Alerts_Dashboard_Request;