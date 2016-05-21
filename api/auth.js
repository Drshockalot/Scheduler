var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/bnet', passport.authenticate('bnet'));

router.get('/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/admin' }), function(req, res, next) {
  res.redirect('/');
});

router.get('/bnet/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/bnet/logout/hard', function(req, res, next) {
  req.logout();
  res.redirect('https://eu.battle.net/en/?logout');
});

router.get('/bnet/status', function(req, res, next) {
  console.log(req.user);
  if(req.user == undefined) {
    res.send('');
  } else {
    res.send(req.user);
  }
});

module.exports = router;
