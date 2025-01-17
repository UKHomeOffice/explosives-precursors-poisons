const validators = require('hof/controller/validation/validators');
const moment = require('moment');
const config = require('../../config');

const checkBirthDateAfterMoveDate = (key, req, birthDateField) => {
  const dateOfBirth = req.sessionModel.get(birthDateField);
  const dateNameChanged = req.form.values[key];

  if(!validators.after(dateNameChanged, dateOfBirth)) {
    return {
      type: 'after',
      arguments: [moment(dateOfBirth).format(config.PRETTY_DATE_FORMAT)]
    };
  }
  return {};
};


module.exports = {
  checkBirthDateAfterMoveDate
};
