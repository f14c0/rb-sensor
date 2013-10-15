var socketio = require('socket.io')
var scan      = require('../scan.js')

module.exports.listen = function(app){
	server = require('http').createServer(app)
    io = socketio.listen(server)
    server.listen(3000)

    //realtime namespace
    realtime = io.of('/realtime')

    realtime.on('connection', function(socket){
    	var bt = new scan()

    	socket.on('start_scan', function(time){
    		bt.start(time)
    		
    		bt.on('device_found',function(peripheral){
    			var btdevice =peripheral.uuid
    			socket.emit('bt',btdevice)
    		})
	   	})

    	socket.on('stop_scan', function(){
    		bt.stop()
    	})

    })

    return io
}