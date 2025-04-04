'use strict';

process.env.NODE_ENV = 'test';
process.env.NOTIFY_KEY = 'UNIT_TEST';
process.env.NOTIFY_STUB = 'true';

global.reqres = require('hof').utils.reqres;
global.chai = require('chai').use(require('sinon-chai'));
global.should = chai.should();
global.expect = chai.expect;
global.sinon = require('sinon');
global.proxyquire = require('proxyquire');

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
