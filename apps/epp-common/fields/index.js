module.exports = {
  'application-type': {
    mixin: 'radio-group',
    isPageHeading: true,
    options: ['new', 'amend', 'renew', 'replace'],
    validate: 'required'
  }
};
