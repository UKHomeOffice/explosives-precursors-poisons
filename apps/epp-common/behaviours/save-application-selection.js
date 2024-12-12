module.exports = superclass =>
  class extends superclass {
    saveValues(req, res, next) {
      const applicationType = req.form.values['application-type'];
      req.sessionModel.set('applicationType', applicationType);
      const isRenewJourney = applicationType === 'renew';
      const isNewJourney = applicationType === 'new';
      req.sessionModel.set('isRenewJourney', isRenewJourney);
      req.sessionModel.set('isNewJourney', isNewJourney);
      return super.saveValues(req, res, next);
    }
  };
