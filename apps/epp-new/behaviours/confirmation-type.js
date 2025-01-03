module.exports = superclass =>
  class extends superclass {
    locals(req, res) {
      const locals = super.locals(req, res);
      const applicationType = req.form.values['application-type'];
      (applicationType === 'renew') ? locals.isRenewRoute = true : locals.isRenewRoute = false;
      req.log('info', `Application type is RENEWAL: ${locals.isRenewRoute}`);
      return locals;
    }
  };
