var express = require('express');
var router = express.Router();

var Roster = require('./../db/postgres/roster');
var Character = require('./../db/postgres/character');
var User = require('./../db/postgres/user');

var _ = require('underscore');

router.get('/:battletag', function(req, res, next) {
  User.forge({battletag: req.params.battletag})
      .fetch({require: true})
      .then(function(user) {
        Character.where({ user_id: user.get('id')})
                 .fetchAll({'withRelated': ['rosters']})
                 .then(function(characters) {
                   res.json({error: false, data: {message: 'Data returned', characters: characters.toJSON()}});
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

router.get('/admin/all', function(req, res, next) {
  Roster.forge()
        .fetchAll()
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
                     var excludedCharacters = [];
                     var fullCharacterList = characters.toJSON();
                     fullCharacterList.map(function(character, index) {
                       if(!(_.findWhere(includedCharacters, { name: fullCharacterList[index].name}))) {
                         excludedCharacters.push(fullCharacterList[index]);
                       }
                     });

                     res.json({error: false, data: {message: 'Roster Characters Compiled', roster: roster.toJSON(),
                                                                                           includedCharacters: includedCharacters,
                                                                                           excludedCharacters: excludedCharacters}});
                   })
                   .catch(function(err) {
                     res.status(500).json({error: true, data: {message: err.message}});
                   });
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
          res.json({error: false, data: {message: 'Character Removed From Roster', roster: roster}});
        })
        .catch(function(err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
});

module.exports = router;
