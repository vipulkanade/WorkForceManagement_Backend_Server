var ejs= require('ejs');
var mysql = require('mysql');
var pool = [];
var waitingArrayQueue = [];
var arrayItems = {
		'callback' : '',
		'sqlQuery' : '',
		'time'     : 0
};

function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'team2.cywpykpi3tp9.us-west-1.rds.amazonaws.com',
	    user     : 'team2',
	    password : 'wmsteam2',
	    database : 'workforce_management' // Please Insert DB Name here
	});
	return connection;
}

function createConnectionsInPool(numberOfConnections){
	for(var i = 0; i < numberOfConnections; i++){
		pool.push(getConnection());
	}
}

var PoolOfConnection = new createConnectionsInPool(500);

createConnectionsInPool.prototype.getConnectionFromPool = function(){
	if(pool.length === 0){
		return false;
	} else {
		return true;
	}
};

function checkQueue() {
	if (waitingArrayQueue.length > 0) {
		var item = waitingArrayQueue.shift();
		console.log("Waiting Queue Length After Shifting ===> "+waitingArrayQueue.length);
		fetchData(item.callback, item.sqlQuery);
	}
}

function fetchData(callback,sqlQuery){
	var connecionStatus;
		connecionStatus = PoolOfConnection.getConnectionFromPool();
		if (connecionStatus === false) {
			if (waitingArrayQueue.length < 20) {
				arrayItems.callback = callback;
				arrayItems.sqlQuery = sqlQuery;
				arrayItems.time = new Date().getTime();
				waitingArrayQueue.push(arrayItems);
			} else {
				console.log("Everything Full");
				callback("err", "503");
			}
		} else {
				var connection = pool.pop();
				console.log("After popped :: "+pool.length);
				connection.query(sqlQuery, function(err, rows, fields) {
					if(err){
						console.log("ERROR: " + err.message);
					}
					else {	// return err or result
						console.log("DB Results:"+ JSON.stringify(rows));
						pool.push(connection);
						console.log("After push :: "+pool.length);
						callback(err, rows);
						checkQueue();
					}
			});
		}	
}	

exports.fetchData = fetchData;