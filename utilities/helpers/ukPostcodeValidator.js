
function isPostcodeRequired(value) {
    const validationErrorFunc = (type) => new this.ValidationError(key, { type: type});
    const fields = this.getValues();
    console.log("isPostcodeRequired get fields" , fields)
    if (fields['amend-country'] === 'United kingdom' && (!value || value.trim() === '')) {
      return validationErrorFunc('required');
      };
    return true; // not UK
  }
  module.exports = {
    isPostcodeRequired
  };
  