const isAlpha = str => /^[a-zA-Z]*$/.test(str);

module.exports = superclass =>

  class extends superclass {
    saveValues(req, res, next) {
      const licenceNumber = req.form.values['amend-licence-number'];
      const removeSpaceOrSperator = licenceNumber.replace(/[^\w\s]/gi, '');

      const firstNumericValues = removeSpaceOrSperator.slice(0, 2);
      const alphaValues = removeSpaceOrSperator.slice(2, 3);
      const secondNumericValues = removeSpaceOrSperator.slice(3, 9);
      const thirdNumbericValues = removeSpaceOrSperator.slice(9, 13);

      if((isNaN(firstNumericValues) ||
           isNaN(secondNumericValues) ||
           isNaN(thirdNumbericValues)) ||
            !isAlpha(alphaValues)
      ) {
        const errorMessage = `${licenceNumber} Not in correct format or invalid licence number`;
        req.log('error', errorMessage);
        return next({
          'amend-licence-number': new this.ValidationError(
            'amend-licence-number',
            {
              type: 'correct-licence'
            }
          )
        });
      }
      req.log('info', 'Valid licence number');

      return super.saveValues(req, res, next);
    }
  };
