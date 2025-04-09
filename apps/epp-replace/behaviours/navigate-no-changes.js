module.exports = currentField => superclass =>
  class extends superclass {
    successHandler(req, res, next) {
      const fields = [
        'replace-home-address-options',
        'replace-replace-type',
        'replace-change-substances'
      ];

      const allFieldsNo = fields.every(field => req.sessionModel.get(field) === 'no');

      if (allFieldsNo) {
        if(currentField === 'replace-poisons-option' || currentField === 'replace-regulated-explosives-precursors') {
          return res.redirect(`${req.baseUrl}/no-precursors-or-poisons`);
        }
        return res.redirect(`${req.baseUrl}/confirm`);
      }

      return super.successHandler(req, res, next);
    }
  };
