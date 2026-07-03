const SaveDocumentBehaviour = require('../../../apps/epp-common/behaviours/save-document');
('use strict');
const reqres = require('hof').utils.reqres;

describe('Test for Save Document Behaviour', () => {
  class Base {
    process() {}
    locals() {}
    saveValues() {}
  }

  let req;
  let res;
  let next;

  let instance;

  const doc = {
    document: {
      name: 'test.pdf',
      encoding: '7bit',
      mimetype: 'pdf',
      truncated: false,
      size: 123456
    }
  };

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    req.files = doc;
  });

  describe('Process file tests', () => {
    beforeAll(() => {
      mockSpyOn(Base.prototype, 'process');
      instance = new (SaveDocumentBehaviour(
        'documentName',
        'file-upload'
      )(Base))();
    });

    it('should be called ', () => {
      instance.process(req);
      expect(Base.prototype.process).toHaveBeenCalled();
    });

    it('Should attach the given file', () => {
      req.files = doc;
      instance.process(req);
      expect(req.files).toEqual(doc);
    });

    afterAll(() => {
      Base.prototype.process.mockRestore();
    });
  });

  describe('Save file locals tests', () => {
    beforeAll(() => {
      mockSpyOn(Base.prototype, 'locals').mockReturnValue(req, res, next);
      instance = new (SaveDocumentBehaviour(
        'documentName',
        'file-upload'
      )(Base))();
    });

    it('init - locals', () => {
      req.form.errors = {};
      instance.locals(req, res, next);
      expect(Base.prototype.locals).toHaveBeenCalled();
    });
  });

  describe('Save values tests', () => {
    beforeAll(() => {
      mockSpyOn(Base.prototype, 'saveValues').mockReturnValue(req, res, next);
      instance = new (SaveDocumentBehaviour(
        'documentName',
        'file-upload'
      )(Base))();
    });

    it('init - saveValues', () => {
      instance.saveValues(req, res, next);
      expect(Base.prototype.saveValues).toHaveBeenCalledTimes(1);
    });

    it('Should save the file in the session model', () => {
      req.sessionModel.set('documentName', doc);
      instance.saveValues(req, res, next);
      const sessionModel = req.sessionModel.get('documentName');
      expect(sessionModel.document.name).toEqual('test.pdf');
    });

    it('should redirect to current route after upload', () => {
      req.form.options.route = '/test-route';
      req.sessionModel.set('documentName', doc);
      instance.saveValues(req, res, next);
      expect(req.form.options.route).toEqual('/test-route');
    });

    afterAll(() => {
      Base.prototype.saveValues.mockRestore();
    });
  });
});
