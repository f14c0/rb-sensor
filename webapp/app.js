var express 		= require('express')
var app 			= express()
var record		  	= require('./models/record.js')
var record_model	= new record()
var routes 			= require('./routes/devices.js')
var io      		= require('./lib/sockets.js').listen(app)
var fs 				= require('fs');