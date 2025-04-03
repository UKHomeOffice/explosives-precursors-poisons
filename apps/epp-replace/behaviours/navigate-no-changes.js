module.exports = superclass =>
  class extends superclass {
    successHandler(req, res, next) {
      const fields = [
        'replace-home-address-options',
        'replace-replace-type',
        'replace-change-substances'
      ];

      const allFieldsNo = fields.every(field => req.sessionModel.get(field) === 'no');


      if (allFieldsNo) {
        return res.redirect(`${req.baseUrl}/confirm`);
      }

      return super.successHandler(req, res, next);
    }
  };
