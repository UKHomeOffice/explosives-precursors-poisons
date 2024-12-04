module.exports = {
  'application-type': {
    mixin: 'radio-group',
    options: [{ value: 'yes' }, { value: 'no' }],
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
