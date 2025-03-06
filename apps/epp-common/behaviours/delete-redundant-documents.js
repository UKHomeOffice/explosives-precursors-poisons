/**
 * Responsible for removing uploaded documents
 * from the session when the related or dependent form field changes from 'yes' to 'no'
 *
 * @param {string} fieldName - The name of the form field to check.
 * @param {string[]} uploadDocs - An array of field names representing uploaded documents.
 * @returns {Function} - Returns a new class extending the superclass.
 */

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
