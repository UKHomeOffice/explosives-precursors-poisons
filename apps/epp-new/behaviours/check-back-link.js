module.exports = superclass =>
  class extends superclass {
    locals(req, res) {
      const locals = super.locals(req, res);
      const isRenewJourney = req.sessionModel.get('isRenewJourney');
      if (locals?.route === 'your-name' && isRenewJourney) {
        locals.backLink = '/new-and-renew/licence-number';
      }
      return locals;
    }
  };
