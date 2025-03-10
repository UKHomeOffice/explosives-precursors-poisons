module.exports = superclass =>
  class extends superclass {
    locals(req, res) {
      const locals = super.locals(req, res);
      const isRenewJourney = req.sessionModel.get('isRenewJourney');

      if (locals?.route === 'your-name' && isRenewJourney) {
        const isEditMode = locals.backLink?.endsWith('/edit');
        locals.backLink = isEditMode
          ? '/new-renew/licence-number/edit'
          : '/new-renew/licence-number';
      }
      return locals;
    }
  };
