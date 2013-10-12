//Routes---controllers
//File: routes/devices.js
var record = require('../models/record.js');
var scan = require('../scan.js')
//Handlers
exports.index = function (req, res, next) {
   //res.send('Sensor Index')
   res.render("index");
}

/*Starts blueotooth scan */
exports.scanNow= function (req, res, next) {
   var bt = new scan()

   /*bt.on('scanning',function(){
    res.send('Scanning......1')
    console.log("78978798")
   })*/

   bt.on('device_found',function(peripheral){
    res.send(JSON.stringify(peripheral))
    console.log("okoko")
   })
   bt.start(15)
}

/*API calls*/
/*Returns all records from last scan*/
exports.getAll = function (req, res, next) {
  res.send('Get All records')
  record.find(gotRecords)
  function gotRecords (err, productos) {
    if (err) {
      console.log(err)
      return next()
    }
    return res.send(productos)
  }
}
/*Add a record to db*/
exports.addRecord = function (req, res, next) {
   res.send('Add record')
}
/*Get count from last scan*/
exports.getCount = function (req, res, next) {
   res.send('Get count')
}
