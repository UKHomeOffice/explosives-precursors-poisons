module.exports = superclass =>
  class extends superclass {
    successHandler(req, res, next) {
      const applicationType = req.form.values['application-type'];

      if (applicationType === 'new') {
        return res.redirect('/your-name');
      }

      if (applicationType === 'renew') {
        return res.redirect('/enter-license-number');
      }

      return super.successHandler(req, res, next);
    }
  };
