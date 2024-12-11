module.exports = superclass =>
  class extends superclass {
    locals(req, res) {
      const isRenewJourney = req.sessionModel.get('isRenewJourney');
      const locals = super.locals(req, res);
      if (isRenewJourney && locals.captionHeading) {
        const captionHeading = locals.captionHeading;
        const sectionNumbers = captionHeading.match(/\d+/g);
        if (sectionNumbers?.length === 2) {
          const currentSection = Number(sectionNumbers[0]);
          const totalSections = Number(sectionNumbers[1]);

          const updatedCurrentSection = currentSection + 1;
          const updatedTotalSections = totalSections + 1;
          const updatedCaptionHeading = `Section ${updatedCurrentSection} of ${updatedTotalSections}`;
          locals.captionHeading = updatedCaptionHeading;
        }
      }

      return locals;
    }
  };
