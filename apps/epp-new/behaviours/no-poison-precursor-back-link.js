module.exports = superclass =>
  class extends superclass {
    locals(req, res) {
      const locals = super.locals(req, res);
      locals.backLink = req.sessionModel.get('noPrecursorOrPoisonBackLink');
      return locals;
    }
  };
