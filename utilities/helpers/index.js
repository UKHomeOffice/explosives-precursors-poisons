const validLicenceNumber = value =>
  value.match(/^\d{2}[\/,\-| ]?\w[\/,\-| ]?\d{6}[\/,\-| ]?\d{4}$/);

const isAlpha = str => /^[a-zA-Z]*$/.test(str);

const isApplicationType = (req, value, applicationType) => {
  if(value === applicationType) {
    req.log('info', `Application type is ${applicationType}: ${true}`);
    return true;
  }
  req.log('info', `Application type is ${applicationType}: ${false}`);
  return false;
};

const isLicenceValid = req => {
  let licenceNumber = '';
  let fieldName = '';

  const applicationType = req.sessionModel.get('applicationType');
  if(applicationType === 'renew') {
    licenceNumber = req.form.values['new-renew-licence-number'];
    fieldName = 'new-renew-licence-number';
  }
  if(applicationType === 'amend') {
    licenceNumber = req.form.values['amend-licence-number'];
    fieldName = 'amend-licence-number';
  }
  const removeSpaceOrSperator = licenceNumber.replace(/[^a-zA-Z0-9]/g, '');
  const alphaValues = removeSpaceOrSperator.slice(2, 3);

  if(licenceNumber.length > 16 || licenceNumber.length < 13 ) {
    const errorMessage = 'Licence number should not be greater than 16 or less than 13';
    req.log('error', errorMessage);

    return{
      isValid: false,
      errorType: 'licence-length-restriction',
      fieldName: `${fieldName}`
    };
  }

  if(!validLicenceNumber(licenceNumber) ||
      !isAlpha(alphaValues)) {
    const errorMessage = `${licenceNumber} licence number not in correct format`;
    req.log('error', errorMessage);

    return{
      isValid: false,
      errorType: 'incorrect-format-licence',
      fieldName: `${fieldName}`
    };
  }
  req.log('info', 'licence number is in correct format');

  return {
    isValid: true,
    fieldName: fieldName
  };
};

const isWithoutFullStop = value => {
  return !value.includes('.');
};

const isValidUkDrivingLicenceNumber = value =>
  value.match(/^[A-Z9]{5}\d{6}[A-Z9]{2}\d[A-Z]{2}$/i);

module.exports = {
  isLicenceValid,
  isApplicationType,
  validLicenceNumber,
  isWithoutFullStop,
  isValidUkDrivingLicenceNumber
};
