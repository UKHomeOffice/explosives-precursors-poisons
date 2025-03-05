const proxyquire = require('proxyquire');

describe('uploaded-files-counter tests', () => {
  let req;
  let res;
  let superclass;
  let instance;
  let uploadFilesCounter;

  beforeEach(() => {
    req = {
      sessionModel: {
        get: sinon.stub(),
        set: sinon.stub()
      },
      form: {
        values: {}
      },
      app: {
        config: {
          upload: {
            documentCategories: {
              testUploadDoc: {
                limit: 1
              }
            }
          }
        }
      }
    };

    res = {};
    superclass = class {
      locals() {
        return {};
      }
    };

    uploadFilesCounter = proxyquire(
      '../../../apps/epp-common/behaviours/uploaded-files-counter',
      {
        '../../../config': {
          upload: req.app.config.upload
        }
      }
    );

    instance = new (uploadFilesCounter('testUploadDoc')(superclass))();
  });

  it('should set the counter if the limit is more than 1', () => {
    req.app.config.upload.documentCategories.testUploadDoc.limit = 2;
    const locals = instance.locals(req, res);
    expect(locals.requiredDocsCount).to.equal(2);
  });

  it('should not set the counter if the limit is less than 2', () => {
    req.app.config.upload.documentCategories.testUploadDoc.limit = 1;
    const locals = instance.locals(req, res);
    expect(locals.requiredDocsCount).to.be.undefined;
  });
});
