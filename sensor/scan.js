var noble = require('noble')
var found = []
var util = require ('util')
var events = require('events')
var self

var scanner =function (){
  self=this
  events.EventEmitter.call(this)
  var timer
  this.start= function(delay){
    var time=delay
    timer=setTimeout(this.stop,1000*time)
    noble.startScanning();
    console.log ("Scanning..."+ 'for '+ time + ' seconds.')
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
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
    noble.stopScanning();
    console.log("Scan stopped")
  }
}

scanner.prototype.__proto__ = events.EventEmitter.prototype;

module.exports=scanner
