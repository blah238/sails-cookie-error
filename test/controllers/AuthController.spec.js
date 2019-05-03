/**
 * Test File: Testing AuthController
 * File location: test/controllers/AuthController.spec.js
 */

describe('AuthController', function () {

  describe('#login', function () {

    describe('if the user is not logged in', function () {

      it('should show the login page', function (done) {
        requestHelper.checkLocation({ get: '/login', result: 200 }, done);
      });
    });

    describe('if the user is logged in', function () {

      it('should redirect the user to the site root', function (done) {
        // Attempt to access the login page after having just logged in
        requestHelper.checkLocation({ post: '/login', send: userFixtures.user, get: '/login', result: 302, location: '/' }, done);
      });
    });

    describe('#processLogin', function () {

      it('should redirect the user to the site root if login succeeded', function (done) {
        requestHelper.checkLocation({ post: '/login', send: userFixtures.user, result: 302, location: '/' }, done);
      });

      it('should redirect the user to the login page if login failed', function (done) {
        requestHelper.checkLocation({ post: '/login', send: { name: null, password: null }, result: 302, location: '/login' }, done);
      });
    });

    describe('#logout', function () {

      it('should redirect the user to the site root', function (done) {
        requestHelper.checkLocation({ post: '/login', send: userFixtures.user, get: '/logout', result: 302, location: '/' }, done);
      });
    });
  });
});
