const validLicenceNumber = value =>
  value.match(/^\d{2}[\/,\-| ]?\w[\/,\-| ]?\d{6}[\/,\-| ]?\d{4}$/);

module.exports = {
  validLicenceNumber
};
