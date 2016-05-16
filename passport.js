var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(
  new BnetStrategy(
    { clientID: '8fc24vcgky6r8yzja8a4efxncgu8z77g',
      clientSecret: 'bkJrZJps6UVECcMw8EAWkVm83mcm8BNf',
      scope: "wow.profile",
      callbackURL: "https://darkstormschedule.herokuapp.com/auth/bnet/callback" },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
    })
);

module.exports = passport;
