const {
  SUBSTANCES: { POISON }
} = require('../../../utilities/constants/string-constants');
const { getSubstanceShortLabel } = require('../../../utilities/helpers');

/**
 * @param {string} fieldName - The field name used on the select precursor page
 */
module.exports = fieldName => superclass =>
  class extends superclass {
    locals(req, res) {
      const locals = super.locals(req, res);
      const selectedPoisonValue = req.sessionModel.get('poison-field') ?? '';
      locals.header = selectedPoisonValue;
      locals.title = selectedPoisonValue;
      return locals;
    }

    getValues(req, res, next) {
      const selectedPoison = req.sessionModel.get(fieldName);
      const whyNeedPoisonLabel = getSubstanceShortLabel(
        `Why do you need ${selectedPoison}`,
        POISON
      );
      const whereToStorePoisonLegend = getSubstanceShortLabel(
        `Where will you store the ${selectedPoison}`,
        POISON
      );
      const whereToUsePoisonLegend = getSubstanceShortLabel(
        `Where will you use the ${selectedPoison}`,
        POISON
      );
      const storePoisonOtherAddressLabel = getSubstanceShortLabel(
        `Storage address for the ${selectedPoison}`,
        POISON
      );
      const usePoisonOtherAddressLabel = getSubstanceShortLabel(
        `Usage address for the ${selectedPoison}`,
        POISON
      );

      const labelValuesMap = {
        whyNeedPoisonLabel: whyNeedPoisonLabel,
        whereToStorePoisonLegend: whereToStorePoisonLegend,
        whereToUsePoisonLegend: whereToUsePoisonLegend,
        storePoisonOtherAddressLabel: storePoisonOtherAddressLabel,
        usePoisonOtherAddressLabel: usePoisonOtherAddressLabel
      };

      Object.entries(labelValuesMap).forEach(([key, value]) => {
        req.sessionModel.set(key, value);
      });

      return super.getValues(req, res, next);
    }
  };
