const {
  isDateOlderOrEqualTo,
  isEditMode
} = require('../../../utilities/helpers');
module.exports = (field, redirectTo) => superclass =>
  class extends superclass {
    saveValues(req, res, next) {
      const enteredDob = req.form.values[field];
      if (
        enteredDob &&
        isEditMode(req) &&
        !isDateOlderOrEqualTo(enteredDob, 18)
      ) {
        req.sessionModel.set(field, enteredDob);
        return res.redirect(redirectTo);
      }
      return super.saveValues(req, res, next);
    }
  };
