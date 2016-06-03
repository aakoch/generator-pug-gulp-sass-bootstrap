'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-pug-gulp-sass-bootstrap') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  initializing: function () {
    this.pkg = require('root-require')('package.json');
  },

  writing: function () {
    
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
    
    this.fs.copy(
      this.templatePath('app/pug/index.pug'),
      this.destinationPath('app/pug/index.pug')
    );

    return {
      gulpfile: function () {
        this.fs.copyTpl(
          this.templatePath('gulpfile.js'),
          this.destinationPath('gulpfile.js'),
          {
            date: (new Date).toISOString().split('T')[0],
            name: this.pkg.name,
            version: this.pkg.version,
            includeSass: this.includeSass,
            includeBootstrap: this.includeBootstrap,
            includeBabel: this.options['babel'],
            testFramework: this.options['test-framework']
          }
        );
      },

      packageJSON: function () {
        this.fs.copyTpl(
          this.templatePath('_package.json'),
          this.destinationPath('package.json'),
          {
            includeSass: this.includeSass,
            includeBabel: this.options['babel']
          }
        );
      }
    };
  },

  install: function () {
    this.installDependencies();
  },

  bootstrapFiles: function () {
    this.npmInstall(['pug'], {save: true});
  }
});
