module.exports = superclass =>
  class extends superclass {
    getValues(req, res, next) {
      const selectedApplicationType = req.sessionModel.get('applicationType');
      const expectedUrlMapping = {
        new: '/new-renew',
        renew: '/new-renew',
        amend: '/amend',
        replace: '/replace'
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
