const titles = require('../../../utilities/constants/titles.js');
const precursorList = require('../../../utilities/constants/explosive-precursors.js');
const dateComponent = require('hof').components.date;
const helpers = require('../../../utilities/helpers/index.js');
const country = require('../../../utilities/constants/countries');

module.exports = {
  'amend-licence-number': {
    mixin: 'input-text',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    labelClassName: 'visuallyhidden',
    validate: ['required', 'notUrl']
  },
  'amend-name-title': {
    mixin: 'select',
    validate: ['required'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input--width-2'],
    options: [{
      value: '',
      label: 'fields.amend-name-title.options.none_selected'
    }].concat(titles)
  },
  'amend-firstname': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'amend-middlename': {
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'amend-lastname': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'amend-phone-number': {
    mixin: 'input-text',
    className: ['govuk-input'],
    labelClassName: 'govuk-label--m',
    validate: ['required', 'internationalPhoneNumber']
  },
  'amend-email': {
    mixin: 'input-text',
    className: ['govuk-input'],
    labelClassName: 'govuk-label--m',
    validate: ['required', 'email']
  },
  'amend-name-options': {
    mixin: 'radio-group',
    legend: {
      className: 'govuk-label--m'
    },
    className: ['govuk-radios', 'govuk-radios--inline'],
    options: ['yes', 'no'],
    validate: 'required'
  },
  'amend-date-of-birth': dateComponent('amend-date-of-birth', {
    mixin: 'input-date',
    legend: { className: 'bold' },
    validate: ['required', 'date', 'before']
  }),
  'amend-address-1': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-address-2': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: [
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-town-or-city': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-county': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: [
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-postcode': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    formatter: ['ukPostcode']
  },
  'amend-country': {
    mixin: 'select',
    validate: ['required'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-!-width-two-thirds'],
    options: [{
      value: '',
      label: 'fields.amend-country.options.none_selected'
    }].concat(country)
  },
  'amend-applicant-Id-type': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: ['required'],
    options: [
      {value: 'UK-passport', toggle: 'amend-UK-passport-number', child: 'input-text'},
      {value: 'EU-passport', toggle: 'amend-EU-passport-number', child: 'input-text'},
      {value: 'Uk-driving-licence', toggle: 'amend-Uk-driving-licence-number', child: 'input-text'}
    ]
  },
  'amend-UK-passport-number': {
    validate: ['required', { type: 'maxlength', arguments: 9 }, 'alphanum', 'notUrl'],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'amend-applicant-Id-type',
      value: 'UK-passport'
    }
  },
  'amend-EU-passport-number': {
    validate: ['required', { type: 'maxlength', arguments: 9 }, 'alphanum', 'notUrl'],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'amend-applicant-Id-type',
      value: 'EU-passport'
    }
  },
  'amend-Uk-driving-licence-number': {
    validate: ['required', 'notUrl', { type: 'minlength', arguments: 16 }, helpers.isValidUkDrivingLicenceNumber],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'amend-applicant-Id-type',
      value: 'Uk-driving-licence'
    }
  },
  'amend-new-name-title': {
    mixin: 'select',
    validate: ['required'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input--width-2'],
    options: [{
      value: '',
      label: 'fields.amend-new-name-title.options.none_selected'
    }].concat(titles)
  },
  'amend-new-firstname': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'amend-new-middlename': {
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'amend-new-lastname': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'amend-new-date-name-changed': dateComponent('amend-new-date-name-changed', {
    mixin: 'input-date',
    legend: { className: 'bold' },
    validate: ['required', 'date', 'before']
  }),
  'amend-precursor-selection': {
    mixin: 'select',
    validate: ['required'],
    labelClassName: ['govuk-label--s', 'visuallyhidden'],
    className: ['govuk-input--width-2'],
    options: [{
      value: '',
      label: 'fields.amend-precursor-selection.options.none_selected'
    }].concat(precursorList)
  }
};
