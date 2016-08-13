var express = require('express');
var router = express.Router();
var passport = require('passport');
var cookie = require('react-cookie');

router.get('/bnet', passport.authenticate('bnet'));

router.get('/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/?failedLogin=1' }), function(req, res, next) {
  res.redirect('/');
});

router.get('/bnet/logout', function(req, res, next) {
  delete req.session.roles['tok' + req.session.passport.user.token].role;
  req.logout();
  res.redirect('/');
});

router.get('/bnet/status', function(req, res, next) {
  if(!req.user) {
    res.send(null);
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

router.get('/role', function(req, res, next) {
  if(req.session.roles['tok' + req.session.passport.user.token].role) {
    res.json({role: req.session.roles['tok' + req.session.passport.user.token].role});
  } else {
    res.json(null);
  }
});

module.exports = router;
