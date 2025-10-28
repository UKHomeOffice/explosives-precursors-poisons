'use strict';

const { getSubstanceShortLabel } = require('../../../utilities/helpers');

module.exports = (fieldName, aggregatorKey, errorPagePath) => {
  return superclass =>
    class extends superclass {
      saveValues(req, res, next) {
        const previouslySelectedSubstances = req.sessionModel.get(aggregatorKey)?.aggregatedValues;

        if (previouslySelectedSubstances && previouslySelectedSubstances.length) {
          const previouslySelectedTitles = previouslySelectedSubstances.map(substance => substance.longTitle);
          const currentSelection = req.form.values[fieldName];

          if (previouslySelectedTitles.includes(currentSelection)) {
            const currentSelectionShortName = getSubstanceShortLabel(
              currentSelection,
              fieldName === 'precursor-field' ? 'precursor' : 'poison'
            );

            req.sessionModel.set('alreadySelectedSubstance', currentSelectionShortName.toLowerCase());
            return res.redirect(errorPagePath);
          }
        }

        return super.saveValues(req, res, next);
      }
    };
};
