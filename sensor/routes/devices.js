//Routes---controllers
//File: routes/devices.js

var record          = require('../models/record.js')
var record_model    = new record()
var config          = require('../config.json')

exports.init =function (app) {

  app.get('/', function (req, res){
    res.sendfile('./index.html');
  })

  app.get('/records', function (req, res){
    res.sendfile('./records.html');
  })

  app.get('/config', function (req, res){
    res.sendfile('./config.html');
  })

  app.get('/realtime', function (req, res){
    res.sendfile('./realtime.html')
  })

  /*API*/
  app.get('/API/records', function (req, res){
    record_model.getAllRecords(function(err,records){
      if(!err){
        res.send(records)
        console.log(records)
      }
    })
  })

  /*Config*/

  app.get('/config-file',function(req,res){
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(config))
    console.log('conf requested')
  })
}

