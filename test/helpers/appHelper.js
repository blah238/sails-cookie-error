/*
 * appHelper.js
 *
 * @description :: Provides 'lift' and 'lower' methods to set up and tear down a Sails instance (for use in tests)
 */

var _ = require('lodash'),
    Promise = require('bluebird');

var appHelper = {

  app: null,
  lifted: false,

  /**
   * Starts the Sails server and, by default, loads fixtures
   * @param {object} options Options; see defaultOptions below for defaults
   */
  lift: function (options) {

    // Default options
    var defaultOptions = {
      logLevel: 'silly'
    };

    // Normalize arguments
    var normalizedOptions = _.merge(defaultOptions, options);

    return Promise.try(function () {
      // Check whether the Sails server is already running, and stop it if so
      if (appHelper.lifted) {
        return appHelper.lower();
      }
    })
    .then(function () {
      // Start the Sails server
      return _lift(normalizedOptions);
    });
  },

  /* Stops the Sails server
   *
   * @param {function} done Callback function
   */
  lower: function () {
    return Promise.promisify(appHelper.app.lower)()
    .finally(function () {
      appHelper.lifted = false;
      delete appHelper.app;
      decache('../../config/http'); // Workaround for https://github.com/balderdashy/sails/issues/4842
    });
  }
};

module.exports = appHelper;

function _lift (options) {
  var Sails = require('sails').Sails;
  var app = new Sails();
  var _options = {
    globals: {
      _: false,
      async: false,
      models: false,
      sails: false
    },
    log: {
      level: options.logLevel
    },
    hooks: {
      'orm': false
    },
    loadHooks: [
      'controllers',
      'http',
      'moduleloader',
      'policies',
      'request',
      'responses',
      'session',
      'userhooks',
      'views',
    ],
    http: require('../../config/http').http,
    routes: require('../../config/routes').routes,
    liftTimeout: 20000
  };
  return Promise.fromCallback(_.partial(app.lift, _options))
  .tap(function (app) {
    appHelper.lifted = true;
    appHelper.app = app;
  });
}
