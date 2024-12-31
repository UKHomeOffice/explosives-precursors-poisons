const LicenceValiidator = require('../../../utilities/helpers/index');

module.exports = superclass =>
  class extends superclass {
    saveValues(req, res, next) {
      const licenceNumber = req.form.values['amend-licence-number'];

      if(!LicenceValiidator.validLicenceNumber(licenceNumber)) {
        const errorMessage = `${licenceNumber} licence number not in correct format`;
        req.log('error', errorMessage);
        return next({
          'amend-licence-number': new this.ValidationError(
            'amend-licence-number',
            {
              type: 'incorrect-format-licence'
            }
          )
        });
      }
      req.log('info', 'licence number is in correct format');
      return super.saveValues(req, res, next);
    }
  };
