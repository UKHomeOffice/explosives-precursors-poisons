const LicenceValiidator = require('../../../utilities/helpers/index');

module.exports = superclass =>
  class extends superclass {
    saveValues(req, res, next) {
      const licenceNumber = req.form.values['new-renew-licence-number'];
      const removeSpaceOrSperator = licenceNumber.replace(/[^\w\s]/gi, '');
      const alphaValues = removeSpaceOrSperator.slice(2, 3);

      if(licenceNumber.length > 16 || licenceNumber.length < 13 ) {
        const errorMessage = 'Licence number should not be greater than 16 or less than 13';
        req.log('error', errorMessage);
        return next({
          'new-renew-licence-number': new this.ValidationError(
            'new-renew-licence-number',
            {
              type: 'licence-length-restriction'
            }
          )
        });
      }

      if(!LicenceValiidator.validLicenceNumber(licenceNumber) ||
       !LicenceValiidator.isAlpha(alphaValues)) {
        const errorMessage = `${licenceNumber} licence number not in correct format`;
        req.log('error', errorMessage);
        return next({
          'new-renew-licence-number': new this.ValidationError(
            'new-renew-licence-number',
            {
              type: 'incorrect-format-licence'
            }
          )
        });
      }
      req.log('info', 'Renew licence number is in correct format');
      return super.saveValues(req, res, next);
    }
  };
