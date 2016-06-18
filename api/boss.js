var express = require('express');
var router = express.Router();

var Raid = require('./../db/postgres/raid');
var Boss = require('./../db/postgres/boss');

router.post('/admin', function(req, res, next) {
  Boss.forge({ raid_id: req.body.raidId,
               name: req.body.name,
               description: req.body.description})
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

module.exports = router;
