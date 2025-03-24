const { getPoisonShortLabel } = require('../../../utilities/helpers');

/**
 * @param {string} fieldName - The field name used on the select precursor page
 */
module.exports = fieldName => superclass =>
  class extends superclass {
    getValues(req, res, next) {
      const selectedPoison = req.sessionModel.get(fieldName);
      const whyNeedPoisonLabel = getPoisonShortLabel(
        `Why do you need ${selectedPoison}`
      );
      const whereToStorePoisonLegend = getPoisonShortLabel(
        `Where will you store the ${selectedPoison}`
      );
      const whereToUsePoisonLegend = getPoisonShortLabel(
        `Where will you use the ${selectedPoison}`
      );
      const storePoisonOtherAddressLabel = getPoisonShortLabel(
        `Storage address for the ${selectedPoison}`
      );
      const usePoisonOtherAddressLabel = getPoisonShortLabel(
        `Usage address for the ${selectedPoison}`
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
