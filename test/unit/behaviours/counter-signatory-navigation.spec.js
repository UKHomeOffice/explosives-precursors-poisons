const CounterSignatoryNavigation = require('../../../apps/epp-common/behaviours/counter-signatory-navigation');

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
        get: sinon.stub()
      }
    };
    res = reqres.res();
  });
  describe('saveValues tests', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'saveValues').returns(req, res, next);
      instance = new (CounterSignatoryNavigation('/poison-summary')(Base))();
    });

    it('init - saveValues', () => {
      instance.saveValues(req, res, next);
      expect(Base.prototype.saveValues).to.have.been.called;
    });

    it('Should navigate to countersignatory-details', () => {
      req.sessionModel.get.withArgs('replace-name-options').returns('yes');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .returns('yes');
      instance.saveValues(req, res, next);
      expect(res.redirect.calledWith('/replace/countersignatory-details')).to.be
        .true;
    });

    it('Should not navigate to countersignatory-details', () => {
      req.sessionModel.get.withArgs('replace-name-options').returns('no');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .returns('no');
      instance.saveValues(req, res, next);
      expect(res.redirect.calledWith('/replace/countersignatory-details')).to.be
        .false;
    });

    afterEach(() => {
      Base.prototype.saveValues.restore();
    });
  });
});
