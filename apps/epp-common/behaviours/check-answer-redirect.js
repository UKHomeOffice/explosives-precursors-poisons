module.exports = (currentField, fieldsArray) => superclass =>
  class extends superclass {
    successHandler(req, res, next) {
      const threeNo = fieldsArray.every(fieldsArrayValue => req.sessionModel.get(fieldsArrayValue) === 'no');
      if (threeNo) {
        return res.redirect(`${req.baseUrl}/no-details-amend`);
      } else if (req.body[currentField] === 'no' && !threeNo && currentField === 'amend-change-substances-options') {
        return res.redirect(`${req.baseUrl}/countersignatory-details`);
      }
      return super.successHandler(req, res, next);
    }
  };
