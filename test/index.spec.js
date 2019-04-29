// Testing tools
var chai = require('chai');
global.assert = chai.assert;
global.expect = chai.expect;
global.request = require('supertest');
global.importFresh = require('import-fresh');

// Helpers and fixtures
global.appHelper = require('./helpers/appHelper');

before(function () {
  return appHelper.lift();
});

after(function () {
  return appHelper.lower();
});
