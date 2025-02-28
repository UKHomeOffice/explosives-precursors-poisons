module.exports = (currentField, fieldsArray) => superclass =>
  class extends superclass {
    successHandler(req, res, next) {
      const allFieldsNo = fieldsArray.every(fieldsArrayValue => req.sessionModel.get(fieldsArrayValue) === 'no');
      if (allFieldsNo) {
        return res.redirect(`${req.baseUrl}/no-details-amend`);
      } else if (req.form.values[currentField] === 'no' && !allFieldsNo
        && currentField === 'amend-change-substances-options') {
        return res.redirect(`${req.baseUrl}/countersignatory-details`);
      }
      return super.successHandler(req, res, next);
    }
  };
