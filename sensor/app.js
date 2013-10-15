
var express 	= require('express')
var app 		= express()
var mongoose 	= require('mongoose')
var routes 		= require('./routes/devices')
var _ 			= require("underscore")
var io      	= require('./lib/sockets.js').listen(app)

/**/

/*app config*/
app.configure(function () {
	app.use(express.bodyParser())
  	app.use(express.methodOverride())
  	app.use(app.router)
})

//Specify where the static content is
app.use(express.static('static', __dirname + '/static'))

/*Connecto to Mongodb*/
mongoose.connect('mongodb://localhost/sensor',function(err, res){
	if(!err){
		console.log('Connected to databasase, Successfuly!')
	}else{
		console.log('ERROR:' + err);
	}
});

/*Init Routes*/
routes.init(app)


/*Start server listening*/

