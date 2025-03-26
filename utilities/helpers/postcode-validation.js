const validators = require('hof/controller/validation/validators');
const { getKeyByValue } = require('../helpers/index');

const postCodeCountriesMap = {
  'amend-postcode': 'amend-country',
  'new-renew-home-address-postcode': 'new-renew-home-address-country',
  'replace-home-postcode': 'replace-home-country',
  'new-renew-previous-home-address-postcode': 'new-renew-previous-home-address-country',
  'amend-new-postcode': 'amend-new-country',
  'new-renew-doctor-postcode': 'new-renew-doctor-country'
};

module.exports = superclass =>
  class extends superclass {
    validateField(key, req) {
      const selectedCountryField = postCodeCountriesMap[key];
      if (selectedCountryField) {
        const country = req.form.values[selectedCountryField];
        const postcode =
          req.form.values[
            getKeyByValue(postCodeCountriesMap, selectedCountryField)
          ];

        const validationErrorFunc = type =>
          new this.ValidationError(key, { type: type });

        if (country === 'United Kingdom') {
          if (!postcode) {
            return validationErrorFunc('required');
          }
          if (!validators.postcode(postcode)) {
            return validationErrorFunc('postcode');
          }
        }
      }
      return super.validateField(key, req);
    }
  };
