module.exports = route => superclass =>
  class extends superclass {
    successHandler(req, res, next) {
      if (
        route === '/poisons' &&
        req.sessionModel.get('replace-poisons-option') === 'no'
      ) {
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
      return super.successHandler(req, res, next);
    }
  };
