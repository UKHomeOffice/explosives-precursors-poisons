module.exports = superclass =>
  class extends superclass {
    saveValues(req, res, next) {
      const previousSelection = req.sessionModel.get('applicationType');
      const applicationType = req.form.values['application-type'];

      let applicationTypeChanged = false;
      if (previousSelection && previousSelection !== applicationType) {
        req.log(
          'info',
          'Resetting form data due to new application type selection'
        );

        const existingSession =
          req.sessionModel.options.session['hof-wizard-EPP form'];
        req.sessionModel.options.session['hof-wizard-EPP form'] = {
          'csrf-secret': existingSession['csrf-secret']
        };
        applicationTypeChanged = true;
      }

      req.sessionModel.set('applicationType', applicationType);
      const isRenewJourney = applicationType === 'renew';
      const isNewJourney = applicationType === 'new';
      req.sessionModel.set('isRenewJourney', isRenewJourney);
      req.sessionModel.set('isNewJourney', isNewJourney);
      req.sessionModel.set('applicationTypeChanged', applicationTypeChanged);
      return super.saveValues(req, res, next);
    }
  };
