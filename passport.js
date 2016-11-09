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
    { clientID: process.env.BNET_ID,
      clientSecret: process.env.BNET_SECRET,
      scope: "wow.profile",
      callbackURL: "https://www.darkstormschedule.com/auth/bnet/callback" },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
    })
);

module.exports = passport;
