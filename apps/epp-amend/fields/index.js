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
  }
};
