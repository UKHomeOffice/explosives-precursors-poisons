const dateComponent = require('hof').components.date;
const titles = require('../../../utilities/constants/titles.js');
const precursorList = require('../../../utilities/constants/explosive-precursors.js');
const poisonsList = require('../../../utilities/constants/poisons.js');
const helpers = require('../../../utilities/helpers/index.js');
const countries = require('../../../utilities/constants/countries');
const countersignatoryYears = require('../../../utilities/constants/countersignatory-years.js');

module.exports = {
  'amend-licence-number': {
    mixin: 'input-text',
    labelClassName: 'visuallyhidden',
    validate: ['required', 'notUrl']
  },
  'amend-name-title': {
    mixin: 'select',
    validate: ['required'],
    labelClassName: 'govuk-label--m',
    className: ['govuk-input--width-2'],
    options: [
      {
        value: '',
        label: 'fields.amend-name-title.options.none_selected'
      }
    ].concat(titles)
  },
  'amend-firstname': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'amend-middlename': {
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'amend-lastname': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'amend-phone-number': {
    mixin: 'input-text',
    className: ['govuk-input'],
    labelClassName: 'govuk-label--m',
    validate: ['required', 'notUrl', helpers.validInternationalPhoneNumber]
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
      className: 'govuk-fieldset__legend--m'
    },
    className: ['govuk-radios', 'govuk-radios--inline'],
    options: ['yes', 'no'],
    validate: 'required'
  },
  'amend-date-of-birth': dateComponent('amend-date-of-birth', {
    mixin: 'input-date',
    legend: { className: 'govuk-fieldset__legend--m' },
    validate: ['required', 'date', 'before']
  }),
  'amend-address-1': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-address-2': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: [
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-town-or-city': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-county': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: [
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-postcode': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    className: ['govuk-input', 'govuk-input--width-10'],
    formatter: ['ukPostcode']
  },
  'amend-country': {
    mixin: 'select',
    validate: ['required'],
    className: ['typeahead'],
    labelClassName: 'govuk-label--m',
    options: [
      {
        value: '',
        label: 'fields.amend-country.options.none_selected'
      }
    ].concat(countries)
  },
  'amend-applicant-Id-type': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: ['required'],
    options: [
      {
        value: 'UK-passport',
        toggle: 'amend-UK-passport-number',
        child: 'input-text'
      },
      {
        value: 'EU-passport',
        toggle: 'amend-EU-passport-number',
        child: 'input-text'
      },
      {
        value: 'Uk-driving-licence',
        toggle: 'amend-Uk-driving-licence-number',
        child: 'input-text'
      }
    ]
  },
  'amend-UK-passport-number': {
    validate: [
      'required',
      { type: 'maxlength', arguments: 9 },
      'alphanum',
      'notUrl'
    ],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'amend-applicant-Id-type',
      value: 'UK-passport'
    }
  },
  'amend-EU-passport-number': {
    validate: [
      'required',
      { type: 'maxlength', arguments: 9 },
      'alphanum',
      'notUrl'
    ],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'amend-applicant-Id-type',
      value: 'EU-passport'
    }
  },
  'amend-Uk-driving-licence-number': {
    validate: [
      'required',
      'notUrl',
      { type: 'minlength', arguments: 16 },
      helpers.isValidUkDrivingLicenceNumber
    ],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'amend-applicant-Id-type',
      value: 'Uk-driving-licence'
    }
  },
  'amend-new-name-title': {
    mixin: 'select',
    validate: ['required'],
    labelClassName: 'govuk-label--m',
    options: [
      {
        value: '',
        label: 'fields.amend-new-name-title.options.none_selected'
      }
    ].concat(titles)
  },
  'amend-new-firstname': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'amend-new-middlename': {
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'amend-new-lastname': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'amend-new-date-name-changed': dateComponent('amend-new-date-name-changed', {
    mixin: 'input-date',
    legend: { className: 'govuk-fieldset__legend--m' },
    validate: ['required', 'date', 'before']
  }),
  'amend-home-address-options': {
    mixin: 'radio-group',
    legend: {
      className: 'govuk-fieldset__legend--m'
    },
    className: ['govuk-radios', 'govuk-radios--inline'],
    options: ['yes', 'no'],
    validate: 'required'
  },
  'amend-new-address-1': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    className: ['govuk-input', 'govuk-input govuk-!-width-full'],
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-new-address-2': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    className: ['govuk-input', 'govuk-input govuk-!-width-full'],
    validate: [
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-new-town-or-city': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    className: ['govuk-input', 'govuk-input govuk-!-width-full'],
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-new-county': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    className: ['govuk-input', 'govuk-input govuk-!-width-full'],
    validate: [
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-new-postcode': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    className: ['govuk-input', 'govuk-input--width-10'],
    formatter: ['ukPostcode']
  },
  'amend-new-country': {
    mixin: 'select',
    validate: ['required'],
    className: ['typeahead'],
    labelClassName: 'govuk-label--m',
    options: [
      {
        value: '',
        label: 'fields.amend-new-country.options.none_selected'
      }
    ].concat(countries)
  },
  'amend-new-date-moved-to-address': dateComponent(
    'amend-new-date-moved-to-address',
    {
      mixin: 'input-date',
      legend: { className: 'govuk-fieldset__legend--m' },
      validate: ['required', 'date', 'before']
    }
  ),
  'amend-change-substances-options': {
    mixin: 'radio-group',
    legend: {
      className: 'govuk-fieldset__legend--m'
    },
    className: ['govuk-radios', 'govuk-radios--inline'],
    options: ['yes', 'no'],
    validate: 'required'
  },
  'precursor-field': {
    mixin: 'select',
    validate: ['required'],
    labelClassName: ['govuk-label--m', 'visuallyhidden'],
    className: ['govuk-input--width-2'],
    options: [
      {
        value: '',
        label: 'fields.precursor-field.options.none_selected'
      }
    ].concat(precursorList)
  },
  'amend-regulated-explosives-precursors': {
    mixin: 'radio-group',
    legend: {
      className: 'govuk-fieldset__legend--m'
    },
    className: ['govuk-radios', 'govuk-radios--inline'],
    options: ['yes', 'no'],
    validate: 'required'
  },
  'amend-why-need-precursor': {
    mixin: 'textarea',
    validate: ['required', 'notUrl', helpers.textAreaDefaultLength],
    attributes: [{ attribute: 'rows', value: 5 }],
    labelClassName: 'govuk-label--s'
  },
  'amend-how-much-precursor': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 250 }],
    className: ['govuk-input', 'govuk-input--width-10'],
    labelClassName: 'govuk-label--s'
  },
  'amend-what-concentration-precursor': {
    mixin: 'input-text',
    validate: [
      'required',
      helpers.isValidConcentrationValue,
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ],
    className: ['govuk-input', 'govuk-input--width-5'],
    labelClassName: 'govuk-label--s',
    attributes: [{ suffix: '%' }]
  },
  'amend-where-to-store-precursor': {
    mixin: 'checkbox-group',
    validate: ['required'],
    legend: {
      className: 'govuk-label--s'
    },
    options: [
      {
        value: 'amend-store-precursors-home-address'
      },
      {
        value: 'amend-store-precursors-other-address',
        toggle: 'store-precursors-other-address',
        child: 'textarea'
      }
    ]
  },
  'store-precursors-other-address': {
    mixin: 'textarea',
    validate: ['required', helpers.textAreaDefaultLength, 'notUrl'],
    dependent: {
      field: 'amend-where-to-store-precursor',
      value: 'amend-store-precursors-other-address'
    },
    attributes: [{ attribute: 'rows', value: 5 }]
  },
  'amend-where-to-use-precursor': {
    mixin: 'checkbox-group',
    validate: ['required'],
    legend: {
      className: 'govuk-label--s'
    },
    options: [
      {
        value: 'amend-use-precursors-home-address'
      },
      {
        value: 'amend-use-precursors-other-address',
        toggle: 'precursors-use-other-address',
        child: 'textarea'
      }
    ]
  },
  'precursors-use-other-address': {
    mixin: 'textarea',
    validate: ['required', helpers.textAreaDefaultLength, 'notUrl'],
    dependent: {
      field: 'amend-where-to-use-precursor',
      value: 'amend-use-precursors-other-address'
    },
    attributes: [{ attribute: 'rows', value: 5 }]
  },
  'amend-poisons-option': {
    mixin: 'radio-group',
    legend: {
      className: 'govuk-fieldset__legend--m'
    },
    className: ['govuk-radios', 'govuk-radios--inline'],
    options: ['yes', 'no'],
    validate: 'required'
  },
  'amend-poison': {
    mixin: 'select',
    validate: ['required'],
    labelClassName: 'visuallyhidden',
    className: ['govuk-select', 'govuk-input--width-2'],
    options: [
      {
        value: '',
        label: 'fields.amend-poison.options.none_selected'
      }
    ].concat(poisonsList)
  },
  'amend-why-need-poison': {
    mixin: 'textarea',
    validate: ['required', 'notUrl', helpers.textAreaDefaultLength],
    attributes: [{ attribute: 'rows', value: 5 }],
    labelClassName: 'govuk-label--s'
  },
  'amend-how-much-poison': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 250 }],
    className: ['govuk-input', 'govuk-input--width-10'],
    labelClassName: 'govuk-label--s'
  },
  'amend-compound-or-salt': {
    mixin: 'textarea',
    validate: ['required', 'notUrl', helpers.textAreaDefaultLength],
    attributes: [{ attribute: 'rows', value: 5 }],
    labelClassName: 'govuk-label--s'
  },
  'amend-what-concentration-poison': {
    mixin: 'input-text',
    validate: [
      'required',
      helpers.isValidConcentrationValue,
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ],
    className: ['govuk-input', 'govuk-input--width-5'],
    labelClassName: 'govuk-label--s',
    attributes: [{ suffix: '%' }]
  },
  'amend-where-to-store-poison': {
    mixin: 'checkbox-group',
    validate: ['required'],
    legend: {
      className: 'govuk-label--s'
    },
    options: [
      {
        value: 'amend-store-poison-home-address'
      },
      {
        value: 'amend-store-poison-other-address',
        toggle: 'store-poison-other-address',
        child: 'textarea'
      }
    ]
  },
  'store-poison-other-address': {
    mixin: 'textarea',
    validate: ['required', helpers.textAreaDefaultLength, 'notUrl'],
    dependent: {
      field: 'amend-where-to-store-poison',
      value: 'amend-store-poison-other-address'
    },
    attributes: [{ attribute: 'rows', value: 5 }]
  },
  'amend-where-to-use-poison': {
    mixin: 'checkbox-group',
    validate: ['required'],
    legend: {
      className: 'govuk-label--s'
    },
    options: [
      {
        value: 'amend-use-poison-home-address'
      },
      {
        value: 'amend-use-poison-other-address',
        toggle: 'poison-use-other-address',
        child: 'textarea'
      }
    ]
  },
  'poison-use-other-address': {
    mixin: 'textarea',
    validate: ['required', helpers.textAreaDefaultLength, 'notUrl'],
    dependent: {
      field: 'amend-where-to-use-poison',
      value: 'amend-use-poison-other-address'
    },
    attributes: [{ attribute: 'rows', value: 5 }]
  },
  'amend-no-poisons-precursors-options': {
    mixin: 'radio-group',
    legend: {
      className: 'govuk-fieldset__legend--m'
    },
    className: ['govuk-radios', 'govuk-radios--inline'],
    options: ['yes', 'no'],
    validate: 'required'
  },
  'amend-countersignatory-title': {
    mixin: 'select',
    validate: 'required',
    labelClassName: 'govuk-label--m',
    className: ['govuk-select', 'govuk-input--width-2'],
    options: [
      {
        value: '',
        label: 'fields.amend-countersignatory-title.options.none_selected'
      }
    ].concat(titles)
  },
  'amend-countersignatory-firstname': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'amend-countersignatory-middlename': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'amend-countersignatory-lastname': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'amend-countersignatory-years': {
    mixin: 'select',
    validate: 'required',
    labelClassName: 'govuk-label--m',
    className: ['govuk-select', 'govuk-input--width-2'],
    options: [
      {
        value: '',
        label: 'fields.amend-countersignatory-years.options.none_selected'
      }
    ].concat(countersignatoryYears)
  },
  'amend-countersignatory-howyouknow': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'amend-countersignatory-occupation': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--m'
  },
  'amend-countersignatory-address-1': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-countersignatory-address-2': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: [
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-countersignatory-town-or-city': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'amend-countersignatory-postcode': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--m',
    className: ['govuk-input', 'govuk-input--width-10'],
    validate: ['required', 'postcode'],
    formatter: ['ukPostcode']
  },
  'amend-countersignatory-phone-number': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', helpers.validInternationalPhoneNumber],
    className: ['govuk-input', 'govuk-!-width-one-half'],
    labelClassName: 'govuk-label--m'
  },
  'amend-countersignatory-email': {
    mixin: 'input-text',
    validate: ['required', 'email'],
    className: ['govuk-input'],
    labelClassName: 'govuk-label--m'
  },
  'amend-countersignatory-Id-type': {
    isPageHeading: true,
    mixin: 'radio-group',
    validate: ['required'],
    options: [
      {
        value: 'UK-passport',
        toggle: 'amend-countersignatory-UK-passport-number',
        child: 'input-text'
      },
      {
        value: 'EU-passport',
        toggle: 'amend-countersignatory-EU-passport-number',
        child: 'input-text'
      },
      {
        value: 'Uk-driving-licence',
        toggle: 'amend-countersignatory-Uk-driving-licence-number',
        child: 'input-text'
      }
    ]
  },
  'amend-countersignatory-UK-passport-number': {
    validate: [
      'required',
      { type: 'maxlength', arguments: 9 },
      'alphanum',
      'notUrl'
    ],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'amend-countersignatory-Id-type',
      value: 'UK-passport'
    }
  },
  'amend-countersignatory-EU-passport-number': {
    validate: [
      'required',
      { type: 'maxlength', arguments: 9 },
      'alphanum',
      'notUrl'
    ],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'amend-countersignatory-Id-type',
      value: 'EU-passport'
    }
  },
  'amend-countersignatory-Uk-driving-licence-number': {
    validate: [
      'required',
      'notUrl',
      { type: 'minlength', arguments: 16 },
      helpers.isValidUkDrivingLicenceNumber
    ],
    className: ['govuk-input', 'govuk-!-width-one-thirds'],
    dependent: {
      field: 'amend-countersignatory-Id-type',
      value: 'Uk-driving-licence'
    }
  },
  'amend-declaration': {
    mixin: 'checkbox',
    validate: ['required']
  }
};
