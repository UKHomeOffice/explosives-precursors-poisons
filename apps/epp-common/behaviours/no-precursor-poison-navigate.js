/**
 * New & Renew journeys: Navigate to /no-poisons-or-precursors
 * if Regulated poisons and Regulated explosives precursors both selected to no
 */
module.exports = superclass =>
  class extends superclass {
    successHandler(req, res, next) {
      const noPrecursorOrPoison =
        req.sessionModel.get('new-renew-poisons-options') === 'no' &&
        req.sessionModel.get('new-renew-regulated-explosives-precursors-options') ===
          'no';
      if (noPrecursorOrPoison) {
        req.sessionModel.set('noPrecursorOrPoisonBackLink', req.originalUrl);
        return res.redirect(`${req.baseUrl}/no-poisons-or-precursors`);
      }
      return super.successHandler(req, res, next);
    }
  };
