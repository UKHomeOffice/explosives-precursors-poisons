const CheckChangedDate = require('../../../utilities/helpers/move-date-validator');

module.exports = dobFieldName => superclass =>
  class extends superclass {
    validateField(key, req) {
      req.log('info', `Key value for form is : ${key}`);

      const keysToCheck = [
        'replace-date-new-name-changed',
        'amend-new-date-name-changed',
        'amend-new-date-moved-to-address',
        'new-renew-licence-refused-date',
        'new-renew-offence-date'
      ];

      if (
        keysToCheck.includes(key) &&
        dobFieldName &&
        Object.keys(
          CheckChangedDate.checkIfDateAfterDob(key, req, dobFieldName)
        )?.length > 0
      ) {
        return new this.ValidationError(
          key,
          CheckChangedDate.checkIfDateAfterDob(key, req, dobFieldName)
        );
      }

      req.log('info', 'No validation error');
      return super.validateField(key, req);
    }
  };
