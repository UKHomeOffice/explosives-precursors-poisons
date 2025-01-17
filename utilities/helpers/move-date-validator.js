const validators = require('hof/controller/validation/validators');
const moment = require('moment');
const config = require('../../config');

const checkBirthDateAfterMoveDate = (key, req, birthDateField) => {
  const dateOfBirth = req.sessionModel.get(birthDateField);
  const dateChanged = req.form.values[key];

  if(!validators.after(dateChanged, dateOfBirth)) {
    req.log('error', `Validation error ${dateChanged} should be after ${dateOfBirth}`);
    return {
      type: 'after',
      arguments: [moment(dateOfBirth).format(config.PRETTY_DATE_FORMAT)]
    };
  }
  req.log('info', 'No Validation error');
  return {};
};


module.exports = {
  checkBirthDateAfterMoveDate
};
