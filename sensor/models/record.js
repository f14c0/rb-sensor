//Model
//File: models/devices.js

var mongoose = require('mongoose');
var Schema	= mongoose.Schema;

var record_schema = new Schema({
	mac : 			{type: 	String},
	device_class: 	{type: 	String},
	timestamp: 		{type: 	Date},
	sensor_id: 		{type: 	String},
	rssi:     		{type: 	Number}	
});

module.exports = mongoose.model('Record',record_schema);


