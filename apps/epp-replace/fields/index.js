const titles = require('../../../utilities/constants/titles');
const dateComponent = require('hof').components.date;
const poisonsList = require('../../../utilities/constants/poisons.js');
const countersignatoryYears = require('../../../utilities/constants/countersignatory-years.js');
const {
  isValidUkDrivingLicenceNumber,
  validInternationalPhoneNumber
} = require('../../../utilities/helpers');
const countries = require('../../../utilities/constants/countries');
const policeForces = require('../../../utilities/constants/police-forces.js');
const precursorList = require('../../../utilities/constants/explosive-precursors');

module.exports = {
  'replace-licence-number': {
    mixin: 'input-text',
    isPageHeading: 'true'
  },
  'replace-title': {
    mixin: 'select',
    validate: 'required',
    labelClassName: 'govuk-label--m',
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
    labelClassName: 'govuk-label--m',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }]
  },
  'replace-middle-name': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }]
  },
  'replace-last-name': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
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
  'replace-police-report': {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: 'required',
    options: ['yes', 'no'],
    className: ['govuk-radios', 'govuk-radios--inline']
  },
  'replace-countersignatory-title': {
    mixin: 'select',
    validate: 'required',
    labelClassName: 'govuk-label--m',
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
    labelClassName: 'govuk-label--m'
  },
  'replace-countersignatory-middlename': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'replace-countersignatory-lastname': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'replace-countersignatory-years': {
    mixin: 'select',
    validate: 'required',
    labelClassName: 'govuk-label--m',
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
    labelClassName: 'govuk-label--m'
  },
  'replace-countersignatory-occupation': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'replace-countersignatory-address-1': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'replace-countersignatory-address-2': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: [
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'replace-countersignatory-town-or-city': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'replace-countersignatory-postcode': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
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
  'replace-is-details-changed': {
    fields: ['replace-is-details-changed'],
    mixin: 'radio-group',
    isPageHeading: true,
    validate: 'required',
    options: ['yes', 'no'],
    className: ['govuk-radios', 'govuk-radios--inline']
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
  'replace-date-of-birth': dateComponent('replace-date-of-birth', {
    mixin: 'input-date',
    legend: { className: 'govuk-fieldset__legend--m' },
    validate: ['required', 'date', 'before']
  }),
  'replace-countersignatory-Uk-driving-licence-number': {
    validate: [
      'required',
      'notUrl',
      { type: 'minlength', arguments: 16 },
      isValidUkDrivingLicenceNumber
    ],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'replace-countersignatory-Id-type',
      value: 'Uk-driving-licence'
    }
  },
  'replace-which-document-type': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: ['required'],
    options: [
      {
        value: 'UK-passport',
        toggle: 'replace-UK-passport-number',
        child: 'input-text'
      },
      {
        value: 'EU-passport',
        toggle: 'replace-EU-passport-number',
        child: 'input-text'
      },
      {
        value: 'Uk-driving-licence',
        toggle: 'replace-Uk-driving-licence-number',
        child: 'input-text'
      }
    ]
  },
  'replace-UK-passport-number': {
    validate: [
      'required',
      { type: 'maxlength', arguments: 9 },
      'alphanum',
      'notUrl'
    ],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'replace-which-document-type',
      value: 'UK-passport'
    }
  },
  'replace-EU-passport-number': {
    validate: [
      'required',
      { type: 'maxlength', arguments: 9 },
      'alphanum',
      'notUrl'
    ],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'replace-which-document-type',
      value: 'EU-passport'
    }
  },
  'replace-Uk-driving-licence-number': {
    validate: [
      'required',
      'notUrl',
      { type: 'minlength', arguments: 16 },
      isValidUkDrivingLicenceNumber
    ],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'replace-which-document-type',
      value: 'Uk-driving-licence'
    }
  },
  'replace-phone-number': {
    mixin: 'input-text',
    className: ['govuk-input'],
    labelClassName: 'govuk-label--m',
    validate: ['required', validInternationalPhoneNumber, 'notUrl']
  },
  'replace-email': {
    mixin: 'input-text',
    className: ['govuk-input'],
    labelClassName: 'govuk-label--m',
    validate: ['required', 'email']
  },
  'replace-police-force': {
    mixin: 'select',
    className: ['typeahead'],
    labelClassName: 'govuk-label--m',
    options: [
      {
        value: '',
        label: 'fields.replace-police-force.options.none_selected'
      }
    ].concat(policeForces),
    validate: ['required']
  },
  'replace-crime-number': {
    mixin: 'input-text',
    className: ['govuk-input'],
    labelClassName: 'govuk-label--m',
    validate: ['required', { type: 'maxlength', arguments: 250 }, 'notUrl']
  },
  'replace-home-address-1': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'replace-home-address-2': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: [
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'replace-home-town-or-city': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'replace-home-county': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: [
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'replace-home-postcode': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    className: ['govuk-input', 'govuk-input--width-10'],
    formatter: ['ukPostcode']
  },
  'replace-home-country': {
    mixin: 'select',
    validate: ['required'],
    labelClassName: 'govuk-label--m',
    className: ['typeahead'],
    options: [
      {
        value: '',
        label: 'fields.replace-home-country.options.none_selected'
      }
    ].concat(countries)
  },
  'amend-declaration': {
    mixin: 'checkbox',
    validate: ['required']
  },
  'replace-new-name-title': {
    mixin: 'select',
    validate: ['required'],
    labelClassName: 'govuk-label--m',
    options: [
      {
        value: '',
        label: 'fields.replace-new-name-title.options.none_selected'
      }
    ].concat(titles)
  },
  'replace-new-firstname': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'replace-new-middlename': {
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'replace-new-lastname': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'replace-date-new-name-changed': dateComponent('replace-date-new-name-changed', {
    mixin: 'input-date',
    legend: { className: 'govuk-fieldset__legend--m' },
    validate: ['required', 'date', 'before']
  }),
  'replace-home-address-options': {
    mixin: 'radio-group',
    legend: {
      className: 'govuk-label--m'
    },
    className: ['govuk-radios', 'govuk-radios--inline'],
    options: ['yes', 'no'],
    validate: 'required'
  },
  'precursor-field': {
    mixin: 'select',
    validate: ['required'],
    labelClassName: ['govuk-label--m', 'visuallyhidden'],
    options: [
      {
        value: '',
        label: 'fields.precursor-field.options.none_selected'
      }
    ].concat(precursorList)
  }
};
