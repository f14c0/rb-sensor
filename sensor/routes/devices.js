//Routes---controllers
//File: routes/devices.js
var record = require('../models/record.js');
var scan = require('../scan.js')


exports.init =function (app) {
  
  app.get('/', function (req, res){
    res.sendfile('./index.html');
  })

  app.get('/records', function (req, res){
    res.send('Get All records')
  })

  app.post('/records', function (req, res){
    res.sendfile('./index.html');
  })

  app.get('/records/number', function (req, res){
    res.send('Get count')
  })

  app.get('/realtime', function (req, res){
    var bt = new scan()
   /*bt.on('scanning',function(){
    res.send('Scanning......1')
    console.log("78978798")
   })*/
    bt.on('device_found',function(peripheral){
    var btdevice ={MAC:peripheral.uuid}
    //socket.emit('bt',btdevice)
   })
   bt.start(25)
  })
}
