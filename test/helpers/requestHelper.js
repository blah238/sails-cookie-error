/*
 * requestHelper.js
 *
 * @description :: Provides methods for working with SuperTest in a reusable way
 */

var request = require('supertest');

module.exports.checkLocation = function (settings, done) {
  if (settings.post && settings.get) {
    checkPostGet(settings, done);
  } else if (settings.post && settings.post2) {
    checkPostPost(settings, done);
  } else if (settings.post && settings.send) {
    checkPostSend(settings, done);
  } else if (settings.get) {
    checkGet(settings, done);
  } else if (settings.post) {
    checkPost(settings, done);
  }
};

function checkGet (settings, done) {
  request(appHelper.app.hooks.http.app)
  .get(settings.get)
  .expect(settings.result, done);
}

function checkPost (settings, done) {
  request(appHelper.app.hooks.http.app)
  .post(settings.post)
  .expect(settings.result, done);
}

function checkPostSend (settings, done) {
  if (settings.location) {
    request(appHelper.app.hooks.http.app)
    .post(settings.post)
    .send(settings.send)
    .expect(settings.result, done);
  } else {
    request(appHelper.app.hooks.http.app)
    .post(settings.post)
    .send(settings.send)
    .expect('Location', settings.location)
    .expect(settings.result, done);
  }
}

function checkPostGet (settings, done) {
  var agent = request.agent(appHelper.app.hooks.http.app);
  agent
  .post(settings.post)
  .send(settings.send)
  .end(function (err, res) {
    if (err) {
      return done(err);
    }
    if (settings.location) {
      agent
      .get(settings.get)
      .expect('Location', settings.location)
      .expect(settings.result, done);
    } else {
      agent
      .get(settings.get)
      .expect(settings.result, done);
    }
  });
}

function checkPostPost (settings, done) {
  var agent = request.agent(appHelper.app.hooks.http.app);
  agent
  .post(settings.post)
  .send(settings.send)
  .end(function (err, res) {
    if (err) {
      return done(err);
    }
    if (settings.location) {
      agent
      .post(settings.post2)
      .expect('Location', settings.location)
      .expect(settings.result, done);
    } else {
      agent
      .post(settings.post2)
      .expect(settings.result, done);
    }
  });
}
