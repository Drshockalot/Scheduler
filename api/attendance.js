var express = require('express');
var router = express.Router();

var fs = require('fs');

var Raid_Week = require('./../db/postgres/raid_week');

router.get('/admin', function(req, res, next) {
  Raid_Week.forge()
           .fetchAll()
           .then(function(raidweeks) {
             if(raidweeks) {
               res.json({error: false, data: {message: "Raid Weeks retreived", raidweeks: raidweeks.toJSON()}});
             } else {
               res.json({error: true, data: {message: "No Raid Weeks Found", raidweeks: {}}});
             }
           })
           .catch(function(err) {
             res.status(500).json({error: true, data: {message: err.message}});
           });
});

router.post('/admin', function(req, res, next) {
  var savePath = __dirname + '/uploads/raidattendance'
  console.log(req.body.name);
  fs.writeFile(req.body.name, req.body.file, function(err) {
    if(err) {
      res.json({error: err});
    } else {
      res.json('gucci');
    }
  });
});

module.exports = router;
