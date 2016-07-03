var express = require('express');
var router = express.Router();

var Raid = require('./../db/postgres/raid');
var Boss = require('./../db/postgres/boss');

router.post('/admin', function(req, res, next) {
  Boss.forge({ raid_id: req.body.raidId,
               name: req.body.name,
               description: req.body.description,
               tank_count: req.body.tank_count,
               healer_count: req.body.healer_count,
               dps_count: req.body.dps_count})
      .save()
      .then(function(boss) {
        Raid.forge()
            .fetchAll({'withRelated': ['bosses']})
            .then(function(raids) {
              res.json({error: false, data: {message: 'Boss added', raids: raids.toJSON()}});
            })
            .then(function(err) {
              res.status(500).json({error: true, data: {message: err.message}});
            });
      })
      .catch(function(err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
});

router.delete('/admin', function(req, res, next) {
  Boss.forge({id: req.body.id})
      .fetch({require: true})
      .then(function(boss) {
        boss.destroy()
            .then(function() {
              Raid.forge()
                  .fetchAll({'withRelated': ['bosses']})
                  .then(function(raids) {
                    res.json({error: false, data: {message: 'Boss deleted', raids: raids.toJSON()}});
                  })
                  .catch(function(err) {
                    res.status(500).json({error: true, data: {message: err.message}});
                  })
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
