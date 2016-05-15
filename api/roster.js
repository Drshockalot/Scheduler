var express = require('express');
var router = express.Router();

var roster = require('../db/models/roster');

router.get('/', function(req, res, next) {
  roster.find({})/*.populate('members')*/.exec(function(err, result){
    if (err) {
      res.json({'status' : 'error', 'message' : err});
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

router.post('/', function(req, res, next) {
  var data = req.body;
  var query = { 'name' : data.name };

  roster.find(query, function(err, result) {
    if (err) {
      res.json({'status' : 'error', 'message' : err});
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

router.post('/add', function(req, res, next) {
  var data = req.body;
  console.log(data);
  var newRoster = new roster(data);
  console.log(newRoster);
  newRoster.save(data, function(err, result){
    if (err) {
      res.json({'status' : 'error', 'message' : err});
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

module.exports = router;
