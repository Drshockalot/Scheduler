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
var Raid_Attendance = require('./../db/postgres/raid_attendance');

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
                           res.json({error: false, data: {message: "Data for the Add Attendance page retrieved", raidweeks: raidweeks.toJSON(), rosters: rosters.toJSON(), raids: raids.toJSON()}});
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

router.post('/admin/file', upload.single('attendance'), function(req, res, next) {
  Character.where('name', 'in', req.body['names[]'])
           .fetchAll()
           .then(function(characters) {
             var insertRows = characters.toJSON().map(function(character) {
               return {
                 user_id: character.user_id,
                 raid_week_id: req.body.raidWeekId,
                 raid_id: req.body.raidId,
                 week_day: req.body.weekday
               };
               knex.batchInsert('raid_attendance', insertRows)
                   .then(function() {
                     res.json({error: false, data: {message: "User Attendance inserted"}});
                   })
                   .catch(function(err) {
                     res.status(500).json({error: true, data: {message: err.message}});
                   });
             });
           })
           .catch(function(err) {
             res.status(500).json({error: true, data: {message: err.message}});
           });
});

router.post('/admin/text', function(req, res, next) {
  console.log(req.body);
  Character.where('name', 'in', req.body['names[]'])
           .fetchAll()
           .then(function(characters) {
             var insertRows = characters.toJSON().map(function(character) {
               return {
                 user_id: character.user_id,
                 raid_week_id: req.body.raidWeekId,
                 raid_id: req.body.raidId,
                 week_day: req.body.weekday
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

router.post('/admin/roster', function(req, res, next) {
  Character.where('name', 'in', req.body['names[]'])
           .fetchAll()
           .then(function(characters) {
             var insertRows = characters.toJSON().map(function(character) {
               return {
                 user_id: character.user_id,
                 raid_week_id: req.body.raidWeekId,
                 raid_id: req.body.raidId,
                 week_day: req.body.weekday
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

router.get('/admin/all', function(req, res, next) {
  Raid_Attendance.forge()
                 .fetchAll({'withRelated': ['user', 'user.characters', 'raid', 'raid_week']})
                 .then(function(attendanceRecords) {
                   res.json({error: false, data: {message: 'Attendance records retrieved', attendanceRecords: attendanceRecords.toJSON()}});
                 })
                 .catch(function(err) {
                   res.status(500).json({error: true, data: {message: err.message}});
                 });
});

module.exports = router;
