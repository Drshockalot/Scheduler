var express = require('express');
var router = express.Router();
var _ = require('underscore');

var User = require('./../db/postgres/user');

router.post('/log', function(req, res, next) {
  var user = req.body;
  console.log(user);
  User.forge()
      .query('whereIn', 'battletag', user.battletag)
      .fetch()
      .then(function(user) {
        console.log(user);
        console.log(user.toJSON());
        if(!user) {
          User.forge(user)
              .save()
              .then(function(user) {
                res.json({error: false, data: {message: 'New User saved', user: user.toJSON()}})
              })
              .catch(function(err) {
                res.status(500).json({error: true, data: {message: err.message}});
              });
        }
        else {
          res.json({error: false, data: { message: 'User ' + user.get('battletag') + ' already exists', user: user.toJSON()}});
        }
      })
      .catch(function(err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
});

module.exports = router;
