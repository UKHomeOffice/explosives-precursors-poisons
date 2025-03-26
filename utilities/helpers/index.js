const moment = require('moment');
const validators = require('hof/controller/validation/validators');
const explosivePrecursorsList = require('../constants/explosive-precursors');
const poisonList = require('../constants/poisons');
const config = require('../../config');
const { SUBSTANCES } = require('../constants/string-constants');

class NotifyMock {
  sendEmail() {
    return Promise.resolve();
  }

  sendSms() {
    return Promise.resolve();
  }

  prepareUpload() {}
}

const removeWhiteSpace = value => value?.replace(/\s+/g, '');

const validLicenceNumber = value =>
  value.match(/^\d{2}[\/,\-| ]?\w[\/,\-| ]?\d{6}[\/,\-| ]?\d{4}$/);

const isAlpha = str => /^[a-zA-Z]*$/.test(str);

const isApplicationType = (req, value, applicationType) => {
  return value === applicationType;
};

const isLicenceValid = req => {
  const applicationType = req.sessionModel.get('applicationType');
  const licenceFieldsJourneyMap = {
    renew: 'new-renew-licence-number',
    amend: 'amend-licence-number',
    replace: 'replace-licence-number'
  };

  const fieldName = licenceFieldsJourneyMap[applicationType];

  if (!fieldName) {
    req.log('error', `Unknown application type: ${applicationType}`);
    throw new Error('Unknown application type');
  }

  const licenceNumber = req.form.values[fieldName];

  if (!licenceNumber || licenceNumber.trim() === '') {
    return { isValid: true, fieldName };
  }

  const removeSpaceOrSeparator = licenceNumber.replace(/[^a-zA-Z0-9]/g, '');
  const alphaValues = removeSpaceOrSeparator.slice(2, 3);

  if (licenceNumber.length > 16 || licenceNumber.length < 13) {
    req.log('error', 'Licence number should be between 13 and 16 characters');
    return {
      isValid: false,
      errorType: 'licence-length-restriction',
      fieldName
    };
  }

  if (!validLicenceNumber(licenceNumber) || !isAlpha(alphaValues)) {
    req.log(
      'error',
      `${licenceNumber} licence number is not in the correct format`
    );
    return {
      isValid: false,
      errorType: 'incorrect-format-licence',
      fieldName
    };
  }

  req.log('info', 'Licence number is in correct format');
  return { isValid: true, fieldName };
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

const isEditMode = req => {
  return Boolean(req?.originalUrl?.endsWith('/edit'));
};

const getSubstanceShortLabel = (input, substance) => {
  if (!input || typeof input !== 'string' || !substance) {
    return input;
  }

  const resultStr = input.trim();

  const list =
    substance === SUBSTANCES.POISON ? poisonList : explosivePrecursorsList;

  for (const { label, shortLabel } of list) {
    if (resultStr === label) {
      return shortLabel;
    }

    if (resultStr.includes(label)) {
      return resultStr.replace(label, shortLabel);
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
  isEditMode,
  getSubstanceShortLabel,
  textAreaDefaultLength,
  isValidConcentrationValue,
  NotifyClient:
    config.govukNotify.notifyApiKey === 'USE_MOCK'
      ? NotifyMock
      : require('notifications-node-client').NotifyClient
};
