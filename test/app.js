'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-pug-gulp-sass-bootstrap:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'dummyfile.txt'
    ]);
  });

  it('installs sass-bootstrap', function (done) {
    this.app.run(function () {
      assert.equal(this.bowerInstallCalls[0][0], 'bootstrap-sass-official');
      done();
    }.bind(this));
  });
});
