const validators = require('hof/controller/validation/validators');
const { getKeyByValue } = require('../helpers/index');
module.exports = superclass =>
  class extends superclass {
    validateField(key, req) {
      const postCodeCountriesMap = {
        'amend-postcode': 'amend-country',
        'new-renew-home-address-postcode': 'new-renew-home-address-country'
      };
      if (postCodeCountriesMap[key]) {
        const country = req.form.values[postCodeCountriesMap[key]];

        const postcode =
          req.form.values[
            getKeyByValue(postCodeCountriesMap, postCodeCountriesMap[key])
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
