const { getSubstanceShortLabel } = require('../../../utilities/helpers');

/**
 * @param {string} fieldName - The field name used on the select precursor or select poison page
 */
module.exports = fieldName => superclass =>
  class extends superclass {
    getValues(req, res, next) {
      const selectedSubstance = req.sessionModel.get(fieldName);
      const whyNeedSubstanceLabel = getSubstanceShortLabel(fieldName,
        `Why do you need ${selectedSubstance}`
      );
      const whereToStoreSubstanceLegend = getSubstanceShortLabel(fieldName, 
        `Where will you store the ${selectedSubstance}`
      );
      const whereToUseSubstanceLegend = getSubstanceShortLabel(fieldName, 
        `Where will you use the ${selectedSubstance}`
      );
      const storeSubstanceOtherAddressLabel = getSubstanceShortLabel(fieldName, 
        `Storage address for the ${selectedSubstance}`
      );
      const useSubstanceOtherAddressLabel = getSubstanceShortLabel(fieldName, 
        `Usage address for the ${selectedSubstance}`
      );

      const labelValuesMap = {
        whyNeedSubstanceLabel: whyNeedSubstanceLabel,
        whereToStoreSubstanceLegend: whereToStoreSubstanceLegend,
        whereToUseSubstanceLegend: whereToUseSubstanceLegend,
        storeSubstanceOtherAddressLabel: storeSubstanceOtherAddressLabel,
        useSubstanceOtherAddressLabel: useSubstanceOtherAddressLabel
      };

      Object.entries(labelValuesMap).forEach(([key, value]) => {
        req.sessionModel.set(key, value);
      });

      return super.getValues(req, res, next);
    }
  };
