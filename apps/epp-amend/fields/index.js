const title = require('../../../utilities/constants/titles.js');
const dateComponent = require('hof').components.date;

module.exports = {

  'amend-licence-number': {
    mixin: 'input-text',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    labelClassName: 'visuallyhidden',
    validate: ['required']
  }
};
