var express = require('express');
var router = express.Router();

var Schedule = require('./../db/postgres/schedule');
var Character = require('./../db/postgres/character');
var Raid = require('./../db/postgres/raid');
var RaidWeek = require('./../db/postgres/raid_week');
var Schedule_Boss = require('./../db/postgres/schedule_boss');
var Roster = require('./../db/postgres/roster');

var knex = require('./../db/database').knex;

var _ = require('underscore');

router.get('/', function(req, res, next) {
  Schedule.forge()
          .fetchAll({'withRelated': ['schedule_bosses', 'schedule_bosses.characters', 'schedule_bosses.boss', 'schedule_bosses.raid', 'roster', 'roster.characters', 'roster.characters.user', 'roster.characters.user_availability']})
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

router.get('/single/:scheduleid', function(req, res, next) {
  Schedule.forge({id: req.params.scheduleid})
          .fetch({'withRelated': ['schedule_bosses', 'schedule_bosses.characters', 'schedule_bosses.boss', 'schedule_bosses.raid', 'roster', 'roster.characters', 'roster.characters.user', 'roster.characters.user_availability']})
          .then(function(schedule) {
            res.json({error: false, data: {message: "Schedule retrieved", schedule: schedule.toJSON()}});
          })
          .catch(function(err) {
            res.status(500).json({error: true, data: {message: err.message}});
          });
});

router.post('/admin', function(req, res, next) {
  Schedule.forge({raid_week_id: req.body.rwId,
                  name: req.body.name,
                  description: req.body.description,
                  roster_id: req.body.rosterId})
          .save()
          .then(function(schedule) {
            Schedule.forge()
                    .fetchAll({'withRelated': ['schedule_bosses', 'schedule_bosses.characters', 'schedule_bosses.boss', 'schedule_bosses.raid', 'roster', 'roster.characters', 'roster.characters.user', 'roster.characters.user_availability']})
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
                       raid_id: req.body.raid})
               .save()
               .then(function(schedule_boss) {
                 Schedule.forge()
                         .fetchAll({'withRelated': ['schedule_bosses', 'schedule_bosses.characters', 'schedule_bosses.boss', 'schedule_bosses.raid', 'roster', 'roster.characters', 'roster.characters.user', 'roster.characters.user_availability']})
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
                         .fetchAll({'withRelated': ['schedule_bosses', 'schedule_bosses.characters', 'schedule_bosses.boss', 'schedule_bosses.raid', 'roster', 'roster.characters', 'roster.characters.user', 'roster.characters.user_availability']})
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
                         .fetchAll({'withRelated': ['schedule_bosses', 'schedule_bosses.characters', 'schedule_bosses.boss', 'schedule_bosses.raid', 'roster', 'roster.characters', 'roster.characters.user', 'roster.characters.user_availability']})
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

router.put('/admin/publish/:schedulebossid', function(req, res, next) {
  Schedule_Boss.forge({id: req.params.schedulebossid})
               .fetch()
               .then(function(schedule_boss) {
                 schedule_boss.save({published: !schedule_boss.get('published')})
                         .then(function() {
                           Schedule.forge()
                                   .fetchAll({'withRelated': ['schedule_bosses', 'schedule_bosses.characters', 'schedule_bosses.boss', 'schedule_bosses.raid', 'roster', 'roster.characters', 'roster.characters.user', 'roster.characters.user_availability']})
                                   .then(function(schedules) {
                                     res.json({error: false, data: {message: "Published state inverted", schedules: schedules.toJSON()}});
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

router.delete('/admin/boss/:schedulebossid', function(req, res, next) {
  Schedule_Boss.forge({id: req.params.schedulebossid})
               .fetch()
               .then(function(schedule_boss) {
                 schedule_boss.destroy()
                              .then(function() {
                                Schedule.forge()
                                        .fetchAll({'withRelated': ['schedule_bosses', 'schedule_bosses.characters', 'schedule_bosses.boss', 'schedule_bosses.raid', 'roster', 'roster.characters', 'roster.characters.user', 'roster.characters.user_availability']})
                                        .then(function(schedules) {
                                          res.json({error: false, data: {message: "Schedule Boss deleted", schedules: schedules.toJSON()}});
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

router.put('/admin/raid', function(req, res, next) {
  Raid.forge({id: req.body.raidId})
      .fetch({'withRelated': ['bosses']})
      .then(function(raid) {
        var scheduleBossRows = [];
        raid.toJSON().bosses.map(function(boss) {
          scheduleBossRows.push({schedule_id: req.body.scheduleId,
                                 boss_id: boss.id,
                                 raid_id: req.body.raidId,
                                 published: false});
        });
        knex.batchInsert('schedule_boss', scheduleBossRows)
            .then(function() {
              Schedule.forge()
                      .fetchAll({'withRelated': ['schedule_bosses', 'schedule_bosses.characters', 'schedule_bosses.boss', 'schedule_bosses.raid', 'roster', 'roster.characters', 'roster.characters.user', 'roster.characters.user_availability']})
                      .then(function(schedules) {
                        res.json({error: false, data: {message: "Schedule Boss deleted", schedules: schedules.toJSON()}});
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

module.exports = router;
