const {
  isDateOlderOrEqualTo
} = require('../../../utilities/helpers');

/**
 * @param {string} field - The field name whose value need to be validated and saved
 * @param {string} redirectTo - The path to redirect to if the conditions are met
 */
module.exports = (field, redirectTo) => superclass =>
  class extends superclass {
    successHandler(req, res, next) {
      const enteredDob = req.sessionModel.get(field);
      if (enteredDob && !isDateOlderOrEqualTo(enteredDob, 18)) {
        return res.redirect(req.baseUrl + redirectTo);
      }
      return super.successHandler(req, res, next);
    }
  };
