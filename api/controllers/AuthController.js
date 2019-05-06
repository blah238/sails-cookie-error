/**
 * AuthController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var passport = require('../middleware/passport'),
    _ = require('lodash');

var AuthController = {
  login: function (req, res) {
    if (!req.user) {
      return res.send('<html><body><form action="/login" method="post"><div><label for="name">Name:</label><input type="text" id="name" name="username"></div><div><label for="password">Password:</label><input type="password" id="password" name="password"></div><button type="submit">Log in</button></form></body></html>');
    }
    res.redirect('/');
  },

  processLogin: function (req, res) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return res.serverError(err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.login(user, function (err) {
        if (err) {
          return res.serverError(err);
        }
        return res.redirect('/');
      });
    })(req, res, req.next);
  },

  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  },
};

module.exports = AuthController;
