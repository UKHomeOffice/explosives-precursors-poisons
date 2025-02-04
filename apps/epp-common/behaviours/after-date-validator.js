const CheckChangedDate = require('../../../utilities/helpers/move-date-validator');

module.exports = superclass =>
  class extends superclass {
    validateField(key, req) {
      const amendDobFieldName = 'amend-date-of-birth';
      const amendChangedDateResult = CheckChangedDate.checkBirthDateAfterMoveDate(key, req, amendDobFieldName);

      req.log('info', `Key value for form is : ${key}`);

      if(key === 'amend-new-date-name-changed' &&
         Object.keys(amendChangedDateResult).length !== 0) {
        return new this.ValidationError(key, amendChangedDateResult);
      } else if(key === 'amend-new-date-moved-to-address' &&
              Object.keys(amendChangedDateResult).length !== 0) {
        return new this.ValidationError(key, amendChangedDateResult);
      }

      req.log('info', 'No validation error');
      return super.validateField(key, req);
    }
  };
