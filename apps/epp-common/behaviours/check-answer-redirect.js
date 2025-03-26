module.exports = (currentField, fieldsArray) => superclass =>
  class extends superclass {
    successHandler(req, res, next) {
      const allFieldsNo = fieldsArray.every(fieldsArrayValue => req.sessionModel.get(fieldsArrayValue) === 'no');
      if (allFieldsNo) {
        req.sessionModel.set('backLinkForRedirect', req.originalUrl);
        if(currentField === 'amend-poisons-option' || currentField === 'amend-regulated-explosives-precursors') {
          return res.redirect(`${req.baseUrl}/no-poisons-or-precursors`);
        }
        return res.redirect(`${req.baseUrl}/no-details-amend`);
      }
      return super.successHandler(req, res, next);
    }
  };
