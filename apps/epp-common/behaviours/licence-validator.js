const ApplicationHelper = require('../../../utilities/helpers/index');

module.exports = superclass =>
  class extends superclass {
    saveValues(req, res, next) {
      const checkLicenceResult = ApplicationHelper.isLicenceValid(req);
      
      const fieldName = checkLicenceResult.fieldName;
      
      if(!checkLicenceResult.isValid) {
        return next({
          [`${fieldName}`]: new this.ValidationError(
                fieldName,
                {
                  type: checkLicenceResult.errorType
                }
              )
        });
        
      }
      return super.saveValues(req, res, next);
    }
  };
