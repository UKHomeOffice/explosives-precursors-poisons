const { getPrecursorsShortLabel } = require('../../../utilities/helpers');
module.exports = superclass =>
  class extends superclass {
    configure(req, res, next) {
      // TODO: Render address as Hint
      return super.configure(req, res, next);
    }

    getValues(req, res, next) {
      const selectedPrecursor = req.sessionModel.get('amend-precursor-field');
      const whyNeedPrecursorLabel = getPrecursorsShortLabel(
        `Why do you need ${selectedPrecursor}`
      );
      const whereToStorePrecursorLegend = getPrecursorsShortLabel(
        `Where will you store the ${selectedPrecursor}`
      );
      const whereToUsePrecursorLegend = getPrecursorsShortLabel(
        `Where will you use the ${selectedPrecursor}`
      );
      const storePrecursorOtherAddressLabel = getPrecursorsShortLabel(
        `Storage address for the ${selectedPrecursor}`
      );
      const usePrecursorOtherAddressLabel = getPrecursorsShortLabel(
        `Usage address for the ${selectedPrecursor}`
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
