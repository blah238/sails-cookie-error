/**
 * MainController
 *
 * @description :: Server-side logic for managing the entry point to the site
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {
    return res.redirect('/');
  }
};
