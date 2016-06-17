var express = require('express');
var router = express.Router();
var _ = require('underscore');

var User_Availability = require('./../db/postgres/user_availability');
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

router.get('/user/:battletag', function(req, res, next) {
  Raid_Week.forge()
           .fetchAll({require: true})
           .then(function(raidweeks) {
              if(raidweeks) {
                User.forge({battletag: req.params.battletag})
                    .fetch({'withRelated': ['user_availability']})
                    .then(function(user) {
                      if(user) {
                        res.json({error: false, data: {message: "data found", raidweeks: raidweeks.toJSON(),
                                                                              user: user.toJSON(),
                                                                              user_availability: user.related('user_availability').toJSON()}});
                      } else {
                        res.json({error: true, data: {message: "No User Found", raidweeks: {},
                                                                                user: {},
                                                                                user_availability: {}}});
                      }
                    })
                    .catch(function(err) {
                      res.status(500).json({error: true, data: {message: err.message}});
                    });
              } else {
                res.json({error: true, data: {message: "No Raid Weeks Found", raidweeks: {},
                                                                              user: {},
                                                                              user_availability: {}}});
              }
           })
           .catch(function(err) {
             res.status(500).json({error: true, data: {message: err.message}});
           });
});

router.post('/user', function(req, res, next) {
  User.forge({battletag: req.body.battletag })
      .fetch({require: true})
      .then(function(user) {
        User_Availability.forge({ user_id: user.get('id'),
                                  raid_week_id: req.body.id,
                                  wednesday: req.body.wednesday,
                                  thursday: req.body.thursday,
                                  friday: req.body.friday,
                                  saturday: req.body.saturday,
                                  sunday: req.body.sunday,
                                  monday: req.body.monday,
                                  tuesday: req.body.tuesday})
                          .save()
                          .then(function(ua) {
                            User_Availability.where({user_id: user.get('id')})
                                             .fetchAll({require: true})
                                             .then(function(allUaForUser) {
                                               res.json({error: false, data: {message: 'User_availability created', user_availability: allUaForUser.toJSON(),
                                                                                                                    user: user.toJSON()}});
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

router.put('/user', function(req, res, next) {
  User.forge({battletag: req.body.battletag })
      .fetch({require: true})
      .then(function(user) {
        User_Availability.forge({ id: req.body.id })
                         .fetch({require: true})
                         .then(function(ua) {
                           ua.save({ wednesday: req.body.wednesday,
                                     thursday: req.body.thursday,
                                     friday: req.body.friday,
                                     saturday: req.body.saturday,
                                     sunday: req.body.sunday,
                                     monday: req.body.monday,
                                     tuesday: req.body.tuesday })
                             .then(function(savedUa) {
                               User_Availability.where({user_id: user.get('id')})
                                                .fetchAll({require: true})
                                                .then(function(allUa) {
                                                  res.json({error: false, data: {message: "User Attendance saved", user_availability: allUa}});
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

router.put('/admin', function(req, res, next) {
  Raid_Week.forge({id: req.body.id})
           .fetch({require: true})
           .then(function(raidweek) {
             raidweek.save( {
               wednesday: req.body.wednesday || raidweek.get('wednesday'),
               thursday: req.body.thursday || raidweek.get('thursday'),
               friday: req.body.friday || raidweek.get('friday'),
               saturday: req.body.saturday || raidweek.get('saturday'),
               sunday: req.body.sunday || raidweek.get('sunday'),
               monday: req.body.monday || raidweek.get('monday'),
               tuesday: req.body.tuesday || raidweek.get('tuesday')
             })
             .then(function() {
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
           })
           .catch(function(err) {
             res.status(500).json({error: true, data: {message: err.message}});
           });
});

module.exports = router;
