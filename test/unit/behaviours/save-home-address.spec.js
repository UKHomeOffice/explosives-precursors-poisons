const SaveAddress = require('../../../apps/epp-common/behaviours/save-home-other-address');

describe('Tests for save home address behaviour', () => {
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
    res = reqres.res();
  });
  describe('saveValues tests', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'saveValues').returns(req, res, next);
      const addressFields = ['address-field-1', 'address-field-2'];
      instance = new (SaveAddress(addressFields, 'home')(Base))();
    });

    it('init - saveValues', () => {
      instance.saveValues(req, res, next);
      expect(Base.prototype.saveValues).to.have.been.called;
    });

    it('Should set the address in session', () => {
      req = {
        sessionModel: {
          set: sinon.spy(),
          get: sinon.spy()
        },
        form: {
          values: {
            'address-field-1': 'Address Line 1',
            'address-field-2': 'Address Line 2'
          }
        }
      };
      instance.saveValues(req, res, next);
      expect(req.sessionModel.set.calledOnce).to.be.true;
      expect(
        req.sessionModel.set.calledWith(
          'homeAddressInline',
          'Address Line 1, Address Line 2'
        )
      ).to.be.true;
    });

    afterEach(() => {
      Base.prototype.saveValues.restore();
    });
  });
});
