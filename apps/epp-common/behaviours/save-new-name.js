const { getFormattedDate } = require('../../../utilities/helpers');
module.exports = fields => superclass =>
  class extends superclass {
    successHandler(req, res, next) {
      const dateFields = [
        'amend-new-date-name-changed',
        'replace-date-new-name-changed'
      ];
      if (Array.isArray(fields) && fields.length > 0) {
        const fullName = [];
        fields.forEach(field => {
          if (dateFields.includes(field) && req.form.values[field]) {
            fullName.push(getFormattedDate(req.form.values[field]));
          } else {
            fullName.push(req.form.values[field]);
          }
        });
        const otherName = fullName.filter(Boolean).join('\n');
        req.sessionModel.set('formattedNewName', otherName);
      }
      return super.successHandler(req, res, next);
    }
  };
