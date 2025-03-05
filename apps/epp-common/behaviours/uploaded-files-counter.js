const { upload } = require('../../../config');

module.exports = documentName => superclass =>
  class extends superclass {
    locals(req, res) {
      const locals = super.locals(req, res);
      const documentCategoryConfig = upload.documentCategories[documentName];
      if (documentCategoryConfig?.limit >= 2) {
        locals.requiredDocsCount = documentCategoryConfig.limit;
      }

      return locals;
    }
  };
