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
      return super.saveValues(req, res, next);
    }
  };
