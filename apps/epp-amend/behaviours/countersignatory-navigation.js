module.exports = currentRoute => superclass =>
  class extends superclass {
    saveValues(req, res, next) {
      const amendNameOrAddress =
        req.sessionModel.get('amend-name-options') === 'yes' ||
        req.sessionModel.get('amend-home-address-options') === 'yes';

      const noAmendNameOrAddress =
        req.sessionModel.get('amend-name-options') !== 'yes' &&
        req.sessionModel.get('amend-home-address-options') !== 'yes';

      const redirectToCountersignatory = () =>
        res.redirect('/amend/countersignatory-details');
      const redirectNoPoisonsOrPrecursors = () =>
        res.redirect('/amend/no-poisons-or-precursors');
      const redirectNoDetailsAmend = () =>
        res.redirect('/amend/no-details-amend');

      if (
        currentRoute === '/poisons' &&
        req.form.values['amend-poisons-option'] === 'no'
      ) {
        if (amendNameOrAddress) {
          return redirectToCountersignatory();
        }
        if (
          noAmendNameOrAddress &&
          req.sessionModel.get('amend-regulated-explosives-precursors') !==
            'yes'
        ) {
          return redirectNoPoisonsOrPrecursors();
        }
      }

      if (currentRoute === '/poison-summary' && amendNameOrAddress) {
        return redirectToCountersignatory();
      }

      if (
        currentRoute === '/no-poisons-or-precursors' &&
        req.form.values['amend-no-poisons-precursors-options'] === 'yes'
      ) {
        if (amendNameOrAddress) {
          return redirectToCountersignatory();
        }
        if (noAmendNameOrAddress) {
          return redirectNoDetailsAmend();
        }
      }

      return super.saveValues(req, res, next);
    }
  };
