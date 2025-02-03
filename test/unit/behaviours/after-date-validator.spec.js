/* eslint max-len: 0 */
'use strict';

const { reqres } = require('hof/utilities');
const Behaviour = require('../../../apps/epp-common/behaviours/after-date-validator');
const Controller = require('hof').controller;


describe("apps/epp-common 'after-date-validator' behaviour", () => {
  let behaviour;
  let req;
  let res;
  let key;


  beforeEach(done => {
    req = reqres.req();
    res = reqres.res();
    key = sinon.stub();

    const DateValidaition = Behaviour(Controller);
    behaviour = new DateValidaition({ template: 'new-name', route: '/new-name' });
    behaviour._configure(req, res, done);
  });


  describe("The date after date of birth validate '.validateField' method", () => {
    it("returns an error if the 'amend-new-date-name-changed' is before the 'amend-date-of-birth'", () => {
      req.form.values['amend-date-of-birth'] = '1978-10-19';
      req.form.values['amend-new-date-name-changed'] = '1960-10-19';

      behaviour.validateField(key, req, err => {
        err['amend-new-date-name-changed'].should.be.an.instanceof(behaviour.ValidationError);
        err['amend-new-date-name-changed'].should.have.property('type').and.equal('after');
      });
    });
  });
});
