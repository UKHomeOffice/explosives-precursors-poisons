const Behaviour = require('../../../apps/epp-replace/behaviours/no-precursors-poisons-navigation');
const reqres = require('hof').utils.reqres;

describe('no-precursors-poisons-navigation behaviour tests', () => {
  class Base {
    constructor() {}
    successHandler() {}
  }

  let req;
  let res;
  let instance;
  const next = 'unit-test';

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    instance = new (Behaviour(Base))();
  });

  describe('successHandler tests', () => {
    beforeEach(() => {
      mockSpyOn(Base.prototype, 'successHandler').mockImplementation(
        (request, response, nextFn) => nextFn
      );
    });

    it('should navigate to /change-substances', () => {
      req.sessionModel.get = mockFn();
      req.baseUrl = '/base-url';
      req.sessionModel.get
        .withArgs('replace-no-poisons-precursors-options')
        .mockReturnValue('no');

      instance.successHandler(req, res, next);

      expect(res.redirect.calledWith('/base-url/change-substances')).toBe(true);
      expect(Base.prototype.successHandler).not.toHaveBeenCalled();
    });

    it('should navigate to /countersignatory-details', () => {
      req.sessionModel.get = mockFn();
      req.baseUrl = '/base-url';
      req.sessionModel.get
        .withArgs('replace-name-options')
        .mockReturnValue('yes');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .mockReturnValue('yes');

      instance.successHandler(req, res, next);

      expect(
        res.redirect.calledWith('/base-url/countersignatory-details')
      ).toBe(true);
      expect(Base.prototype.successHandler).not.toHaveBeenCalled();
    });

    it('should navigate to /confirm', () => {
      req.sessionModel.get = mockFn();
      req.baseUrl = '/base-url';
      req.sessionModel.get
        .withArgs('replace-name-options')
        .mockReturnValue('no');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .mockReturnValue('no');

      instance.successHandler(req, res, next);

      expect(res.redirect.calledWith('/base-url/confirm')).toBe(true);
      expect(Base.prototype.successHandler).not.toHaveBeenCalled();
    });

    afterEach(() => {
      Base.prototype.successHandler.mockRestore();
    });
  });
});
