
var express 	= require('express')
var app 		= express()
var server 		= require("http").createServer(app)
var mongoose 	= require('mongoose')
var routes 		= require('./routes/devices')
var _ 			= require("underscore")
var io 			= require("socket.io").listen(server)
var hola 		= "holat"
routes.init(app)

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

/*HTTP Methoods*/
//app.get('/', routes.scanNow)
/*
app.get('/records', routes.getAll)
app.post('/records', routes.addRecord)
app.get('/records/number', routes.getCount)
app.get('/realtime', routes.scanNow)*/

io.sockets.on('connection', function (socket) {
    console.log('hola');
    routes.socket = socket
})


/*Start server listening*/
server.listen(3000)


/*Export*/
exports.io=io