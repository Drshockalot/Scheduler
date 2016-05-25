var express = require('express');
var router = express.Router();
var _ = require('underscore');

var Character = require('./../db/postgres/character');
var User = require('./../db/postgres/user');

router.post('/confirm', function(req, res, next) {
  User.forge()
      .fetch({'withRelated': ['characters']})
      .then(function(user) {
        console.log(user.toJSON());
        var charactersJSON = user.related('characters').toJSON();
        console.log("Characters JSON");
        console.log(charactersJSON);
        var charactersArr = Object.key(charactersJSON).map(function(i) {
          return charactersJSON[i];
        });
        console.log("Characters Array");
        console.log(charactersArr);
        if(charactersJSON) {
          console.log('In if');
          let count = _.countBy(charactersArr, function(character) {
            return character.rank;
          });
          console.log(count);
          if(req.body.rank === "main" && count.main == 1) {
            res.json({error: false, data: { message: 'You already have one main', character: characters.toJSON()}});
            return;
          }

          if(req.body.rank === "alt" && count.main == 2) {
            res.json({error: false, data: { message: 'You already have two alts', character: characters.toJSON()}});
            return;
          }

          Character.forge({ name: character.name,
                            class: character.class,
                            rank: character.rank,
                            confirmed: 0})
                   .save()
                   .then(function(character) {
                     console.log(character);
                     res.json({error: false, data: {message: 'Character confirmed', character: character.toJSON()}});
                   })
                   .catch(function(err) {
                     res.status(500).json({error: true, data: {message: err.message}});
                   });
        } else {
          console.log('In Else');
          Character.forge({ name: character.name,
                            class: character.class,
                            rank: character.rank,
                            confirmed: 0})
                   .save()
                   .then(function(character) {
                     console.log(character);
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

module.exports = router;
