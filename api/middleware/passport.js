var passport = require('passport'),
    passportLocal = require('passport-local'),
    _ = require('lodash'),
    users = require('../../test/fixtures/users');

var LocalStrategy = passportLocal.Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (username, done) {
  var user;
  try {
    user = _.find(users, { username: username});
  } catch (err) {
    return done(err);
  }
  if (!user) {
    return done(null, false);
  }
  done(null, user);
});

var localStrategy = new LocalStrategy(function (username, password, done) {
  var user;
  try {
    user = _.find(users, { username: username });
  } catch (err) {
    return done(err);
  }
  if (!user) {
    return done(null, false, {
      message: 'Incorrect User'
    });
  }
  if (password !== _.get(user, 'password')) {
    return done(null, false, {
      message: 'Invalid Password'
    });
  }
  return done(null, user);
});

passport.use(localStrategy);

module.exports = passport;
