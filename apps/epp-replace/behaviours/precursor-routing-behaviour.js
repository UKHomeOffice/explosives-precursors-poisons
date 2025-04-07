module.exports = superclass =>
  class PrecursorRoutingBehaviour extends superclass {
    successHandler(req, res) {
      const noPrecursors = req.sessionModel.get('replace-no-poisons-precursors-options') === 'no';
      const nameChanged = req.sessionModel.get('replace-name-options') === 'yes';
      const addressChanged = req.sessionModel.get('replace-home-address-options') === 'yes';

      if (noPrecursors) {
        return res.redirect(`${req.baseUrl}/change-substances`);
      }

      if (nameChanged || addressChanged) {
        return res.redirect(`${req.baseUrl}/countersignatory-details`);
      }

      if (!noPrecursors && !nameChanged && !addressChanged) {
        return res.redirect(`${req.baseUrl}/confirm`);
      }

      return res.redirect(`${req.baseUrl}/confirm`);
    }
  };
