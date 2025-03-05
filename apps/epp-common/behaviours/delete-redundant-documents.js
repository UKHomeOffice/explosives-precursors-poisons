module.exports = (fieldName, uploadDocs) => superclass =>
  class extends superclass {
    saveValues(req, res, next) {
      const fieldSelectedNo = req.form.values[fieldName] === 'no';
      if (fieldSelectedNo && Array.isArray(uploadDocs)) {
        uploadDocs.forEach(uploadField => {
          const uploadedDocuments = req.sessionModel.get(uploadField);
          if (uploadedDocuments?.length) {
            req.sessionModel.set(uploadField, []);
          }
        });
      }

      return super.saveValues(req, res, next);
    }
  };
