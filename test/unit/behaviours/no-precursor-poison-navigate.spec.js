const NoPrecursorOrPoison = require('../../../apps/epp-common/behaviours/no-precursor-poison-navigate');

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
      sinon
        .stub(Base.prototype, 'successHandler')
        .callsFake((request, response, nextFn) => nextFn);
    });

    it('should redirect to /no-poisons-or-precursors if both options are no', () => {
      req.sessionModel.get = sinon.stub();
      req.sessionModel.set = sinon.stub();
      req.sessionModel.get.withArgs('new-renew-poisons-options').returns('no');
      req.sessionModel.get
        .withArgs('new-renew-regulated-explosives-precursors')
        .returns('no');
      req.originalUrl = '/test-url';
      req.baseUrl = '/base-url';

      instance.successHandler(req, res, next);

      expect(
        req.sessionModel.set.calledWith(
          'noPrecursorOrPoisonBackLink',
          '/test-url'
        )
      ).to.be.true;
      expect(res.redirect.calledWith('/base-url/no-poisons-or-precursors')).to
        .be.true;
      expect(Base.prototype.successHandler.called).to.be.false;
    });

    it('should call super.successHandler if the condition is not met', () => {
      req.sessionModel.get = sinon.stub();
      req.sessionModel.get.withArgs('new-renew-poisons-options').returns('yes');
      req.sessionModel.get
        .withArgs('new-renew-regulated-explosives-precursors')
        .returns('no');

      instance.successHandler(req, res, next);

      expect(Base.prototype.successHandler.calledWith(req, res, next)).to.be
        .true;
    });

    afterEach(() => {
      Base.prototype.successHandler.restore();
    });
  });
});
