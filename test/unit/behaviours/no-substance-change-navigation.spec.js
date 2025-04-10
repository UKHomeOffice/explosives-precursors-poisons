const Behaviour = require('../../../apps/epp-replace/behaviours/no-substance-change-navigation');

describe('no-substance-change-navigation behaviour tests', () => {
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
    req.form.values = {
      'replace-poisons-option': 'no'
    };
    res = reqres.res();
    instance = new (Behaviour('/poisons')(Base))();
  });

  describe('saveValues tests', () => {
    beforeEach(() => {
      sinon
        .stub(Base.prototype, 'saveValues')
        .callsFake((request, response, nextFn) => nextFn);
    });

    it('should navigate to /no-precursors-or-poisons', () => {
      req.sessionModel.get = sinon.stub();
      req.sessionModel.set = sinon.stub();
      req.baseUrl = '/base-url';
      req.sessionModel.get
        .withArgs('replace-regulated-explosives-precursors')
        .returns('no');

      instance.saveValues(req, res, next);

      expect(res.redirect.calledWith('/base-url/no-precursors-or-poisons')).to
        .be.true;
      expect(req.sessionModel.set.called).to.be.true;
      expect(Base.prototype.saveValues.called).to.be.false;
    });

    it('should navigate to /countersignatory-details', () => {
      req.sessionModel.get = sinon.stub();
      req.sessionModel.set = sinon.stub();
      req.baseUrl = '/base-url';
      req.sessionModel.get
        .withArgs('replace-regulated-explosives-precursors')
        .returns('yes');
      req.sessionModel.get.withArgs('replace-name-options').returns('yes');

      instance.saveValues(req, res, next);

      expect(res.redirect.calledWith('/base-url/countersignatory-details')).to
        .be.true;
      expect(req.sessionModel.set.called).to.be.false;
      expect(Base.prototype.saveValues.called).to.be.false;
    });

    it('should navigate to /confirm', () => {
      req.sessionModel.get = sinon.stub();
      req.sessionModel.set = sinon.stub();
      req.baseUrl = '/base-url';
      req.sessionModel.get
        .withArgs('replace-regulated-explosives-precursors')
        .returns('yes');
      req.sessionModel.get.withArgs('replace-name-options').returns('no');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .returns('no');

      instance.saveValues(req, res, next);

      expect(res.redirect.calledWith('/base-url/confirm')).to.be.true;
      expect(req.sessionModel.set.called).to.be.false;
      expect(Base.prototype.saveValues.called).to.be.false;
    });

    afterEach(() => {
      Base.prototype.saveValues.restore();
    });
  });
});
