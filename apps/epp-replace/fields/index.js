const titles = require('../../../utilities/constants/titles');

module.exports = {
  'replace-licence-number': {
    mixin: 'input-text',
    isPageHeading: 'true'
  },
  'replace-title': {
    mixin: 'select',
    validate: 'required',
    labelClassName: 'govuk-label--s',
    className: ['govuk-select', 'govuk-input--width-2'],
    options: [
      {
        value: '',
        label: 'fields.replace-title.options.none_selected'
      }
    ].concat(titles)
  },
  'replace-first-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }]
  },
  'replace-middle-name': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }]
  },
  'replace-last-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }]
  }
};
