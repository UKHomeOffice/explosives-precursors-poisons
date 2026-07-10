const RenderPrecursorsDetail = require('../../../apps/epp-common/behaviours/render-precursors-detail');
const reqres = require('hof').utils.reqres;

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
      mockSpyOn(Base.prototype, 'getValues').mockReturnValue(req, res, next);
      instance = new (RenderPrecursorsDetail('test-field-name')(Base))();
    });

    it('init - getValues', () => {
      instance.getValues(req, res, next);
      expect(Base.prototype.getValues).toHaveBeenCalled();
    });

    it('Should set the items in session', () => {
      req = {
        sessionModel: {
          set: mockFn(),
          get: () => 'precursor-value'
        }
      };
      instance.getValues(req, res, next);
      expect(req.sessionModel.set.mock.calls.length).toBe(5);
    });

    afterEach(() => {
      Base.prototype.getValues.mockRestore();
    });
  });
});
