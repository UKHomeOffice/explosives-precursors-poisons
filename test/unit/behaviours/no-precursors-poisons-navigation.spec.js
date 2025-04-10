const Behaviour = require('../../../apps/epp-replace/behaviours/no-precursors-poisons-navigation');

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
      sinon
        .stub(Base.prototype, 'successHandler')
        .callsFake((request, response, nextFn) => nextFn);
    });

    it('should navigate to /change-substances', () => {
      req.sessionModel.get = sinon.stub();
      req.baseUrl = '/base-url';
      req.sessionModel.get
        .withArgs('replace-no-poisons-precursors-options')
        .returns('no');

      instance.successHandler(req, res, next);

      expect(res.redirect.calledWith('/base-url/change-substances')).to.be.true;
      expect(Base.prototype.successHandler.called).to.be.false;
    });

    it('should navigate to /countersignatory-details', () => {
      req.sessionModel.get = sinon.stub();
      req.baseUrl = '/base-url';
      req.sessionModel.get.withArgs('replace-name-options').returns('yes');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .returns('yes');

      instance.successHandler(req, res, next);

      expect(res.redirect.calledWith('/base-url/countersignatory-details')).to
        .be.true;
      expect(Base.prototype.successHandler.called).to.be.false;
    });

    it('should navigate to /confirm', () => {
      req.sessionModel.get = sinon.stub();
      req.baseUrl = '/base-url';
      req.sessionModel.get.withArgs('replace-name-options').returns('no');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .returns('no');

      instance.successHandler(req, res, next);

      expect(res.redirect.calledWith('/base-url/confirm')).to.be.true;
      expect(Base.prototype.successHandler.called).to.be.false;
    });

    afterEach(() => {
      Base.prototype.successHandler.restore();
    });
  });
});
