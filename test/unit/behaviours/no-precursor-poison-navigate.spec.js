const NoPrecursorOrPoison = require('../../../apps/epp-common/behaviours/no-precursor-poison-navigate');
const reqres = require('hof').utils.reqres;

describe('NoPrecursorOrPoison behaviour tests', () => {
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
    instance = new (NoPrecursorOrPoison(Base))();
  });

  describe('successHandler tests', () => {
    beforeEach(() => {
      mockSpyOn(Base.prototype, 'successHandler').mockImplementation(
        (request, response, nextFn) => nextFn
      );
    });

    it('should redirect to /no-poisons-or-precursors if both options are no', () => {
      req.sessionModel.get = mockFn();
      req.sessionModel.set = mockFn();
      req.sessionModel.get
        .withArgs('new-renew-poisons-options')
        .mockReturnValue('no');
      req.sessionModel.get
        .withArgs('new-renew-regulated-explosives-precursors-options')
        .mockReturnValue('no');
      req.originalUrl = '/test-url';
      req.baseUrl = '/base-url';

      instance.successHandler(req, res, next);

      expect(req.sessionModel.set).toHaveBeenCalledWith(
        'noPrecursorOrPoisonBackLink',
        '/test-url'
      );
      expect(
        res.redirect.calledWith('/base-url/no-poisons-or-precursors')
      ).toBe(true);
      expect(Base.prototype.successHandler).not.toHaveBeenCalled();
    });

    it('should call super.successHandler if the condition is not met', () => {
      req.sessionModel.get = mockFn();
      req.sessionModel.get
        .withArgs('new-renew-poisons-options')
        .mockReturnValue('yes');
      req.sessionModel.get
        .withArgs('new-renew-regulated-explosives-precursors-options')
        .mockReturnValue('no');

      instance.successHandler(req, res, next);

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
