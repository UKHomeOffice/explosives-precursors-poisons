module.exports = fields => superclass =>
  class extends superclass {
    successHandler(req, res, next) {
      if (Array.isArray(fields) && fields.length > 0) {
        const fullName = [];
        fields.forEach(field => {
          fullName.push(req.form.values[field]);
        });
        const otherName = fullName.filter(Boolean).join('\n');
        req.sessionModel.set('formattedNewName', otherName);
      }
      return super.successHandler(req, res, next);
    }
  };
