/*
 * appHelper.js
 *
 * @description :: Provides 'lift' and 'lower' methods to set up and tear down a Sails instance (for use in tests)
 */

var Sails = require('sails/lib/app'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    lifted = false,
    sailsprocess;

var appHelper = {

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
      if (lifted) {
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
    return Promise.promisify(sailsprocess.lower)()
    .finally(function () {
      lifted = false;
    });
  }
};

module.exports = appHelper;

function _lift (options) {
  return Promise.promisify(Sails().lift)({
    globals: {
      _: false,
      async: false,
      models: true,
      sails: true
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
    // http: require('../../config/http').http, // Comment out this line, AND
    http: importFresh('../../config/http').http, // Un-comment this line to get tests passing
    routes: require('../../config/routes').routes,
    liftTimeout: 20000
  })
  .tap(function (app) {
    lifted = true;
    sailsprocess = app;
  });
}
