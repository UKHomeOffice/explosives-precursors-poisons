module.exports = superclass =>
  class extends superclass {
    successHandler(req, res, next) {
      const fields = [
        'replace-home-address-options',
        'replace-explosive-precusor-type',
        'replace-replace-type'
      ];

      const allFieldsNo = fields.every(field => req.sessionModel.get(field) === 'no');


      if (allFieldsNo) {
        req.sessionModel.set('backLinkForRedirect', req.originalUrl);
        return res.redirect(`${req.baseUrl}/confirm`);
      }

      return super.successHandler(req, res, next);
    }
  };
