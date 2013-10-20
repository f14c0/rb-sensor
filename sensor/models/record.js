//Model
//File: models/devices.js

var mongoose 	= require('mongoose')
var schema		= mongoose.Schema
var db_host		= 'mongodb://localhost/sensor'

var record_schema = new schema({
	mac : 			{type: 	String},
	device_class: 	{type: 	String},
	timestamp: 		{type: 	String},
	sensor_id: 		{type: 	String},
	rssi:     		{type: 	Number}	
})

record_model = mongoose.model('Record',record_schema)

var record = function(){

	this.connect=function(){
		/*Connecto to Mongodb*/
		mongoose.connect(db_host,function(err, res){
			if(!err){
				console.log('Connected to databasase, Successfuly!')
			}else{
				console.log('ERROR:' + err);
			}
		})
	}
	this.insertRecord =function(mac,device_class,timestamp,sensor_id,rssi){
		var record = new record_model()
		record.mac=mac
		record.device_class=device_class
		record.timestamp=timestamp
		record.sensor_id=sensor_id
		record.rssi=rssi
		record.save(function(err){
			if(!err){
				console.log(JSON.stringify(record)+' saved to db')
			}else{
				console.log('ERROR: ' + err)
			}
		})
	}

}
module.exports=record