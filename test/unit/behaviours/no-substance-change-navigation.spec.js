const Behaviour = require('../../../apps/epp-replace/behaviours/no-substance-change-navigation');

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
      sinon
        .stub(Base.prototype, 'successHandler')
        .callsFake((request, response, nextFn) => nextFn);
    });

    it('should navigate to /no-precursors-or-poisons', () => {
      req.sessionModel.get = sinon.stub();
      req.sessionModel.set = sinon.stub();
      req.baseUrl = '/base-url';
      req.sessionModel.get.withArgs('replace-poisons-option').returns('no');
      req.sessionModel.get
        .withArgs('replace-regulated-explosives-precursors')
        .returns('no');

      instance.successHandler(req, res, next);

      expect(res.redirect.calledWith('/base-url/no-precursors-or-poisons')).to
        .be.true;
      expect(req.sessionModel.set.called).to.be.true;
      expect(Base.prototype.successHandler.called).to.be.false;
    });

    it('should navigate to /countersignatory-details', () => {
      req.sessionModel.get = sinon.stub();
      req.sessionModel.set = sinon.stub();
      req.baseUrl = '/base-url';
      req.sessionModel.get.withArgs('replace-poisons-option').returns('no');
      req.sessionModel.get
        .withArgs('replace-regulated-explosives-precursors')
        .returns('yes');
      req.sessionModel.get.withArgs('replace-name-options').returns('yes');

      instance.successHandler(req, res, next);

      expect(res.redirect.calledWith('/base-url/countersignatory-details')).to
        .be.true;
      expect(req.sessionModel.set.called).to.be.false;
      expect(Base.prototype.successHandler.called).to.be.false;
    });

    it('should navigate to /confirm', () => {
      req.sessionModel.get = sinon.stub();
      req.sessionModel.set = sinon.stub();
      req.sessionModel.get.withArgs('replace-poisons-option').returns('no');
      req.baseUrl = '/base-url';
      req.sessionModel.get
        .withArgs('replace-regulated-explosives-precursors')
        .returns('yes');
      req.sessionModel.get.withArgs('replace-name-options').returns('no');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .returns('no');

      instance.successHandler(req, res, next);

      expect(res.redirect.calledWith('/base-url/confirm')).to.be.true;
      expect(req.sessionModel.set.called).to.be.false;
      expect(Base.prototype.successHandler.called).to.be.false;
    });

    afterEach(() => {
      Base.prototype.successHandler.restore();
    });
  });
});
