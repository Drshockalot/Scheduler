var express = require('express');
var router = express.Router();

var RaidWeek = require('./../db/postgres/raid_week');

router.get('/', function(req, res, next) {
  RaidWeek.forge()
          .fetchAll({'withRelated': ['schedules', 'schedules.schedule_bosses', 'schedule_bosses.raid']})
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

module.exports = router;
