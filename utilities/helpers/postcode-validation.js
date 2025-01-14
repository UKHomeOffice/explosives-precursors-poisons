const validators = require('hof/controller/validation/validators');
module.exports = superclass => class extends superclass {
  validateField(key, req) {
    if (key === 'amend-postcode') {
      const country = req.form.values['amend-country'];
      const postcode = req.form.values['amend-postcode'];
      const validationErrorFunc = type => new this.ValidationError(key, { type: type });
      if (country === 'United Kingdom' && !postcode) {
        return validationErrorFunc('required');
      } else if (country === 'United Kingdom' && !validators.postcode(postcode)) {
        return validationErrorFunc('postcode');
      }
    }
    return super.validateField(key, req);
  }
};
