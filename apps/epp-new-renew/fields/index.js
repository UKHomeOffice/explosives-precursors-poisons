module.exports = {
  'new-renew-license-number':{
    mixin: 'input-text',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'your-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'your-details': {
    mixin: 'input-text',
  }
}
