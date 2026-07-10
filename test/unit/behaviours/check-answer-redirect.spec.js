const Behaviour = require('../../../apps/epp-common/behaviours/check-answer-redirect');
const reqres = require('hof').utils.reqres;

describe('Tests for check-answer-redirect behaviour', () => {
  class Base {
    constructor() {}
    successHandler() {}
  }

  let req;
  let res;
  let instance;
  const next = mockFn();

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
  });
  describe('successHandler tests', () => {
    beforeEach(() => {
      mockSpyOn(Base.prototype, 'successHandler').mockReturnValue(
        req,
        res,
        next
      );
      instance = new (Behaviour('test-field-name', [
        'test-field-name',
        'test-field-name-two',
        'test-field-name-three'
      ])(Base))();
    });

    it('init - successHandler', () => {
      instance.successHandler(req, res, next);
      expect(Base.prototype.successHandler).toHaveBeenCalled();
    });

    it('All fields answer is - no - should redirect to the given redirect /no-details-amend - ', () => {
      req = {
        sessionModel: {
          set: mockFn(),
          get: fieldName => req.sessionModel[fieldName],
          'test-field-name-three': 'no',
          'test-field-name-two': 'no',
          'test-field-name': 'no'
        },
        originalUrl: 'http://domain/path',
        baseUrl: '/amend'
      };
      instance.successHandler(req, res, next);
      expect(res.redirect.calledOnce).toBe(true);
      expect(res.redirect.calledWith(`${req.baseUrl}/no-details-amend`)).toBe(
        true
      );
      expect(req.sessionModel.set.calledWith('test-field-name', 'no'));
    });

    it('current fields answer is - no - should redirect to the fork redirect URL - ', () => {
      req = {
        sessionModel: {
          set: mockFn(),
          get: fieldName => req.sessionModel[fieldName],
          'test-field-name-three': 'yes',
          'test-field-name-two': 'yes',
          'test-field-name': 'no'
        },
        originalUrl: 'http://domain/path',
        baseUrl: '/amend',
        currentField: 'amend-change-substances-options',
        form: {
          values: {
            'test-field-name': 'no'
          }
        }
      };
      instance.successHandler(req, res, next);
      expect(res.redirect.calledOnce).toBe(false);
      expect(Base.prototype.successHandler).toHaveBeenCalledWith(
        req,
        res,
        next
      );
      expect(req.sessionModel.set.calledWith('test-field-name', 'no'));
    });

    it('current fields answer is - yes - should redirect to the next step - ', () => {
      req = {
        sessionModel: {
          get: mockFn().mockReturnValue('yes'),
          'test-field-name': 'yes'
        },
        originalUrl: 'http://domain/path',
        baseUrl: '/amend',
        form: {
          values: {
            'test-field-name': 'yes'
          }
        }
      };
      instance.successHandler(req, res, next);
      expect(res.redirect.calledOnce).toBe(false);
      expect(Base.prototype.successHandler).toHaveBeenCalledWith(
        req,
        res,
        next
      );
    });

    afterEach(() => {
      Base.prototype.successHandler.mockRestore();
    });
  });
});
