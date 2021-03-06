var express = require('express');
var router = express.Router();
var _ = require('underscore');

var User = require('./../db/postgres/user');

router.post('/log', function(req, res, next) {
  User.forge()
      .query('whereIn', 'battletag', req.body.battletag)
      .fetch()
      .then(function(user) {
        if(!user) {
          User.forge({ battletag: req.body.battletag, role: req.body.role })
              .save()
              .then(function(user) {
                req.user.role = req.body.role;
                req.session.role = req.body.role;
                res.json({error: false, data: {message: 'New User saved', user: user.toJSON()}});
              })
              .catch(function(err) {
                res.status(500).json({error: true, data: {message: err.message}});
              });
        }
        else {
          req.user.role = user.toJSON().role;
          req.session.role = user.toJSON().role;
          res.json({error: false, data: { message: 'User ' + user.get('battletag') + ' already exists', user: user.toJSON()}});
        }
      })
      .catch(function(err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
});

module.exports = router;
