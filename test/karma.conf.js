// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-07-31 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

  config.set({
    preprocessors: {
      'app/**/*.html': ['ng-html2js']
    },

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'http://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      "bower_components/jquery/dist/jquery.js",
      "bower_components/json3/lib/json3.js",
      "bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js",
      "bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js",
      "bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js",
      "bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js",
      "bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js",
      "bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js",
      "bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js",
      "bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js",
      "bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js",
      "bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js",
      "bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js",
      "bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js",
      "bower_components/angular-resource/angular-resource.js",
      "bower_components/angular-cookies/angular-cookies.js",
      "bower_components/angular-sanitize/angular-sanitize.js",
      "bower_components/angular-animate/angular-animate.js",
      "bower_components/angular-touch/angular-touch.js",
      "bower_components/angular-route/angular-route.js",
      "bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js",
      "bower_components/moment/moment.js",
      "bower_components/angular-moment/angular-moment.js",
      "bower_components/snapjs/snap.js",
      "bower_components/jquery.stellar/jquery.stellar.js",
      "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
      "bower_components/angular-pusher/angular-pusher.js",
      ".tmp/scripts/config.js",
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js',
      'app/**/*.html'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app'
    }
  });
};
