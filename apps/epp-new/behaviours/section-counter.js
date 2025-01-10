const { totalStepsNew, totalStepsRenew } = require('../../../config').sectionDetails;

module.exports = superclass =>
  class extends superclass {
    locals(req, res) {
      const locals = super.locals(req, res);
      if (locals?.sectionNo) {
        const isRenewJourney = req.sessionModel.get('isRenewJourney');
        const currentSection = isRenewJourney
          ? locals.sectionNo.renew
          : locals.sectionNo.new;
        const totalSections = isRenewJourney ? totalStepsRenew : totalStepsNew;
        const captionHeading = `Section ${currentSection} of ${totalSections}`;
        locals.captionHeading = captionHeading;
      }

      return locals;
    }
  };
