const DeleteRedundantDocuments = require('../../../apps/epp-common/behaviours/delete-redundant-documents');
const reqres = require('hof').utils.reqres;

describe('Tests for delete-redundant-documents behaviour', () => {
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
      mockSpyOn(Base.prototype, 'saveValues').mockReturnValue(req, res, next);
      instance = new (DeleteRedundantDocuments('test-fiel-name', [
        'upload-test-1'
      ])(Base))();
    });

    it('init - saveValues', () => {
      instance.saveValues(req, res, next);
      expect(Base.prototype.saveValues).toHaveBeenCalled();
    });

    it('Should clear the uplaods from session when selected value is no', () => {
      req = {
        sessionModel: {
          set: mockFn(),
          get: () => ['upload-details']
        },
        form: {
          values: {
            'test-fiel-name': 'no'
          }
        }
      };

      instance.saveValues(req, res, next);
      expect(req.sessionModel.set).toHaveBeenCalledTimes(1);
      expect(req.sessionModel.set).toHaveBeenCalledWith('upload-test-1', []);
    });

    it('Should not clear the uplaods from session when selected value is not no', () => {
      req = {
        sessionModel: {
          set: mockFn(),
          get: () => ['upload-details']
        },
        form: {
          values: {
            'test-fiel-name': 'yes'
          }
        }
      };

      instance.saveValues(req, res, next);
      expect(req.sessionModel.set).not.toHaveBeenCalled();
    });

    afterEach(() => {
      Base.prototype.saveValues.mockRestore();
    });
  });
});
