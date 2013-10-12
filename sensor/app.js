
var express 	= require('express')
var app 		= express()
var http 		= require("http").createServer(app)
var mongoose 	= require('mongoose')
var routes 		= require('./routes/devices')
var _ 			= require("underscore")
var io 			= require("socket.io").listen(http,{log:true})

/*app config*/
app.configure(function () {
	app.use(express.bodyParser())
  	app.use(express.methodOverride())
  	app.use(app.router)
})

//Specify the templates folder
app.set("views", __dirname + "/templates")

//template engine is Jade
app.set("view engine", "jade");

//Specify where the static content is
app.use(express.static("static", __dirname + "/static"))

/*Connecto to Mongodb*/
mongoose.connect('mongodb://localhost/sensor',function(err, res){
	if(!err){
		console.log('Connected to databasase, Successfuly!')
	}else{
		console.log('ERROR:' + err);
	}
});

/*HTTP Methoods*/
app.get('/', routes.index)
app.get('/records', routes.getAll)
app.post('/records', routes.addRecord)
app.get('/records/number', routes.getCount)
app.get('/realtime', routes.scanNow)





app.listen(process.env.PORT||3000);