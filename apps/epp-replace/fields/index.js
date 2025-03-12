const titles = require('../../../utilities/constants/titles');
const poisonsList = require('../../../utilities/constants/poisons.js');
const countersignatoryYears = require('../../../utilities/constants/countersignatory-years.js');
const { validInternationalPhoneNumber } = require('../../../utilities/helpers');

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
  },
  'replace-licence': {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: 'required',
    options: [
      'replace-licence-stolen',
      'replace-licence-lost',
      'replace-licence-damaged',
      'replace-licence-destroyed'
    ]
  },
  'replace-countersignatory-title': {
    mixin: 'select',
    validate: 'required',
    labelClassName: 'govuk-label--s',
    className: ['govuk-select', 'govuk-input--width-2'],
    options: [
      {
        value: '',
        label: 'fields.replace-countersignatory-title.options.none_selected'
      }
    ].concat(titles)
  },
  'replace-countersignatory-firstname': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s'
  },
  'replace-countersignatory-middlename': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s'
  },
  'replace-countersignatory-lastname': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s'
  },
  'replace-countersignatory-years': {
    mixin: 'select',
    validate: 'required',
    labelClassName: 'govuk-label--s',
    className: ['govuk-select', 'govuk-input--width-2'],
    options: [
      {
        value: '',
        label: 'fields.replace-countersignatory-years.options.none_selected'
      }
    ].concat(countersignatoryYears)
  },
  'replace-countersignatory-howyouknow': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s'
  },
  'replace-countersignatory-occupation': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s'
  },
  'replace-countersignatory-address-1': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--s',
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'replace-countersignatory-address-2': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--s',
    validate: [
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'replace-countersignatory-town-or-city': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--s',
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'replace-countersignatory-postcode': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-input--width-10'],
    validate: ['required', 'postcode'],
    formatter: ['ukPostcode']
  },
  'replace-countersignatory-phone-number': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', validInternationalPhoneNumber],
    className: ['govuk-input', 'govuk-!-width-one-half'],
    labelClassName: 'govuk-label--m'
  },
  'replace-countersignatory-email': {
    mixin: 'input-text',
    validate: ['required', 'email'],
    className: ['govuk-input'],
    labelClassName: 'govuk-label--m'
  },
  'replace-poison': {
    mixin: 'select',
    validate: ['required'],
    labelClassName: 'visuallyhidden',
    className: ['govuk-select', 'govuk-input--width-2'],
    options: [
      {
        value: '',
        label: 'fields.replace-poison.options.none_selected'
      }
    ].concat(poisonsList)
  }
};
