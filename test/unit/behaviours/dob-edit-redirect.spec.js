const moment = require('moment');
const Behaviour = require('../../../apps/epp-common/behaviours/dob-edit-redirect');

describe('Tests for dob edit redirect behaviour', () => {
  class Base {
    constructor() {}
    saveValues() {}
  }

  let req;
  let res;
  let instance;
  const next = 'unit-test';

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
  });
  describe('saveValues tests', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'saveValues').returns(req, res, next);
      instance = new (Behaviour('test-field-name', '/redirect-url')(Base))();
    });

    it('init - saveValues', () => {
      instance.saveValues(req, res, next);
      expect(Base.prototype.saveValues).to.have.been.called;
    });

    it('Edit Journey - Age is less than 18 years - should redirect to the given redirect URL - ', () => {
      const date = moment().subtract('17', 'years').format('YYYY-MM-DD');
      req = {
        sessionModel: {
          set: sinon.spy()
        },
        originalUrl: 'http://domain/path/edit',
        form: {
          values: {
            'test-field-name': date
          }
        }
      };
      instance.saveValues(req, res, next);
      expect(res.redirect.calledOnce).to.be.true;
      expect(res.redirect.calledWith('/redirect-url')).to.be.true;
      expect(req.sessionModel.set.calledOnce).to.be.true;
      expect(req.sessionModel.set.calledWith('test-field-name', date));
    });

    it('Non Edit Journey - Age is less than 18 years - should not redirect to the given redirect URL ', () => {
      req = {
        sessionModel: {
          set: sinon.spy()
        },
        originalUrl: 'http://domain/path',
        form: {
          values: {
            'test-field-name': moment()
              .subtract('17', 'years')
              .format('YYYY-MM-DD')
          }
        }
      };
      instance.saveValues(req, res, next);
      expect(res.redirect.calledOnce).to.be.false;
      expect(req.sessionModel.set.calledOnce).to.be.false;
    });

    it('Edit Journey - Age is more than 18 years - should not redirect to the given redirect URL', () => {
      req = {
        sessionModel: {
          set: sinon.spy()
        },
        originalUrl: 'http://domain/path/edit',
        form: {
          values: {
            'test-field-name': moment()
              .subtract('18', 'years')
              .format('YYYY-MM-DD')
          }
        }
      };
      instance.saveValues(req, res, next);
      expect(res.redirect.calledOnce).to.be.false;
      expect(req.sessionModel.set.calledOnce).to.be.false;
    });

    afterEach(() => {
      Base.prototype.saveValues.restore();
    });
  });
});
