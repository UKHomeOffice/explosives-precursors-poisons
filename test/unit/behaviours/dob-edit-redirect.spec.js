const Behaviour = require('../../../apps/epp-common/behaviours/dob-edit-redirect');
const moment = require('moment');
const reqres = require('hof').utils.reqres;

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
      mockSpyOn(Base.prototype, 'saveValues').mockReturnValue(req, res, next);
      instance = new (Behaviour('test-field-name', '/redirect-url')(Base))();
    });

    it('init - saveValues', () => {
      instance.saveValues(req, res, next);
      expect(Base.prototype.saveValues).toHaveBeenCalled();
    });

    it('Edit Journey - Age is less than 18 years - should redirect to the given redirect URL - ', () => {
      const date = moment().subtract('17', 'years').format('YYYY-MM-DD');
      req = {
        sessionModel: {
          set: mockFn()
        },
        originalUrl: 'http://domain/path/edit',
        form: {
          values: {
            'test-field-name': date
          }
        }
      };
      instance.saveValues(req, res, next);
      expect(res.redirect.calledOnce).toBe(true);
      expect(res.redirect.calledWith('/redirect-url')).toBe(true);
      expect(req.sessionModel.set.calledOnce).toBe(true);
      expect(req.sessionModel.set.calledWith('test-field-name', date));
    });

    it('Non Edit Journey - Age is less than 18 years - should not redirect to the given redirect URL ', () => {
      req = {
        sessionModel: {
          set: mockFn()
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
      expect(res.redirect.calledOnce).toBe(false);
      expect(req.sessionModel.set.calledOnce).toBe(false);
    });

    it('Edit Journey - Age is more than 18 years - should not redirect to the given redirect URL', () => {
      req = {
        sessionModel: {
          set: mockFn()
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
      expect(res.redirect.calledOnce).toBe(false);
      expect(req.sessionModel.set.calledOnce).toBe(false);
    });

    afterEach(() => {
      Base.prototype.saveValues.mockRestore();
    });
  });
});
