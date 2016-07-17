var express = require('express');
var router = express.Router();
var moment = require('moment');

var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: './attendance/' });

var Raid_Week = require('./../db/postgres/raid_week');
var Roster = require('./../db/postgres/roster');
var Raid = require('./../db/postgres/raid');
var User = require('./../db/postgres/user');
var Character = require('./../db/postgres/character');

var knex = require('./../db/database').knex;

router.get('/admin', function(req, res, next) {
  Raid_Week.forge()
           .fetchAll()
           .then(function(raidweeks) {
             Raid.forge()
                 .fetchAll()
                 .then(function(raids) {
                   Roster.forge()
                         .fetchAll({'withRelated': ['characters']})
                         .then(function(rosters) {
                           res.json({error: false, data: {message: "Raid Weeks retreived", raidweeks: raidweeks.toJSON(), rosters: rosters.toJSON(), raids: raids.toJSON()}});
                         })
                         .catch(function(err) {
                           res.status(500).json({error: true, data: {message: err.message}});
                         });
                 })
                 .catch(function(err) {
                   res.status(500).json({error: true, data: {message: err.message}});
                 });
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

router.post('/admin/roster', function(req, res, next) {
  console.log(req.body);
  Character.query({whereIn: {name: req.body.names}})
           .fetchAll()
           .then(function(characters) {
             var insertRows = [];
             characters.toJSON().map(function(character) {
               return {
                 user_id: character.user_id,
                 raid_week_id: req.body.raidWeekId,
                 raid_id: req.body.raidId,
                 raid_night: req.body.weekday
               };
             });
             knex.batchInsert('raid_attendance', insertRows)
                 .then(function() {
                   res.json({error: false, data: {message: "User Attendance inserted"}});
                 })
                 .catch(function(err) {
                   res.status(500).json({error: true, data: {message: err.message}});
                 });
           })
           .catch(function(err) {
             res.status(500).json({error: true, data: {message: err.message}});
           });
});

module.exports = router;
