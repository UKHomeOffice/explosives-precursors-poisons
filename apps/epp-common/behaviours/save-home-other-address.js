module.exports = (fields, type) => superclass =>
  class extends superclass {
    saveValues(req, res, next) {
      if (Array.isArray(fields) && fields.length > 0) {
        const fullAddress = [];
        fields.forEach(field => {
          fullAddress.push(req.form.values[field]);
        });
        const address = fullAddress.filter(Boolean).join(', ');
        if (type === 'home') {
          req.sessionModel.set('homeAddressInline', address);
        } else {
          req.sessionModel.set('otherAddressInline', address);
        }
      }

      return super.saveValues(req, res, next);
    }
  };
