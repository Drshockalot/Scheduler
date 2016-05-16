var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/bnet', passport.authenticate('bnet'));

router.get('/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/admin' }), function(req, res, next) {
  console.log(req.user);
  res.redirect('/');
});

router.get('/bnet/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
