const { totalStepsNew, totalStepsRenew } = require('../../../config').sectionDetails;

module.exports = superclass =>
  class extends superclass {
    locals(req, res) {
      const locals = super.locals(req, res);
      if (locals?.sectionNo) {
        const isRenewJourney = req.sessionModel.get('isRenewJourney');
        // Increment the sectionNo globally
        const sectionNo = {
          new: locals.sectionNo.new + 1,
          renew: locals.sectionNo.renew + 1
        };
        const currentSection = isRenewJourney ? sectionNo.renew : sectionNo.new;
        const totalSections = isRenewJourney ? totalStepsRenew : totalStepsNew;
        const captionHeading = `Section ${currentSection} of ${totalSections}`;
        locals.captionHeading = captionHeading;
      }

      return locals;
    }
  };
