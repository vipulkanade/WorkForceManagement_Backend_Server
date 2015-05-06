var amqp = require('amqp'), util = require('util');
var mysql = require("../controllers/mysql");

var cnn = amqp.createConnection({
	host : '127.0.0.1'
});

function publish_Reply(m, res) {
		cnn.publish(m.replyTo, res, {
		contentType : 'application/json',
		contentEncoding : 'utf-8',
		correlationId : m.correlationId
		});
}

function getDataExecuteQuery(query,callback,noDataMsg){
	var res = {};
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
			 
		} else {
			if (results[0].length > 0 ){				
				res.resultsData = results[0];
				res.code = "200";
				res.value = "Success";
				res.error = "none";
				res.status = true; 
				callback(null,res);	
			}
			else
			{
				res.code="401";
				res.value = "Fail";
				res.Message=noDataMsg;
				callback(null,res);
			}
		}
	}, query);
}

function postDataExecuteQuery(query,callback,message){
	var res={};
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
			// Values for error or Success
			res.code = "200";
			res.value = "Success";
			res.error = "none";
			res.status = true;
			res.resultsData = results[0];	
			callback(null, res);		
		}
	}, query);
}

exports.postDataExecuteQuery = postDataExecuteQuery;
exports.getDataExecuteQuery = getDataExecuteQuery;
exports.publish_Reply = publish_Reply;