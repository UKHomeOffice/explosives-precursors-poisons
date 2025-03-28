const { getSubstanceShortLabel } = require('../../../utilities/helpers');
const {
  SUBSTANCES: { PRECURSOR }
} = require('../../../utilities/constants/string-constants');

/**
 * @param {string} fieldName - The field name used on the select precursor page
 */
module.exports = fieldName => superclass =>
  class extends superclass {
    getValues(req, res, next) {
      const selectedPrecursor = req.sessionModel.get(fieldName);
      const whyNeedPrecursorLabel = getSubstanceShortLabel(
        `Why do you need ${selectedPrecursor}`, PRECURSOR
      );
      const whereToStorePrecursorLegend = getSubstanceShortLabel(
        `Where will you store the ${selectedPrecursor}`, PRECURSOR
      );
      const whereToUsePrecursorLegend = getSubstanceShortLabel(
        `Where will you use the ${selectedPrecursor}`, PRECURSOR
      );
      const storePrecursorOtherAddressLabel = getSubstanceShortLabel(
        `Storage address for the ${selectedPrecursor}`, PRECURSOR
      );
      const usePrecursorOtherAddressLabel = getSubstanceShortLabel(
        `Usage address for the ${selectedPrecursor}`, PRECURSOR
      );

      const labelValuesMap = {
        whyNeedPrecursorLabel: whyNeedPrecursorLabel,
        whereToStorePrecursorLegend: whereToStorePrecursorLegend,
        whereToUsePrecursorLegend: whereToUsePrecursorLegend,
        storePrecursorOtherAddressLabel: storePrecursorOtherAddressLabel,
        usePrecursorOtherAddressLabel: usePrecursorOtherAddressLabel
      };

      Object.entries(labelValuesMap).forEach(([key, value]) => {
        req.sessionModel.set(key, value);
      });

      return super.getValues(req, res, next);
    }
  };
