const DeleteRedundantDocuments = require('../../../apps/epp-common/behaviours/delete-redundant-documents');

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
      sinon.stub(Base.prototype, 'saveValues').returns(req, res, next);
      instance = new (DeleteRedundantDocuments('test-fiel-name', [
        'upload-test-1'
      ])(Base))();
    });

    it('init - saveValues', () => {
      instance.saveValues(req, res, next);
      expect(Base.prototype.saveValues).to.have.been.called;
    });

    it('Should clear the uplaods from session when selected value is no', () => {
      req = {
        sessionModel: {
          set: sinon.spy(),
          get: () => ['upload-details']
        },
        form: {
          values: {
            'test-fiel-name': 'no'
          }
        }
      };

      instance.saveValues(req, res, next);
      expect(req.sessionModel.set.calledOnce).to.be.true;
      expect(req.sessionModel.set.calledWith('upload-test-1', [])).to.be.true;
    });

    it('Should not clear the uplaods from session when selected value is not no', () => {
      req = {
        sessionModel: {
          set: sinon.spy(),
          get: () => ['upload-details']
        },
        form: {
          values: {
            'test-fiel-name': 'yes'
          }
        }
      };

      instance.saveValues(req, res, next);
      expect(req.sessionModel.set.calledOnce).to.be.false;
    });

    afterEach(() => {
      Base.prototype.saveValues.restore();
    });
  });
});
