var noble     = require('noble')
var found     = []
var util      = require ('util')
var events    = require('events')
var self
var _         = require("underscore")

var scanner =function (){
  self=this
  events.EventEmitter.call(this)

  var timer
  this.start= function(delay){
    var time=delay
    timer=setTimeout(this.stop,1000*time)
    noble.startScanning()
    console.log ('DEBUG - Scan.js: *****Scanning...for '+ time + ' seconds.******')
    self.emit('scanning')
    noble.on('discover', btListener)
  }

  function btListener(peripheral){
    //console.log("DEBUG - scan.js: bt device found  event emited")
    console.log('DEBUG - scan.js: discover event has ' + _.size(noble.listeners('discover'))+ ' listeners')
    var device_found ={mac:peripheral.uuid,name:peripheral.advertisement.localName,timestamp:new Date().getTime(),rssi:peripheral.rssi}
    self.emit('device_found',device_found)
    found.push(peripheral)
  }

  this.stop = function(){
    if (timer) {
      clearTimeout(timer)
      timer = 0
    }
    noble.stopScanning()
    self.emit('scan_stopped')
    noble.removeAllListeners()
  }
}
scanner.prototype.__proto__ = events.EventEmitter.prototype
module.exports=scanner
