module.exports = superclass =>
  class extends superclass {
    getValues(req, res, next) {
      const selectedAppType = req.sessionModel.get('applicationType');
      if (!selectedAppType) {
        return res.redirect('/application-type');
      }
      return super.getValues(req, res, next);
    }
  };