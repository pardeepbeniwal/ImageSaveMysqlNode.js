"use strict";
var mysql = require('mysql');

var appDataBase = function () {	
	this.pool  = mysql.createPool({
		host     : 'localhost',
		user     : 'root',
		password : 'pardeep',
		database : 'test'
		
	});
	console.log("Connected to Mysql...");			
	return this;			
}

appDataBase.prototype.getConn = function (query, callBack) {
	console.log('ss');
	this.pool.getConnection(function(err, connection) {
		// Use the connection 		
		connection.query( query, function(err, rows) {
			// And done with the connection. 
			connection.release();
			return callBack(err , rows);
			// Don't use the connection here, it has been returned to the pool. 
		});
	});
}//getConn
var appDB = new appDataBase(); 
module.exports = appDB;

