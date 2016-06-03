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

  it('installs bootstrap', function (done) {
    helpers.mockPrompt(this.app, {
      format: 'css'
    });

    this.app.run(function () {
      assert.equal(this.bowerInstallCalls[0][0], 'bootstrap');
      done();
    }.bind(this));
  });
});
