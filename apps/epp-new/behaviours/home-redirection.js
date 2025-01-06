const ApplicationHelper = require('../../../utilities/helpers/index');
module.exports = superclass =>
  class extends superclass {
    getValues(req, res, next) {
      const selectedAppType = req.sessionModel.get('applicationType');
      if (!selectedAppType) {
        return res.redirect('/application-type');
      }
      return super.getValues(req, res, next);
    }

    locals(req, res) {
      const locals = super.locals(req, res);
      const selectedApplicationType = req.form.values['application-type'];

      locals.isRenewRoute = ApplicationHelper.isApplicationType(selectedApplicationType, 'renew');

      req.log('info', `Application type is RENEWAL: ${locals.isRenewRoute}`);
      return locals;
    }
  };
