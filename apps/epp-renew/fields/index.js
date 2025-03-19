
module.exports = {
  'new-renew-licence-number': {
    mixin: 'input-text',
    labelClassName: 'visuallyhidden',
    validate: ['required', 'notUrl']
  }
};
