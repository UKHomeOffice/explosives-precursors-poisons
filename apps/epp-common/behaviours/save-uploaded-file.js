'use strict';

const _ = require('lodash');
const config = require('../../../config');
const Model = require('../models/file-upload');
const fileSizeNum = size => size.match(/\d+/g)[0];

module.exports = (documentName, fieldName) => superclass => class extends superclass {
  process(req) {
    if (req.files && req.files[fieldName]) {
      // set image name on values for filename extension validation
      // N:B validation controller gets values from
      // req.form.values and not on req.files

      req.form.values[fieldName] = req.files[fieldName].name;
      req.log('info', `Processing image: ${req.form.values[fieldName]}`);
    }
    super.process.apply(this, arguments);
  }

  locals(req, res, next) {
    const maxNum = fileSizeNum(config.upload.maxFileSize);
    const maxSize = config.upload.maxFileSize.match(/[a-zA-Z]+/g)[0].toUpperCase();

    return Object.assign({}, super.locals(req, res, next), {
      maxFileSize: `${maxNum} ${maxSize}`
    });
  }

  validateField(key, req) {
    if (req.body['upload-file']) {
      const fileUpload = _.get(req.files, `${fieldName}`);

      if (fileUpload) {
        const uploadSize = fileUpload.size;
        const mimetype = fileUpload.mimetype;
        const uploadSizeTooBig = uploadSize > (fileSizeNum(config.upload.maxFileSize) * 1000000);
        const uploadSizeBeyondServerLimits = uploadSize === null;
        const invalidMimetype = !config.upload.allowedMimeTypes.includes(mimetype);
        const invalidSize = uploadSizeTooBig || uploadSizeBeyondServerLimits;

        if (invalidSize || invalidMimetype) {
          return new this.ValidationError(fieldName, {
            type: invalidSize ? 'maxFileSize' : 'fileType',
            redirect: undefined
          });
        }
      } else {
        return new this.ValidationError(fieldName, {
          type: 'required',
          redirect: undefined
        });
      }
    } else if (req.sessionModel.get(documentName) === undefined || req.sessionModel.get(documentName).length === 0) {
      return new this.ValidationError(fieldName, {
        type: 'required',
        redirect: undefined
      });
    }
    return super.validateField(key, req);
  }

  saveValues(req, res, next) {
    if (req.body['upload-file']) {
      if (req.files && req.files[fieldName]) {
        req.log('info', `Reference: ${req.sessionModel.get('reference')}, Saving image: ${req.files[fieldName].name}`);
        const image = _.pick(req.files[fieldName], ['name', 'data', 'mimetype']);
        const model = new Model(image);
        return model.save()
          .then(() => {
            if (req.files && req.files[fieldName]) { req.sessionModel.set(documentName, [model.toJSON()]); }

            // if (req.form.options.route === '/upload-photo') {
            //   res.redirect('/asc/upload-photo');
            // }
            return super.saveValues(req, res, next);
          })
          .catch(next);
      }
    }
    return super.saveValues.apply(this, arguments);
  }
};
