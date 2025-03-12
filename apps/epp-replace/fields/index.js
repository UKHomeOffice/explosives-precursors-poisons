const titles = require('../../../utilities/constants/titles');
const poisonsList = require('../../../utilities/constants/poisons.js');
const helpers = require('../../../utilities/helpers/index.js');

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
  },
  'replace-countersignatory-Id-type': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: ['required'],
    options: [
      {
        value: 'UK-passport',
        toggle: 'replace-countersignatory-UK-passport-number',
        child: 'input-text'
      },
      {
        value: 'EU-passport',
        toggle: 'replace-countersignatory-EU-passport-number',
        child: 'input-text'
      },
      {
        value: 'Uk-driving-licence',
        toggle: 'replace-countersignatory-Uk-driving-licence-number',
        child: 'input-text'
      }
    ]
  },
  'replace-countersignatory-UK-passport-number': {
    validate: [
      'required',
      { type: 'maxlength', arguments: 9 },
      'alphanum',
      'notUrl'
    ],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'replace-countersignatory-Id-type',
      value: 'UK-passport'
    }
  },
  'replace-countersignatory-EU-passport-number': {
    validate: [
      'required',
      { type: 'maxlength', arguments: 9 },
      'alphanum',
      'notUrl'
    ],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'replace-countersignatory-Id-type',
      value: 'EU-passport'
    }
  },
  'replace-countersignatory-Uk-driving-licence-number': {
    validate: [
      'required',
      'notUrl',
      { type: 'minlength', arguments: 16 },
      helpers.isValidUkDrivingLicenceNumber
    ],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'replace-countersignatory-Id-type',
      value: 'Uk-driving-licence'
    }
  }
};
