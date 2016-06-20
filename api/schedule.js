var express = require('express');
var router = express.Router();

var Schedule = require('./../db/postgres/schedule');
var Character = require('./../db/postgres/character');
var Raid = require('./../db/postgres/raid');
var RaidWeek = require('./../db/postgres/raid_week');

router.get('/', function(req, res, next) {
  Schedule.forge()
          .fetchAll({'withRelated': ['schedule_bosses', 'schedule_bosses.characters', 'schedule_bosses.boss', 'schedule_bosses.raid']})
          .then(function(schedules) {
            Character.forge()
                    .fetchAll()
                    .then(function(characters) {
                      Raid.forge()
                              .fetchAll()
                              .then(function(raids) {
                                RaidWeek.forge()
                                        .fetchAll()
                                        .then(function(raidweeks) {
                                          res.json({error: false, data: {message: "data found", schedules: schedules.toJSON(),
                                                                                                characters: characters.toJSON(),
                                                                                                raids: raids.toJSON(),
                                                                                                raidweeks: raidweeks.toJSON()}});
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
          })
          .catch(function(err) {
            res.status(500).json({error: true, data: {message: err.message}});
          });
});

router.post('/admin', function(req, res, next) {
  Schedule.forge({raid_week_id: req.body.raidWeekId,
                  name: req.body.name,
                  description: req.body.description})
          .save()
          .then(function(schedule) {
            Schedule.forge()
                    .fetchAll({'withRelated': ['schedule_bosses', 'schedule_bosses.characters', 'schedule_bosses.boss', 'schedule_bosses.raid']})
                    .then(function(schedules) {
                      res.json({error: false, data: {message: "Schedule added", schedules: schedules.toJSON()}});
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
