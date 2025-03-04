module.exports = (currentField, fieldsArray) => superclass =>
  class extends superclass {
    successHandler(req, res, next) {
      const allFieldsNo = fieldsArray.every(fieldsArrayValue => req.sessionModel.get(fieldsArrayValue) === 'no');
      if (allFieldsNo) {
        return res.redirect(`${req.baseUrl}/no-details-amend`);
      }
      return super.successHandler(req, res, next);
    }
  };
