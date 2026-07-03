const Behaviour = require('../../../apps/epp-replace/behaviours/no-substance-change-navigation');
const reqres = require('hof').utils.reqres;

describe('no-substance-change-navigation behaviour tests', () => {
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
    instance = new (Behaviour('/poisons')(Base))();
  });

  describe('successHandler tests', () => {
    beforeEach(() => {
      mockSpyOn(Base.prototype, 'successHandler').mockImplementation(
        (request, response, nextFn) => nextFn
      );
    });

    it('should navigate to /no-precursors-or-poisons', () => {
      req.sessionModel.get = mockFn();
      req.sessionModel.set = mockFn();
      req.baseUrl = '/base-url';
      req.sessionModel.get
        .withArgs('replace-poisons-option')
        .mockReturnValue('no');
      req.sessionModel.get
        .withArgs('replace-regulated-explosives-precursors')
        .mockReturnValue('no');

      instance.successHandler(req, res, next);

      expect(
        res.redirect.calledWith('/base-url/no-precursors-or-poisons')
      ).toBe(true);
      expect(req.sessionModel.set.called).toBe(true);
      expect(Base.prototype.successHandler).not.toHaveBeenCalled();
    });

    it('should navigate to /countersignatory-details', () => {
      req.sessionModel.get = mockFn();
      req.sessionModel.set = mockFn();
      req.baseUrl = '/base-url';
      req.sessionModel.get
        .withArgs('replace-poisons-option')
        .mockReturnValue('no');
      req.sessionModel.get
        .withArgs('replace-regulated-explosives-precursors')
        .mockReturnValue('yes');
      req.sessionModel.get
        .withArgs('replace-name-options')
        .mockReturnValue('yes');

      instance.successHandler(req, res, next);

      expect(
        res.redirect.calledWith('/base-url/countersignatory-details')
      ).toBe(true);
      expect(req.sessionModel.set.called).toBe(false);
      expect(Base.prototype.successHandler).not.toHaveBeenCalled();
    });

    it('should navigate to /confirm', () => {
      req.sessionModel.get = mockFn();
      req.sessionModel.set = mockFn();
      req.sessionModel.get
        .withArgs('replace-poisons-option')
        .mockReturnValue('no');
      req.baseUrl = '/base-url';
      req.sessionModel.get
        .withArgs('replace-regulated-explosives-precursors')
        .mockReturnValue('yes');
      req.sessionModel.get
        .withArgs('replace-name-options')
        .mockReturnValue('no');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .mockReturnValue('no');

      instance.successHandler(req, res, next);

      expect(res.redirect.calledWith('/base-url/confirm')).toBe(true);
      expect(req.sessionModel.set.called).toBe(false);
      expect(Base.prototype.successHandler).not.toHaveBeenCalled();
    });

    afterEach(() => {
      Base.prototype.successHandler.mockRestore();
    });
  });
});
