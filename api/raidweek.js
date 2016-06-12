var express = require('express');
var router = express.Router();
var _ = require('underscore');

var User_Attendance = require('./../db/postgres/user_attendance');
var User = require('./../db/postgres/user');
var Raid_Week = require('./../db/postgres/raid_week');

router.get('/', function(req, res, next) {
  Raid_Week.forge()
           .fetchAll({require: true})
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

router.post('/user', function(req, res, next) {

});

router.post('/admin', function(req, res, next) {
  Raid_Week.forge({ start: req.body.start,
                    end: req.body.end,
                    wednesday: true,
                    thursday: true,
                    friday: false,
                    saturday: false,
                    sunday: true,
                    monday: true,
                    tuesday: true})
            .save()
            .then(function(raidweek) {
              Raid_Week.forge()
                       .fetchAll({require: true})
                       .then(function(raidweeks) {
                         if(raidweeks) {
                           res.json({error: false, data: {message: "Raid Week added and retrieved", raidweeks: raidweeks.toJSON()}});
                         } else {
                           res.json({error: true, data: {message: "No Raid Weeks Found", raidweeks: {}}});
                         }
                       })
                       .catch(function(err) {
                         res.status(500).json({error: true, data: {message: err.message}});
                       });
            })
            .catch(function(err) {
              res.status(500).json({error: true, data: {message: err.message}});
            });
});

router.delete('/admin/:raidweekid', function(req, res, next) {
  Raid_Week.forge({id: req.params.raidweekid})
           .fetch({require: true})
           .then(function(raidweek) {
             raidweek.destroy()
                     .then(function() {
                       res.json({error: false, data: {message: "Raid Week deleted"}});
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
