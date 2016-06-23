var express = require('express');
var router = express.Router();

var Schedule = require('./../db/postgres/schedule');
var Character = require('./../db/postgres/character');
var Raid = require('./../db/postgres/raid');
var RaidWeek = require('./../db/postgres/raid_week');
var Schedule_Boss = require('./../db/postgres/schedule_boss');
var Roster = require('./../db/postgres/roster');

router.get('/', function(req, res, next) {
  Schedule.forge()
          .fetchAll({'withRelated': ['schedule_bosses', 'schedule_bosses.characters', 'schedule_bosses.boss', 'schedule_bosses.raid', 'roster', 'roster.characters']})
          .then(function(schedules) {
            Character.forge()
                    .fetchAll()
                    .then(function(characters) {
                      Raid.forge()
                              .fetchAll({'withRelated': ['bosses']})
                              .then(function(raids) {
                                RaidWeek.forge()
                                        .fetchAll()
                                        .then(function(raidweeks) {
                                          Roster.forge()
                                                .fetchAll({'withRelated': ['characters']})
                                                .then(function(rosters) {
                                                  res.json({error: false, data: {message: "data found", schedules: schedules.toJSON(),
                                                                                                        characters: characters.toJSON(),
                                                                                                        raids: raids.toJSON(),
                                                                                                        raidweeks: raidweeks.toJSON(),
                                                                                                        rosters: rosters.toJSON()}});
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
          })
          .catch(function(err) {
            res.status(500).json({error: true, data: {message: err.message}});
          });
});

router.post('/admin', function(req, res, next) {
  Schedule.forge({raid_week_id: req.body.rwId,
                  name: req.body.name,
                  description: req.body.description})
          .save()
          .then(function(schedule) {
            Schedule.forge()
                    .fetchAll({'withRelated': ['schedule_bosses', 'schedule_bosses.characters', 'schedule_bosses.boss', 'schedule_bosses.raid', 'roster', 'roster.characters']})
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

router.post('/admin/boss', function(req, res, next) {
  Schedule_Boss.forge({schedule_id: req.body.schedule,
                       boss_id: req.body.boss,
                       raid_id: req.body.raid,
                       tank_count: req.body.tanks,
                       healer_count: req.body.healers,
                       dps_count: req.body.dps})
               .save()
               .then(function(schedule_boss) {
                 Schedule.forge()
                         .fetchAll({'withRelated': ['schedule_bosses', 'schedule_bosses.characters', 'schedule_bosses.boss', 'schedule_bosses.raid', 'roster', 'roster.characters']})
                         .then(function(schedules) {
                           res.json({error: false, data: {message: "Schedule boss added", schedules: schedules.toJSON()}});
                         })
                         .catch(function(err) {
                           res.status(500).json({error: true, data: {message: err.message}});
                         });
               })
               .catch(function(err) {
                 res.status(500).json({error: true, data: {message: err.message}});
               });
});

router.post('/admin/character', function(req, res, next) {
  Schedule_Boss.forge({id: req.body.scheduleBossId})
               .fetch({'withRelated': ['characters']})
               .then(function(schedule_boss) {
                 schedule_boss.characters().attach(req.body.characterId);
                 Schedule.forge()
                         .fetchAll()
                         .then(function(schedules) {
                           res.json({error: false, data: {message: "Character added", schedules: schedules.toJSON()}});
                         })
                         .catch(function(err) {
                           res.status(500).json({error: true, data: {message: err.message}});
                         });
               })
               .catch(function(err) {
                 res.status(500).json({error: true, data: {message: err.message}});
               });
});

router.delete('/admin/character', function(req, res, next) {
  Schedule_Boss.forge({id: req.body.scheduleBossId})
               .fetch({'withRelated': ['characters']})
               .then(function(schedule_boss) {
                 schedule_boss.characters().detach(req.body.characterId);
                 Schedule.forge()
                         .fetchAll()
                         .then(function(schedules) {
                           res.json({error: false, data: {message: "Character added", schedules: schedules.toJSON()}});
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
