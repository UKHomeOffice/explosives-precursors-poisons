const validators = require('hof/controller/validation/validators');
const moment = require('moment');
const config = require('../../../config');

module.exports = superclass =>
  class extends superclass {
    validateField(key, req) {
      const validationError = (field, type, args) => new this.ValidationError(field, {type: type, arguments: [args]});
      const dateOfBirth = req.sessionModel.get('amend-date-of-birth');
      const dateNameChanged = req.form.values['amend-new-date-name-changed'];

      if(!validators.after(dateNameChanged, dateOfBirth)) {
        return validationError('amend-new-date-name-changed',
          'after',
          [moment(dateOfBirth).format(config.PRETTY_DATE_FORMAT)]);
      }
      return super.validateField(key, req);
    }
  };
