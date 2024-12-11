module.exports = superclass =>
  class extends superclass {
    saveValues(req, res, next) {
      const applicationType = req.form.values['application-type'];
      req.sessionModel.set('applicationType', applicationType);
      const isRenewJourney = applicationType === 'renew';
      req.sessionModel.set('isRenewJourney', isRenewJourney);
      return super.saveValues(req, res, next);
    }
  };
