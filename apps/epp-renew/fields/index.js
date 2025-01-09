module.exports = {
  'new-renew-licence-number': {
    mixin: 'input-text',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    labelClassName: 'visuallyhidden',
    validate: ['required', 'notUrl']
  }
};
