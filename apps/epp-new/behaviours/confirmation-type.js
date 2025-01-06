const ApplicationHelper = require('../../../utilities/helpers/index');

module.exports = superclass =>
  class extends superclass {
    locals(req, res) {
      const locals = super.locals(req, res);
      const selectedApplicationType = req.form.values['application-type'];

      locals.isRenewRoute = ApplicationHelper.isApplicationType(selectedApplicationType, 'renew');
      req.log('info', `Application type is RENEWAL: ${locals.isRenewRoute}`);
      return locals;
    }
  };
