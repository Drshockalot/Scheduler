var express = require('express');
var router = express.Router();

var Roster = require('./../db/postgres/roster');

router.post('/admin/:rostername', function(req, res, next) {
  Roster.forge({
    name: req.body.name,
    description: req.body.description || ''
    })
        .save()
        .then(function(roster) {
          res.json({error: false, data: {message: "Roster Created", roster: roster.toJSON()}});
        })
        .catch(function(err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
});

module.exports = router;
