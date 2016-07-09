var express = require('express');
var router = express.Router();
var moment = require('moment');

var fs = require('fs');
var multer = require('multer')
var upload = multer({ dest: './attendance/' });

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

router.post('/admin', upload.single('test'), function(req, res, next) {
  console.log(req.file);

  fs.readFile(req.file.path, 'utf8', function(err, data) {
    if(err) {
      console.log('err -', err);
      res.end('nuthin');
    } else {
      console.log('data -', data);
      res.end('yay');
    }
  });
});

module.exports = router;
