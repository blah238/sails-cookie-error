/**
 * MainController
 *
 * @description :: Server-side logic for managing the entry point to the site
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {
    if (req.user) {
      return res.send('<html><body><p>' + 'Welcome, ' + req.user.username + '</p><a href="/logout">Log out</a></body></html>');
    }
    return res.send('<html><body><p>Welcome, guest</p><a href="/login">Log in</a></body></html>')
  }
};
