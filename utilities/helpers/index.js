const moment = require('moment');
const validators = require('hof/controller/validation/validators');

const explosivePrecursorsList = require('../constants/explosive-precursors');
const removeWhiteSpace = value => value?.replace(/\s+/g, '');

const config = require('../../config');

const validLicenceNumber = value =>
  value.match(/^\d{2}[\/,\-| ]?\w[\/,\-| ]?\d{6}[\/,\-| ]?\d{4}$/);

const isAlpha = str => /^[a-zA-Z]*$/.test(str);

const isApplicationType = (req, value, applicationType) => {
  if (value === applicationType) {
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
  if (applicationType === 'renew') {
    licenceNumber = req.form.values['new-renew-licence-number'];
    fieldName = 'new-renew-licence-number';
  }
  if (applicationType === 'amend') {
    licenceNumber = req.form.values['amend-licence-number'];
    fieldName = 'amend-licence-number';
  }
  const removeSpaceOrSperator = licenceNumber.replace(/[^a-zA-Z0-9]/g, '');
  const alphaValues = removeSpaceOrSperator.slice(2, 3);

  if (licenceNumber.length > 16 || licenceNumber.length < 13) {
    const errorMessage =
      'Licence number should not be greater than 16 or less than 13';
    req.log('error', errorMessage);

    return {
      isValid: false,
      errorType: 'licence-length-restriction',
      fieldName: `${fieldName}`
    };
  }

  if (!validLicenceNumber(licenceNumber) || !isAlpha(alphaValues)) {
    const errorMessage = `${licenceNumber} licence number not in correct format`;
    req.log('error', errorMessage);

    return {
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

const getKeyByValue = (obj, value) => {
  return Object.keys(obj).find(key => obj[key] === value);
};

const isDateOlderOrEqualTo = (dateStr, yearsThreshold) => {
  const formattedDate = moment(dateStr, 'YYYY-MM-DD');
  return (
    formattedDate?.isValid() &&
    moment().diff(formattedDate, 'years') >= yearsThreshold
  );
};

const isValidUkDrivingLicenceNumber = value =>
  value.match(/^[A-Z9]{5}\d{6}[A-Z9]{2}\d[A-Z]{2}$/i);

const validInternationalPhoneNumber = value => {
  const phoneNumberWithoutSpace = removeWhiteSpace(value);
  const isValidPhoneNumber = validators.regex(
    phoneNumberWithoutSpace,
    /^\(?\+?[\d()-]{8,16}$/
  );
  return isValidPhoneNumber && validators.internationalPhoneNumber(value);
};

const DEFAULT_AGGREGATOR_LIMIT = 100;

const TEXT_NOT_PROVIDED = 'Not provided';

const DATE_FORMAT_YYYY_MM_DD = 'YYYY-MM-DD';

const textAreaDefaultLength = value => {
  return validators.maxlength(value, 2000);
};

const isValidConcentrationValue = value => {
  return value?.match(/^\d+(\.\d+)?%?$/);
};

const getFormattedDate = date => {
  if (date && moment(date, DATE_FORMAT_YYYY_MM_DD, true)?.isValid()) {
    return moment(date).format(config.PRETTY_DATE_FORMAT);
  }
  return '';
};

const getPrecursorsShortLabel = input => {
  if (!input || typeof input !== 'string') {
    return input;
  }

  const resultStr = input.trim();

  for (const { label, shortLabel } of explosivePrecursorsList) {
    if (resultStr === label) {
      return shortLabel;
    }

    if (resultStr.includes(label)) {
      const newLabel = resultStr.replace(label, shortLabel);
      return newLabel;
    }
  }
  return resultStr;
};

module.exports = {
  isLicenceValid,
  isApplicationType,
  validLicenceNumber,
  isWithoutFullStop,
  getKeyByValue,
  isDateOlderOrEqualTo,
  isValidUkDrivingLicenceNumber,
  validInternationalPhoneNumber,
  removeWhiteSpace,
  DEFAULT_AGGREGATOR_LIMIT,
  TEXT_NOT_PROVIDED,
  DATE_FORMAT_YYYY_MM_DD,
  getFormattedDate,
  getPrecursorsShortLabel,
  textAreaDefaultLength,
  isValidConcentrationValue
};
