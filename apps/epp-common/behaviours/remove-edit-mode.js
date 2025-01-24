module.exports = superclass =>
  class extends superclass {
    getValues(req, res, next) {
      const isApplicationTypeChanged = req.sessionModel.get(
        'applicationTypeChanged'
      );
      const originalUrl = req.originalUrl;
      req.sessionModel.set('applicationTypeChanged', false);
      if (isApplicationTypeChanged !== false && originalUrl.endsWith('/edit')) {
        req.log('info', 'Application type changed from edit journey');
        const newUrl = originalUrl.replace('/edit', '');
        return res.redirect(newUrl);
      }
      return super.getValues(req, res, next);
    }
  };
