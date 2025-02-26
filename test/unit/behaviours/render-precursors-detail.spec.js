const RenderPrecursorsDetail = require('../../../apps/epp-common/behaviours/render-precursors-detail');

describe('Tests for render precursors detail behaviour', () => {
  class Base {
    constructor() {}
    getValues() {}
  }

  let req;
  let res;
  let instance;
  const next = 'unit-test';

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
  });
  describe('getValues tests', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'getValues').returns(req, res, next);
      instance = new (RenderPrecursorsDetail('test-field-name')(Base))();
    });

    it('init - getValues', () => {
      instance.getValues(req, res, next);
      expect(Base.prototype.getValues).to.have.been.called;
    });

    it('Should set the items in session', () => {
      req = {
        sessionModel: {
          set: sinon.spy(),
          get: () => 'precursor-value'
        }
      };
      instance.getValues(req, res, next);
      expect(req.sessionModel.set.callCount).to.equal(5);
    });

    afterEach(() => {
      Base.prototype.getValues.restore();
    });
  });
});
