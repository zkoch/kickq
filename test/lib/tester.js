/**
 * @fileoverview Main testing library, exporting fixtures, helper functions
 *               etc. All tests must require it.
 */
var jobOpts = require('../fixtures/jobOpts.fix');
var rBuster = require('./redis-buster');

var kickq = require('../..');

kickq.config('loggerConsole', true);


// setup promise env
// https://github.com/domenic/mocha-as-promised#node
// https://github.com/domenic/chai-as-promised/#installation-and-setup
require('mocha-as-promised')(require('grunt-mocha-test/node_modules/mocha'));
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


var tester = module.exports = {};


// export fixtures
tester.fix = jobOpts;

tester.NS = rBuster.KEY;

tester.clear = rBuster.clear;

tester.rBuster = rBuster;
