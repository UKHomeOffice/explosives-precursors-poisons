module.exports = route => superclass =>
  class extends superclass {
    saveValues(req, res, next) {
      if (route === '/poisons') {
        const regulatedPoisonSelection =
          req.form.values['replace-poisons-option'];

        if (regulatedPoisonSelection === 'yes') {
          return res.redirect(`${req.baseUrl}/select-poisons`);
        }

        if (
          req.sessionModel.get('replace-regulated-explosives-precursors') !==
          'yes'
        ) {
          req.sessionModel.set('noPrecursorPoisonsBackLink', req.originalUrl);
          return res.redirect(`${req.baseUrl}/no-precursors-or-poisons`);
        }

        const changeNameOrAddress =
          req.sessionModel.get('replace-name-options') === 'yes' ||
          req.sessionModel.get('replace-home-address-options') === 'yes';

        if (changeNameOrAddress) {
          return res.redirect(`${req.baseUrl}/countersignatory-details`);
        }

        const noChangeNameOrAddress =
          req.sessionModel.get('replace-name-options') !== 'yes' &&
          req.sessionModel.get('replace-home-address-options') !== 'yes';

        if (noChangeNameOrAddress) {
          return res.redirect(`${req.baseUrl}/confirm`);
        }
      }
      return super.getValues(req, res, next);
    }
  };
