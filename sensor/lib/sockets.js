var socketio    = require('socket.io')
var scan        = require('../scan.js')
var bt          = new scan() 
var _           = require("underscore") 

module.exports.listen = function(app){
	server = require('http').createServer(app)
    io = socketio.listen(server)
    io.set('log level',3);
    server.listen(3000)

    //realtime namespace
    realtime = io.of('/realtime')
    realtime.on('connection', function(socket){
        console.log('DEBUG: ' + socket.id + '  conected')
        socket.on('start_scan', function(time){
            //console.log("DEBUG - socket.js: star scan event emited")
            bt.start(time)

    		bt.on('device_found',function (device_found){
                //var btdevice =peripheral.uuid
                console.log('DEBUG - socket.js: device_found event has ' + _.size(bt.listeners('device_found'))+ ' listeners')
                console.log("DEBUG - socket.js: bt device found  event emited")
                socket.emit('bt',device_found)
            })

            bt.on('scan_stopped', function(){
                socket.emit('scan_stopped')
                bt.removeAllListeners()
            })
       	})

    	socket.on('stop_scan', function(){
    		bt.stop()
            bt.on('scan_stopped', function(){
                socket.emit('scan_stopped')
                bt.removeAllListeners()
            })
            
        })
        //.removeAllListeners()
        socket.on('disconnect', function() {
            console.log('DEBUG: ' + socket.id + '  disconected')
            socket.removeAllListeners()
            //delete sockets[_.indexOf(sockets,socket.id)]
        })
    })
    return io
}