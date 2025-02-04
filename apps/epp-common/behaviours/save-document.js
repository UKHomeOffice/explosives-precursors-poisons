'use strict';

const config = require('../../../config');
const Model = require('../models/file-upload');

const sanitiseFilename = filename =>
  filename?.replace(/^(.{2}).*(.{2}\.[^.]+)$/, '$1**REDACTED**$2');

module.exports = (documentName, fieldName) => superclass =>
  class extends superclass {
    process(req) {
      if (req.files && req.files[fieldName]) {
        req.form.values[fieldName] = req.files[fieldName].name;
        req.log(
          'info',
          `Processing field ${fieldName} with value: ${sanitiseFilename(
            req.files[fieldName].name
          )}`
        );
      }
      super.process.apply(this, arguments);
    }

    validateField(key, req) {
      const fileToBeValidated = req.files[fieldName];
      const documentsByCategory = req.sessionModel.get(documentName) || [];
      const validationErrorFunc = (type, args) =>
        new this.ValidationError(key, { type: type, arguments: [args] });

      // To check required type, when trying to do continue without upload
      if (req.body.requireFileUpload && documentsByCategory.length === 0) {
        return validationErrorFunc('required');
      } else if (fileToBeValidated) {
        const uploadSize = fileToBeValidated.size;
        const mimetype = fileToBeValidated.mimetype;
        const uploadSizeTooBig = uploadSize > config.upload.maxFileSizeInBytes;
        const uploadSizeBeyondServerLimits = fileToBeValidated.truncated;

        const invalidSize = uploadSizeTooBig || uploadSizeBeyondServerLimits;
        const invalidMimetype =
          !config.upload.allowedMimeTypes.includes(mimetype);

        if (invalidSize) {
          return validationErrorFunc('maxFileSize');
        }
        if (invalidMimetype) {
          return validationErrorFunc('fileType');
        }
      }
      return super.validateField(key, req);
    }

    async saveValues(req, res, next) {
      if (req.files[fieldName]) {
        req.log(
          'info',
          `Saving document: ${sanitiseFilename(
            req.files[fieldName].name
          )} in ${documentName} category`
        );
        const document = {
          name: req.files[fieldName].name,
          data: req.files[fieldName].data,
          mimetype: req.files[fieldName].mimetype
        };
        const model = new Model(document);

        try {
          await model.save();
          req.sessionModel.set(documentName, [model.toJSON()]);
          return res.redirect(`${req.baseUrl}${req.path}`);
        } catch (error) {
          return next(new Error(`Failed to save document: ${error}`));
        }
      }
      return super.saveValues.apply(this, arguments);
    }
  };
