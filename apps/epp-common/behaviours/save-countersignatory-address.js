module.exports = fields => superclass =>
  class extends superclass {
    saveValues(req, res, next) {
      if (Array.isArray(fields) && fields.length > 0) {
        const fullAddress = [];
        fields.forEach(field => {
          fullAddress.push(req.form.values[field]);
        });
        const address = fullAddress.filter(Boolean).join(', ');
        req.sessionModel.set('counterSignatoryAddress', address);
      }

      return super.saveValues(req, res, next);
    }
  };
