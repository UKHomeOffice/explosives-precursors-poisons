'use strict';
const RemoveDocumentBehaviour = require('../../../apps/epp-common/behaviours/remove-document');
const reqres = require('hof').utils.reqres;

describe('Tests for Remove Document Behaviour', () => {
  class Base {
    constructor() {}
    configure() {}
  }

  let req;
  let res;
  let instance;
  const next = 'unit-test';

  const documents = [
    {
      name: 'test.pdf',
      mimetype: 'application/pdf',
      id: 'doc1',
      url: 'http:/s3-url'
    }
  ];

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
  });
  describe('Configure tests', () => {
    beforeEach(() => {
      mockSpyOn(Base.prototype, 'configure').mockReturnValue(req, res, next);
      instance = new (RemoveDocumentBehaviour('passport')(Base))();
    });

    it('init - configure', () => {
      instance.configure(req, res, next);
      expect(Base.prototype.configure).toHaveBeenCalled();
      expect(req.sessionModel.get('passport'));
    });

    it('Should remove the given document', () => {
      req.sessionModel.set('passport', documents);
      req.query.delete = documents[0].id;
      instance.configure(req, res, next);
      const remainingDocs = req.sessionModel.get('passport');
      remainingDocs.map(image => {
        expect(image.id).not.toBe(documents[0].id);
      });
    });

    it('Should redirect after removing the document', () => {
      req.sessionModel.set('passport', documents);
      req.query.delete = documents[0].id;
      instance.configure(req, res, next);
      expect(res.redirect.called).toBe(true);
    });
    afterEach(() => {
      Base.prototype.configure.mockRestore();
    });
  });
});
