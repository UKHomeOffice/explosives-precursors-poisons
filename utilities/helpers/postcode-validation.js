const validators = require('hof/controller/validation/validators');
const { getKeyByValue } = require('../helpers/index');
const countryField = require('../../config');

module.exports = superclass =>
  class extends superclass {
    validateField(key, req) {
      const selectedCountryField = countryField.postCodeCountriesMap[key];
      if (countryField.postCodeCountriesMap[key]) {
        const country = req.form.values[selectedCountryField];

        const postcode =
          req.form.values[
            getKeyByValue(countryField.postCodeCountriesMap, selectedCountryField)
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
