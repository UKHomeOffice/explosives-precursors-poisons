module.exports = superclass =>
  class PrecursorRoutingBehaviour extends superclass {
    successHandler(req, res, next) {
      const noPrecursors = req.sessionModel.get('replace-no-poisons-precursors-options') === 'no';
      const nameChanged = req.sessionModel.get('replace-name-options') === 'yes';
      const addressChanged = req.sessionModel.get('replace-home-address-options') === 'yes';

      if (noPrecursors) {
        return res.redirect(`${req.baseUrl}/change-substances`);
      }

      if (nameChanged || addressChanged) {
        return res.redirect(`${req.baseUrl}/countersignatory-details`);
      }
      return super.successHandler(req, res, next);
    }

    shouldGoToUploadPage(pageName, session) {
      if (!session || !session.application) return false;
      return pageName === 'declaration' && session.application.uploadProofOfHome === true;
    }
  };
