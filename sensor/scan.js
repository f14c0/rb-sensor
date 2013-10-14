var noble = require('noble')
var found = []
var util = require ('util')
var events = require('events')
var self

var scanner =function (){
  self=this
  events.EventEmitter.call(this)

  this.start= function(delay){
    var time=delay
    setTimeout(this.stop,1000*time)
    noble.startScanning();
    console.log ("Scanning...")
    self.emit('scanning')

    noble.on('discover', function(peripheral) {
      self.emit('device_found',peripheral)
      console.log("MAC:" + peripheral.uuid)
      console.log("Name: " + peripheral.advertisement.localName);
      console.log("")
      found.push(peripheral)
    });
  }

  this.stop = function(){
    noble.stopScanning();
    console.log("Scan stopped")
    console.log(found);
  }
}

scanner.prototype.__proto__ = events.EventEmitter.prototype;

module.exports=scanner
