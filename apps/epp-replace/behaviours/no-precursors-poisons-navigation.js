module.exports = superclass =>
  class extends superclass {
    successHandler(req, res, next) {
      if (
        req.sessionModel.get('replace-no-poisons-precursors-options') === 'no'
      ) {
        return res.redirect(`${req.baseUrl}/change-substances`);
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

      return super.successHandler(req, res, next);
    }
  };
