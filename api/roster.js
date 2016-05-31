var express = require('express');
var router = express.Router();

var Roster = require('./../db/postgres/roster');

var _ = require('underscore');

router.post('/admin', function(req, res, next) {
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

router.get('/admin', function(req, res, next) {
  Roster.forge()
        .fetchAll({ require: true })
        .then(function(rosters) {
          if(rosters) {
            res.json({error: false, data: {message: 'Rosters Retrieved', rosters: rosters.toJSON()}});
          } else {
            res.json({error: true, data: {message: 'No Rosters Found', rosters: {}}});
          }
        })
        .catch(function(err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.get('/admin/:rosterid', function(req, res, next) {
  Roster.forge({ id: req.params.rosterid })
        .fetch({'withRelated': ['characters']})
        .then(function(roster) {
          var includedCharacters = roster.related('characters').toJSON();
          Character.forge()
                   .fetchAll({ required: true })
                   .then(function(characters) {
                     var excludedCharacters = _.without(characters.toJSON(), includedCharacters);

                     res.json({error: false, data: {message: 'Roster Characters Compiled', data: { roster: roster.toJSON(),
                                                                                                   includedCharacters: includedCharacters,
                                                                                                   excludedCharacters: excludedCharacters}}});
                   })
                   .catch(function(err) {
                     res.status(500).json({error: true, data: {message: err.message}});
                   })
        })
        .catch(function(err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.put('/admin/link/:characterid/:rosterid', function(req, res, next) {
  Roster.forge({ id: req.params.rosterid })
        .fetch({'withRelated': ['characters']})
        .then(function(roster) {
          roster.characters().attach(req.params.characterid);
          res.json({error: false, data: {message: 'Character Added To Roster', roster: roster}});
        })
        .catch(function(err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
});

router.put('/admin/unlink/:characterid/:rosterid', function(req, res, next) {
  Roster.forge({ id: req.params.rosterid })
        .fetch({'withRelated': ['characters']})
        .then(function(roster) {
          roster.characters().detach(req.params.characterid);
        })
        .catch(function(err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
});

module.exports = router;
