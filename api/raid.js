var express = require('express');
var router = express.Router();

var Raid = require('./../db/postgres/raid');
var Boss = require('./../db/postgres/boss');

router.get('/', function(req, res, next) {
  Raid.forge()
      .fetchAll({'withRelated': ['bosses']})
      .then(function(raids) {
        if(raids) {
          res.json({error: false, data: {message: "Raids retrieved", raids: raids.toJSON()}});
        } else {
          res.json({error: true, data: {message: "No Raids Found", raids: {}}});
        }
      })
      .catch(function(err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
});

router.post('/admin', function(req, res, next) {
  Raid.forge({ name: req.body.name,
               description: req.body.description})
      .save()
      .then(function(raid) {
        Raid.forge()
            .fetchAll({'withRelated': ['bosses']})
            .then(function(raids) {
              if(raids) {
                res.json({error: false, data: {message: "Raid saved", raids: raids.toJSON()}});
              } else {
                res.json({error: true, data: {message: "No Raids Found", raids: {}}});
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

module.exports = router;
