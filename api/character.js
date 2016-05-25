var express = require('express');
var router = express.Router();
var _ = require('underscore');

var Character = require('./../db/postgres/character');
var User = require('./../db/postgres/user');

router.post('/confirm', function(req, res, next) {
  var characterInput = req.body;
  User.forge()
      .fetch({'withRelated': ['characters']})
      .then(function(user) {
        var characters = user.related('characters').toJSON();

        if(characters.length > 0) {
          let count = _.countBy(characters, function(character) {
            return character.rank;
          });

          if(req.body.rank === "main" && count.main == 1) {
            res.json({error: false, data: { message: 'You already have one main', characters: characters}});
            return;
          }

          if(req.body.rank === "alt" && count.main == 2) {
            res.json({error: false, data: { message: 'You already have two alts', characters: characters}});
            return;
          }

          Character.forge({ name: characterInput.name,
                            class: characterInput.class,
                            rank: characterInput.rank,
                            user_id: user.get('id'),
                            confirmed: 0})
                   .save()
                   .then(function(character) {
                     res.json({error: false, data: {message: 'Character confirmed', character: character.toJSON()}});
                   })
                   .catch(function(err) {
                     res.status(500).json({error: true, data: {message: err.message}});
                   });
        } else {
          Character.forge({ name: characterInput.name,
                            class: characterInput.class,
                            rank: characterInput.rank,
                            user_id: user.get('id'),
                            confirmed: 0})
                   .save()
                   .then(function(character) {
                     res.json({error: false, data: {message: 'Character confirmed', character: character.toJSON()}});
                   })
                   .catch(function(err) {
                     res.status(500).json({error: true, data: {message: err.message}});
                   });
        }
      }).catch(function(err) {
        res.status(500).json({error: true, data: {message: err.message}});
      })
});

router.get('/confirmed/:battletag', function(req, res, next) {
  User.forge({ battletag: req.params.battletag })
      .fetch({'withRelated': ['characters']})
      .then(function(user) {
        var characters = user.related('characters');
        res.json({error: false, data: characters.toJSON()});
      })
      .catch(function(err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
});

module.exports = router;
