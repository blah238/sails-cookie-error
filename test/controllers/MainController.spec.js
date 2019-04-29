/**
 * Test File: Testing MainController
 * File location: test/controllers/MainController.spec.js
 */

describe('MainController', function () {

  describe('#index', function (done) {

    it('should redirect to the site root', function (done) {
      request(sails.hooks.http.app)
      .get('/')
      .expect(302)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.headers.location).to.equal('/');
        done();
      });
    });
  });

  describe('#index2', function (done) {

    before(function () {
      // Lowers and then re-lifts the app before the next test
      return appHelper.lift();
    })

    it('should redirect to the site root again', function (done) {
      request(sails.hooks.http.app)
      .get('/')
      .expect(302)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.headers.location).to.equal('/');
        done();
      });
    });
  });
});
