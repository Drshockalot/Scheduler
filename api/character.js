var express = require('express');
var router = express.Router();
var _ = require('underscore');

var Character = require('./../db/postgres/character');
var User = require('./../db/postgres/user');

var classes = require('./../utility/WowClasses');

var https = require('https');

router.get('/user/:battletag', function(req, res, next) {
  User.forge({battletag: req.params.battletag})
      .fetch({'withRelated': ['characters']})
      .then(function(user) {
        res.json({error: false, data: {message: "Characters found", characters: user.related('characters').toJSON()}});
      })
      .catch(function(err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
});

router.post('/confirm/:battletag', function(req, res, next) {
  var characterInput = req.body;
  User.forge({ battletag: req.params.battletag })
      .fetch({'withRelated': ['characters']})
      .then(function(user) {
        var characters = user.related('characters').toJSON();

        if(characters.length > 0) {
          let count = _.countBy(characters, function(character) {
            return character.rank;
          });

          if(req.body.rank === "main" && count.main == 1) {
            res.json({error: false, data: { message: 'You already have one main', responseCode: 1, characters: characters}});
            return;
          }

          if(req.body.rank === "alt" && count.alt == 2) {
            res.json({error: false, data: { message: 'You already have two alts', responseCode: 1, characters: characters}});
            return;
          }

          var sameCharacter = _.findWhere(characters, { name: req.body.name});

          if(sameCharacter === undefined) {
            Character.forge({ name: characterInput.name,
                              class: characterInput.class,
                              rank: characterInput.rank,
                              user_id: user.get('id'),
                              average_ilvl: 0,
                              main_role: "Tank",
                              off_role: "Tank",
                              token: _.findWhere(classes, { id: parseInt(characterInput.class)}).token,
                              confirmed: 0,
                              realm: characterInput.realm})
                     .save()
                     .then(function(character) {
                       res.json({error: false, data: {message: 'Character confirmed', responseCode: 2, character: character.toJSON()}});
                     })
                     .catch(function(err) {
                       res.status(500).json({error: true, data: {message: err.message}});
                     });
          } else {
            if(sameCharacter.rank !== req.body.rank) {
              Character.forge({ id: sameCharacter.id })
                       .fetch({ require: true })
                       .then(function(currentCharacter) {
                         currentCharacter.save({
                           rank: req.body.rank || currentCharacter.get('rank')
                         })
                         .then(function(savedCharacter) {
                           res.json({error: false, data: {message: 'has switched to your ' + savedCharacter.toJSON().rank, responseCode: 3, character: savedCharacter}});
                         })
                         .catch(function(err) {
                           res.status(500).json({error: true, data: {message: err.message}});
                         });
                       })
                       .catch(function(err) {
                         res.status(500).json({error: true, data: {message: err.message}});
                       });
            } else {
              res.json({error: false, data: {message: 'is already your ' + sameCharacter.rank, responseCode: 4, character: sameCharacter}});
            }
          }
        } else {
          Character.forge({ name: characterInput.name,
                            class: characterInput.class,
                            rank: characterInput.rank,
                            user_id: user.get('id'),
                            average_ilvl: 0,
                            main_role: "Tank",
                            off_role: "Tank",
                            token: _.findWhere(classes, { id: parseInt(characterInput.class)}).token,
                            confirmed: 0,
                            realm: characterInput.realm})
                   .save()
                   .then(function(character) {
                     res.json({error: false, data: {message: 'Character confirmed', responseCode: 2, character: character.toJSON()}});
                   })
                   .catch(function(err) {
                     res.status(500).json({error: true, data: {message: err.message}});
                   });
        }
      }).catch(function(err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
});

router.get('/confirmed/:battletag', function(req, res, next) {
  console.log(req.params.battletag);
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

router.put('/:characterid', function(req, res, next) {
  Character.forge({ id: req.params.characterid })
           .fetch({ require: true })
           .then(function(currentCharacter) {
             currentCharacter.save({
               main_role: req.body.main_role || currentCharacter.get('main_role'),
               off_role: req.body.off_role || currentCharacter.get('off_role'),
               average_ilvl: req.body.average_ilvl || currentCharacter.get('average_ilvl')
             })
             .then(function(savedCharacter) {
               res.json({error: false, data: {message: "Character updated", character: savedCharacter}});
             })
             .catch(function(err) {
               res.status(500).json({error: true, data: {message: err.message}});
             });
           })
           .catch(function(err) {
             res.status(500).json({error: true, data: {message: err.message}});
           });
});

router.delete('/:characterid', function(req, res, next) {
  Character.forge({ id: req.params.characterid })
           .fetch({ require: true })
           .then(function(character) {
             character.destroy()
                      .then(function() {
                        res.json({error: false, data: {message: "Character deleted"}});
                      })
                      .catch(function(err) {
                        res.status(500).json({error: true, data: {message: err.message}});
                      });
           })
           .catch(function(err) {
             res.status(500).json({error: true, data: {message: err.message}});
           });
});

router.get('/admin/confirmation', function(req, res, next) {
  User.forge()
      .fetchAll({'withRelated': ['characters']})
      .then(function(users) {
        if(users) {
          res.json({error: false, data: {message: "Characters retreived", users: users.toJSON()}});
        } else {
          res.json({error: true, data: {message: "No Characters Found", users: {}}});
        }
      })
      .catch(function(err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
});

router.put('/admin/confirm/:characterid', function(req, res, next) {
  Character.forge({ id: req.params.characterid })
           .fetch({ require: true })
           .then(function(currentCharacter) {
             currentCharacter.save({
               confirmed: 1
             })
             .then(function(character) {
               res.json({error: false, data: {message: "Character Confirmed", character: character}});
             })
             .catch(function(err) {
               res.status(500).json({error: true, data: {message: err.message}});
             });
           })
           .catch(function(err) {
             res.status(500).json({error: true, data: {message: err.message}});
           });
});

router.delete('/admin/unconfirm/:characterid', function(req, res, next) {
  Character.forge({ id: req.params.characterid })
           .fetch({ require: true })
           .then(function(currentCharacter) {
             currentCharacter.save({
               confirmed: 0
             })
             .then(function(character) {
               res.json({error: false, data: {message: "Character Unconfirmed", character: character}});
             })
             .catch(function(err) {
               res.status(500).json({error: true, data: {message: err.message}});
             });
           })
           .catch(function(err) {
             res.status(500).json({error: true, data: {message: err.message}});
           });
});

router.get('/blizzard', function(req, res, next) {
  https.get('https://eu.api.battle.net/wow/user/characters?locale=en_GB&apikey=8fc24vcgky6r8yzja8a4efxncgu8z77g&access_token=' + req.session.passport.user.token, function(response) {
    res.json({error: false, data: {message: "Character Unconfirmed", characters: response}});
  }).on('error', function(e) {
    res.json({error: true, data: {message: "Could not retrieve characters"}});
  });
});

module.exports = router;
