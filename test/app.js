/* eslint spaced-comment:off */
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

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../generators/app');
  });

  it('creates files', function () {
    assert.file([
      'dummyfile.txt'
    ]);
  });

  it('installs pug example file', function (done) {
    assert.file([
      'app/pug/index.pug'
    ]);

    done();
  });
});
