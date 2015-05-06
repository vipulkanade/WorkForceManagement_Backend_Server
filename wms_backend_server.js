var amqp = require('amqp'), util = require('util');

var login = require('./services/api/login');
var admin = require('./services/api/admin');
var client = require('./services/api/client');
var guard = require('./services/api/guard');
var logout = require('./services/api/logout');
var reports = require('./services/api/reports');
var personInfo = require('./services/api/personInfo');
var building = require('./services/api/building');
var utility = require('./services/utility/utility');

var cnn = amqp.createConnection({
	host : '127.0.0.1'
});

cnn.on('ready', function() {
	console.log("Server is Listening");

	cnn.queue('login_queue', function(q) { // For any new queue use this code
		// with appropriate values
		console.log("login_queue function");
		q.subscribe(function(message, headers, deliveryInfo, m) {
			console.log("login_queue inside function");

			// Logs if necessary
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

			// If Using One queue for particular set of operation, using
			// message.type to differentiate request
			switch (message.type) {
			case "login":
				login.handle_login_request(message, function(err, res) {
					utility.publish_Reply(m, res);
				});
				break;

			case "logout":
				logout.handle_logout_request(message, function(err, res) {
					utility.publish_Reply(m, res);
				});
				break;
			}
		});
	});

	cnn.queue('topic_details_queue', function(q) { // For any new queue use
		// this code with
		// appropriate values
		console.log("topic_details_queue function");
		q.subscribe(function(message, headers, deliveryInfo, m) {
			console.log("topic_details_queue inside function");

			// Logs if necessary
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

			// If Using One queue for particular set of operation, using
			// message.type to differentiate request
			switch (message.type) {
			case "admin_requests":
				admin.handle_get_admin_request(message, function(err, res) {
					util.log("Handle admin_requests request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
			}
		});
	});

	cnn.queue('client_request_queue', function(q) { // For any new queue use
		// this code with
		// appropriate values
		console.log("client_request_queue function");
		q.subscribe(function(message, headers, deliveryInfo, m) {
			console.log("client_request_queue inside function");

			// Logs if necessary
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

			// If Using One queue for particular set of operation, using
			// message.type to differentiate request
			switch (message.type) {
			case "get_All_Client_Details":
				client.handle_Get_All_Client_Details_Request(message, function(
						err, res) {
					util.log("Handle client_requests request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
			case "setclient":
				client.handle_Add_Update_Client_Request(message, function(
						err, res) {
					util.log("Handle Add Udpate Client request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
			
			case "delete_client":
				client.handle_Delete_Client_Request(message, function(
						err, res) {
					util.log("Handle Delete Client request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
				
			case "total_number_of_clients":
				client.handle_Get_Total_Number_Of_Client_Request(message, function(
						err, res) {
					util.log("Handle Total Number of Client request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
				
			case "total_number_of_alerts":
				client.handle_Get_Total_Number_Of_Alerts_Request(message, function(
						err, res) {
					util.log("Handle Total Number of Alerts request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
				
			case "total_number_of_pending_clients":
				client.handle_Get_Total_Number_Of_Pending_Clients_Request(message, function(
						err, res) {
					util.log("Handle Total Number of Pending Clients request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
			}
		});
	});

	cnn.queue('person_info_queue', function(q) { // For any new queue use
		// this code with
		// appropriate values
		console.log("person_info_queue function");
		q.subscribe(function(message, headers, deliveryInfo, m) {
			console.log("client_request_queue inside function");

			// Logs if necessary
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

			// If Using One queue for particular set of operation, using
			// message.type to differentiate request
			switch (message.type) {
			case "get_Person_Name_Type_Details":
				personInfo.handle_Get_Person_Name_Type_Details_Request(message,
						function(err, res) {
							util.log("Handle client_requests request: "
									+ JSON.stringify(res));
							utility.publish_Reply(m, res);
						});
				break;
			}
		});
	});
	
	cnn.queue('building_queue', function(q) { // For any new queue use
		// this code with
		// appropriate values
		console.log("building_queue function");
		q.subscribe(function(message, headers, deliveryInfo, m) {
			console.log("building_queue inside function");

			// Logs if necessary
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

			// If Using One queue for particular set of operation, using
			// message.type to differentiate request
			
			//building.handle_request(message,m);
			
			switch (message.type) {
			case "all_building_details":
				building.handle_Get_All_Building_Details_Request(message,
						function(err, res) {
							util.log("Handle all_building_details request: "
									+ JSON.stringify(res));
							utility.publish_Reply(m, res);
						});
				break;
			
			case "setbuilding":
				building.handle_Add_Update_Buidling_Request(message, function(
						err, res) {
					util.log("Handle Add Udpate Building request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
				
			case "setcheckpoint":
				building.handle_Add_Update_Checkpoint_Request(message, function(
						err, res) {
					util.log("Handle Add Udpate checkpoint request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
			
			case "delete_building":
				building.handle_Delete_Building_Request(message, function(
						err, res) {
					util.log("Handle delete Building request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
				
			case "total_number_of_buildings":
				building.handle_Total_Number_Of_Buildings(message,
						function(err, res) {
							util.log("Handle Total_Number_Of_Buildings request: "
									+ JSON.stringify(res));
							utility.publish_Reply(m, res);
						});
				break;
				
			case "total_number_of_buildings_for_client":
				building.handle_Get_Total_Number_Of_Buildings_For_Client(message,
						function(err, res) {
							util.log("Handle Get_Total_Number_Of_Buildings_For_Client request: "
									+ JSON.stringify(res));
							utility.publish_Reply(m, res);
						});
				break;
				
			case "total_revenue_of_all_buildings":
				building.handle_Get_Total_Revenue_Of_Buildings(message,
						function(err, res) {
							util.log("Handle handle_Get_Total_Revenue_Of_Buildings request: "
									+ JSON.stringify(res));
							utility.publish_Reply(m, res);
						});
				break;
				
			case "delete_checkpoint":
				building.handle_Delete_Check_Point_Request(message,
						function(err, res) {
					util.log("Handle handle_Delete_Check_Point_Request request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
				
			case "verifyclient":
				building.handle_verify_client_before_add_building(message,
						function(err, res) {
					util.log("Handle handle_verify_client_before_add_building request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
				
			case "getGuards":
				building.handle_Get_Building_Guards(message,
						function(err, res) {
					util.log("Handle handle_Get_Building_Guards request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
			}
		});
	});

	cnn.queue('guard_queue', function(q) { // For any new queue use this code
		// with appropriate values
		console.log("guard_details_queue function");
		q.subscribe(function(message, headers, deliveryInfo, m) {
			console.log("guard_details_queue inside function");

			// Logs if necessary
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

			// If Using One queue for particular set of operation, using
			// message.type to differentiate request
			switch (message.type) {
			case "addalert":
				guard.handle_add_alert(message, function(err, res) {
					util.log("Handle guard_requests: " + JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;

			case "getalerttype":
				guard.handle_get_alerttype(message, function(err, res) {
					util.log("Handle guard_requests : " + JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;

			case "gettimeline":
				guard.handle_get_timeline(message, function(err, res) {
					util.log("Handle handle_get_timeline : "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;

			case "getBuildingList":
				guard.handle_get_building_list(message,
						function(err, res) {
							util.log("Handle getBuildingList : "
									+ JSON.stringify(res));
							utility.publish_Reply(m, res);
						});
				break;

			case "getschedule":
				guard.handle_get_guard_schedule(message,
						function(err, res) {
							util.log("Handle getScheduleList : "
									+ JSON.stringify(res));
							utility.publish_Reply(m, res);
						});
				break;

			case "getallguards":
				guard.handle_Get_All_Guard_Details(message,
						function(err, res) {
							util.log("Handle getScheduleList : "
									+ JSON.stringify(res));
							utility.publish_Reply(m, res);
						});
				break;
				
			case "getallcheckpoints":
				guard.handle_Get_All_Checkpoints(message,
						function(err, res) {
							util.log("Handle getScheduleList : "
									+ JSON.stringify(res));
							utility.publish_Reply(m, res);
						});
				break;
				
			case "setguard":
				guard.handle_Add_Update_Guard_Request(message, function(
						err, res) {
					util.log("Handle Add Udpate Guard request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
				
			case "setalert":
				guard.handle_Add_Update_Alert_Request(message, function(
						err, res) {
					util.log("Handle Add Udpate Alert request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
				
			case "delete_guard":
				guard.handle_Delete_Guard_Request(message, function(
						err, res) {
					util.log("Handle delete Guard request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
				
			case "delete_alert":
				guard.handle_Delete_AlertType_Request(message, function(
						err, res) {
					util.log("Handle delete AlertType request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
				
			case "assignguard":
				guard.handle_assign_guard_to_building(message, function(
						err, res) {
					util.log("Handle assign guard to building request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
				
			case "guardlocation":
				guard.handle_get_Guard_Last_Location(message, function(
						err, res) {
					util.log("Handle get guard last location request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
			}
		});
	});

	cnn.queue('reports_queue', function(q) { // For any new queue use this
		// code with appropriate values
		console.log("reports_queue function");
		q.subscribe(function(message, headers, deliveryInfo, m) {
			console.log("reports_queue inside function");

			// Logs if necessary
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

			// If Using One queue for particular set of operation, using
			// message.type to differentiate request
			switch (message.type) {
			case "get_Alert_Details":
				reports.handle_Get_Alert_Details_Request(message, function(err,
						res) {
					util.log("Handle Get Alert Details request: "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;

			case "get_Building_Details":
				reports.handle_Get_Building_Details_Request(message, function(
						err, res) {
					util.log("Handle building_requests : "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;

			case "get_Dues":
				reports.handle_Get_Dues_Request(message, function(err, res) {
					util.log("Handle due_report : " + JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;

			case "get_Daily_Reports":
				reports.handle_Get_Daily_Reorts_Request(message, function(err,
						res) {
					util.log("Handle daily_report : " + JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;

			case "get_Alert_Dashboard_request":
				reports.handle_Get_Alerts_Dashboard_Request(message, function(
						err, res) {
					util.log("Handle Get_Alerts_Dashboard_Request : "
							+ JSON.stringify(res));
					utility.publish_Reply(m, res);
				});
				break;
				
			case "get_Bills":
				reports.handle_Get_Bills(message, function(err, res) {
					util.log("Handle handle_Get_Bills : " + JSON.stringify(res));
					// return index sent
					cnn.publish(m.replyTo, res, {
						contentType : 'application/json',
						contentEncoding : 'utf-8',
						correlationId : m.correlationId
					});
				});
				break;
				
			case "get_Donut_Data":
                reports.handle_Get_Donu_Data(message, function(err, res) {
                        util.log("Handle handle_Get_Donu_Data : " + JSON.stringify(res));
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                                contentType : 'application/json',
                                contentEncoding : 'utf-8',
                                correlationId : m.correlationId
                        });
                });
                break;
                
			case "get_Bar_Graph_Data":
                reports.handle_Get_Bar_Graph_Data(message, function(err, res) {
                        util.log("Handle handle_Get_Bar_Graph_Data : " + JSON.stringify(res));
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                                contentType : 'application/json',
                                contentEncoding : 'utf-8',
                                correlationId : m.correlationId
                        });
                });
                break; 
			case "get_Total_Alert_Count_Per_Client":
                reports.handle_Get_Total_Alert_Count_Per_Client_Data(message, function(err, res) {
                        util.log("Handle handle_Get_Total_Alert_Count_Per_Client_Data : " + JSON.stringify(res));
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                                contentType : 'application/json',
                                contentEncoding : 'utf-8',
                                correlationId : m.correlationId
                        });
                });
                break;
                
			case "get_Total_Building_Count_Per_Client":
                reports.handle_Get_Total_Building_Count_Per_Client_Data(message, function(err, res) {
                        util.log("Handle handle_Get_Total_Building_Count_Per_Client_Data : " + JSON.stringify(res));
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                                contentType : 'application/json',
                                contentEncoding : 'utf-8',
                                correlationId : m.correlationId
                        });
                });
                break;
                
			case "patrolreport":
				reports.handle_Get_Patrol_Schedule_For_Report_Selected(message, function(err, res) {
                    util.log("Handle handle_Get_Patrol_Schedule_For_Report_Selected : " + JSON.stringify(res));
                    // return index sent
                    cnn.publish(m.replyTo, res, {
                            contentType : 'application/json',
                            contentEncoding : 'utf-8',
                            correlationId : m.correlationId
                    });
				});
				break;
			case "patrolreportdata":
				reports.handle_Get_Patroling_Report_Data_For_SelectedReport(message, function(err, res) {
                    util.log("Handle handle_Get_Patrol_Schedule_For_Report_Selected : " + JSON.stringify(res));
                    // return index sent
                    cnn.publish(m.replyTo, res, {
                            contentType : 'application/json',
                            contentEncoding : 'utf-8',
                            correlationId : m.correlationId
                    });
				});
				break;
				
			case "patrolcomments":
				reports.handle_get_Patrol_Data_Guard_Comments(message, function(err, res) {
                    util.log("Handle get_Patrol_Data_Guard_Comments : " + JSON.stringify(res));
                    // return index sent
                    cnn.publish(m.replyTo, res, {
                            contentType : 'application/json',
                            contentEncoding : 'utf-8',
                            correlationId : m.correlationId
                    });
				});
				break;
				
			case "checkpointsForClient":
				reports.handle_get_checkpoints(message, function(err, res) {
                    util.log("Handle handle_get_checkpoints_Comments : " + JSON.stringify(res));
                    // return index sent
                    cnn.publish(m.replyTo, res, {
                            contentType : 'application/json',
                            contentEncoding : 'utf-8',
                            correlationId : m.correlationId
                    });
				});
				break;
			}
		});
	});
});