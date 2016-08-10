var express = require('express');
var router = express.Router();
var passport = require('passport');
var cookie = require('react-cookie');

router.get('/bnet', passport.authenticate('bnet'));

router.get('/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/?failedLogin=1' }), function(req, res, next) {
  res.redirect('/');
});

router.get('/bnet/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/bnet/status', function(req, res, next) {
  if(req.user == undefined) {
    res.redirect('/');
  } else {
    res.send(req.user);
  }
});

router.get('/', function(req, res, next) {
  if(req.user) {
    res.send(req.user);
  } else {
    res.send(null);
  }
});

module.exports = router;
