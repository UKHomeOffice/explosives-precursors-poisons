const validLicenceNumber = value =>
  value.match(/^\d{2}[\/,\-| ]?\w[\/,\-| ]?\d{6}[\/,\-| ]?\d{4}$/);

const isAlpha = str => /^[a-zA-Z]*$/.test(str);

const isApplicationType = (value, applicationType) => (value === applicationType) ? true : false;


module.exports = {
  validLicenceNumber,
  isAlpha,
  isApplicationType
};
