const {
  PATH_NEW_RENEW,
  PATH_AMEND,
  PATH_REPLACE,
  STR_APPLICATION_TYPE
} = require('../../../utilities/constants/string-constants');

module.exports = superclass =>
  class extends superclass {
    getValues(req, res, next) {
      const selectedApplicationType = req.sessionModel.get(STR_APPLICATION_TYPE);
      const expectedUrlMapping = {
        new: PATH_NEW_RENEW,
        renew: PATH_NEW_RENEW,
        amend: PATH_AMEND,
        replace: PATH_REPLACE
      };

      if (
        expectedUrlMapping[selectedApplicationType] &&
        req.baseUrl !== expectedUrlMapping[selectedApplicationType]
      ) {
        throw new Error(
          'Selected application type does not match with the URL'
        );
      }

      return super.getValues(req, res, next);
    }
  };
