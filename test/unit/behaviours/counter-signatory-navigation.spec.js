const CounterSignatoryNavigation = require('../../../apps/epp-common/behaviours/counter-signatory-navigation');
const reqres = require('hof').utils.reqres;

describe('Tests for counter-signatory-navigation behaviour', () => {
  class Base {
    constructor() {}
    saveValues() {}
  }

  let req;
  let res;
  let instance;
  const next = 'unit-test';

  beforeEach(() => {
    req = {
      sessionModel: {
        get: mockFn()
      }
    };
    res = reqres.res();
  });
  describe('saveValues tests', () => {
    beforeEach(() => {
      mockSpyOn(Base.prototype, 'saveValues').mockReturnValue(req, res, next);
      instance = new (CounterSignatoryNavigation('/poison-summary')(Base))();
    });

    it('init - saveValues', () => {
      instance.saveValues(req, res, next);
      expect(Base.prototype.saveValues).toHaveBeenCalled();
    });

    it('Should navigate to countersignatory-details', () => {
      req.sessionModel.get
        .withArgs('replace-name-options')
        .mockReturnValue('yes');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .mockReturnValue('yes');
      instance.saveValues(req, res, next);
      expect(res.redirect.calledWith('/replace/countersignatory-details')).toBe(
        true
      );
    });

    it('Should not navigate to countersignatory-details', () => {
      req.sessionModel.get
        .withArgs('replace-name-options')
        .mockReturnValue('no');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .mockReturnValue('no');
      instance.saveValues(req, res, next);
      expect(res.redirect.calledWith('/replace/countersignatory-details')).toBe(
        false
      );
    });

    afterEach(() => {
      Base.prototype.saveValues.mockRestore();
    });
  });
});
