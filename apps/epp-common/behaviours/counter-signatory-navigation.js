module.exports = route => superclass =>
  class extends superclass {
    saveValues(req, res, next) {
      if (
        route === '/poison-summary' &&
        (req.sessionModel.get('replace-name-options') === 'yes' ||
          req.sessionModel.get('replace-home-address-options') === 'yes')
      ) {
        return res.redirect('/replace/countersignatory-details');
      }

      if (route === '/no-precursors-or-poisons' && req.form.values['replace-no-poisons-precursors-options'] === 'yes') {
        if (
          req.sessionModel.get('replace-name-options') === 'yes' ||
          req.sessionModel.get('replace-home-address-options') === 'yes'
        ) {
          return res.redirect('/replace/countersignatory-details');
        }
        if(
          req.sessionModel.get('replace-name-options') === 'no' &&
          req.sessionModel.get('replace-home-address-options') === 'no'
        ) {
          return res.redirect('/replace/confirm');
        }
      }

      return super.saveValues(req, res, next);
    }
  };
