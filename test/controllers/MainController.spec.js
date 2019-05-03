/**
 * Test File: Testing MainController
 * File location: test/controllers/MainController.spec.js
 */

describe('MainController', function () {

  describe('#index', function (done) {

    it('should return a 200 status', function (done) {
      request(appHelper.app.hooks.http.app)
      .get('/')
      .expect(200, done);
    });
  });

  describe('#index2 (repeat tests after 2nd lift)', function (done) {

    before(function () {
      // Lowers and then re-lifts the app before the next test
      return appHelper.lift();
    });

    it('should return a 200 status (again)', function (done) {
      request(appHelper.app.hooks.http.app)
      .get('/')
      .expect(200, done);
    });
  });
});
