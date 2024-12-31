const dateComponent = require('hof').components.date;

module.exports = {
  'amend-licence-number': {
    mixin: 'input-text',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    labelClassName: 'visuallyhidden',
    validate: [
      'required',
      { type: 'maxlength', arguments: [16] },
      { type: 'minlength', arguments: [13] }
    ]
  },
  'amend-date-of-birth': dateComponent('amend-date-of-birth', {
    mixin: 'input-date',
    legend: { className: 'bold' },
    validate: ['required', 'date', 'before']
  })
};
