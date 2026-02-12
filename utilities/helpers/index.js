const moment = require('moment');
const validators = require('hof/controller/validation/validators');
const explosivePrecursorsList = require('../constants/explosive-precursors');
const poisonList = require('../constants/poisons');
const config = require('../../config');
const { SUBSTANCES, AMOUNT_DECIMAL_REGEX } = require('../constants/string-constants');

const DEFAULT_AGGREGATOR_LIMIT = 100;
const TEXT_NOT_PROVIDED = 'Not provided';
const DATE_FORMAT_YYYY_MM_DD = 'YYYY-MM-DD';

const precursorAndPoisonQuantityValidators = [
  'required',
  { type: 'regex', arguments: AMOUNT_DECIMAL_REGEX },
  { type: 'max', arguments: 999999 },
  { type: 'min', arguments: 0.01 }
];

class NotifyMock {
  sendEmail() {
    return Promise.resolve();
  }

  sendSms() {
    return Promise.resolve();
  }

  prepareUpload() {}
}

/**
 * Removes all whitespace characters from the given string.
 *
 * @param {string} value - The string from which to remove whitespace.
 * @returns {string} The string with all whitespace characters removed.
 */
const removeWhiteSpace = value => value?.replace(/\s+/g, '');

/**
 * Validates a licence number.
 *
 * @param {string} value - The licence number to validate.
 * @returns {RegExpMatchArray}
 */
const validLicenceNumber = value =>
  value.match(/^\d{2}[\/,\-| ]?\w[\/,\-| ]?\d{6}[\/,\-| ]?\d{4}$/);

/**
 * Checks if a string contains only alphabetic characters.
 *
 * @param {string} str - The string to check.
 * @returns {boolean} `true` if the string contains only alphabetic characters, `false` otherwise.
 */
const isAlpha = str => /^[a-zA-Z]*$/.test(str);

/**
 * Checks if the value matches the specified application type.
 *
 * @param {object} req - The request object.
 * @param {string} value - The value to check.
 * @param {string} applicationType - The application type to match against.
 * @returns {boolean} `true` if the value matches the application type, `false` otherwise.
 */
const isApplicationType = (req, value, applicationType) => {
  return value === applicationType;
};

/**
 * Validates the licence number based on the application type.
 *
 * @param {object} req - The request object containing session and form data.
 * @param {object} req.sessionModel - The session model.
 * @param {Function} req.sessionModel.get - Function to get session data.
 * @param {object} req.form - The form data.
 * @param {object} req.form.values - The form values containing the licence number.
 * @param {Function} req.log - Function to log messages.
 * @returns {object} An object containing the validation result and field name.
 * @returns {boolean} return.isValid - Indicates if the licence number is valid.
 * @returns {string} return.fieldName - The name of the field containing the licence number.
 * @returns {string} [return.errorType] - The type of error if the licence number is invalid.
 * @throws {Error} Throws an error if the application type is unknown.
 */
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

/**
 * Checks if a string does not contain a full stop (period).
 *
 * @param {string} value - The string to check.
 * @returns {boolean} `true` if the string does not contain a full stop, `false` otherwise.
 */
const isWithoutFullStop = value => {
  return !value.includes('.');
};

/**
 * Gets the key associated with a given value in an object.
 *
 * @param {object} obj - The object to search.
 * @param {*} value - The value to find the corresponding key for.
 * @returns {string|undefined} The key associated with the given value, or `undefined` if no key is found.
 */
const getKeyByValue = (obj, value) => {
  return Object.keys(obj).find(key => obj[key] === value);
};

/**
 * Checks if a given date is older than or equal to a specified number of years.
 *
 * @param {string} dateStr - The date string to check, in 'YYYY-MM-DD' format.
 * @param {number} yearsThreshold - The number of years to compare against.
 * @returns {boolean} `true` if the date is older than or equal to the specified number of years, `false` otherwise.
 */
const isDateOlderOrEqualTo = (dateStr, yearsThreshold) => {
  const formattedDate = moment(dateStr, 'YYYY-MM-DD');
  return (
    formattedDate?.isValid() &&
    moment().diff(formattedDate, 'years') >= yearsThreshold
  );
};

/**
 * Validates a UK driving licence number.
 *
 * @param {string} value - The driving licence number to validate.
 * @returns {RegExpMatchArray}
 */
const isValidUkDrivingLicenceNumber = value =>
  value.match(/^[A-Z9]{5}\d{6}[A-Z9]{2}\d[A-Z]{2}$/i);

/**
 * Validates an international phone number.
 *
 * @param {string} value - The phone number to validate.
 * @returns {boolean} `true` if the phone number is valid, `false` otherwise.
 */
const validInternationalPhoneNumber = value => {
  const phoneNumberWithoutSpace = removeWhiteSpace(value);
  const isValidPhoneNumber = validators.regex(
    phoneNumberWithoutSpace,
    /^\(?\+?[\d()-]{8,16}$/
  );
  return isValidPhoneNumber && validators.internationalPhoneNumber(value);
};

/**
 * Checks if the length of the given value does not exceed the default maximum length for a text area.
 *
 * @param {string} value - The string to check the length of.
 * @returns {boolean} `true` if the length of the value does not exceed 2000 characters, `false` otherwise.
 */
const textAreaDefaultLength = value => {
  return validators.maxlength(value, 2000);
};

/**
 * Validates a concentration value.
 *
 * @param {string} value - The concentration value to validate.
 * @returns {RegExpMatchArray}
 */
const isValidConcentrationValue = value => {
  return value?.match(/^\d+(\.\d+)?%?$/);
};

/**
 * Formats a date string into a pretty date format.
 *
 * @param {string} date - The date string to format.
 * @returns {string} The formatted date string if the input date is valid, otherwise an empty string.
 */
const getFormattedDate = date => {
  if (date && moment(date, DATE_FORMAT_YYYY_MM_DD, true)?.isValid()) {
    return moment(date).format(config.PRETTY_DATE_FORMAT);
  }
  return '';
};

/**
 * Checks if the current request is in edit mode based on the URL.
 *
 * @param {object} req - The request object.
 * @param {string} req.originalUrl - The original URL of the request.
 * @returns {boolean} `true` if the URL ends with '/edit', `false` otherwise.
 */
const isEditMode = req => {
  return Boolean(req?.originalUrl?.endsWith('/edit'));
};

/**
 * Replaces the substance label with its short label if found in the input string.
 *
 * @param {string} input - The input string potentially containing the substance label.
 * @param {string} substance - The type of substance, either 'POISON' or 'EXPLOSIVE'.
 * @returns {string} The input string with the substance label replaced by its short label, if applicable.
 */
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

/**
 * Displays the value of an optional field if the specified step is included in the session's steps.
 *
 * @param {object} req - The request object.
 * @param {object} req.sessionModel - The session model object from the request.
 * @param {string[]} req.sessionModel.steps - The steps stored in the session model.
 * @param {string} step - The step to check for in the session's steps.
 * @param {*} value - The value of the optional field.
 * @returns {*} The value of the optional field if the step is included in
 * the session's steps, otherwise 'Not provided' or null.
 */
const displayOptionalField = (req, step, value) => {
  if (req.sessionModel?.get('steps')?.includes(step)) {
    return value || 'Not provided';
  }
  return null;
};

/**
 * Formats the list of document attachments if the specified step is included in the session's steps.
 *
 * @param {Array} documents - The list of document objects.
 * @param {object} req - The request object.
 * @param {object} req.sessionModel - The session model object.
 * @param {string[]} req.sessionModel.steps - The list of steps in the session.
 * @param {string} step - The step to check.
 * @returns {string} A formatted string of document names joined by double newlines if
 * the step is included, otherwise an empty string.
 */
const formatAttachments = (documents, req, step) => {
  if (
    req.sessionModel?.get('steps')?.includes(step) &&
    Array.isArray(documents) &&
    documents.length > 0
  ) {
    return documents.map(file => file?.name)?.join('\n\n');
  }
  return '';
};

/**
 * Determines whether to show counter-signatory details based on session data.
 *
 * @param {*} value - The value to return if conditions are met.
 * @param {Object} req - The request object, containing session model data.
 * @param {Object} req.sessionModel - The session model object.
 * @param {Function} req.sessionModel.get - Function to retrieve session data by key.
 * @returns {*} - The input value if conditions are met; otherwise, null.
 */

const showCounterSignatoryDetails = (value, req) => {
  return req.sessionModel.get('replace-is-details-changed') === 'yes' &&
    (req.sessionModel.get('replace-name-options') === 'yes' ||
      req.sessionModel.get('replace-home-address-options') === 'yes')
    ? value
    : null;
};

const parseHyphenatedPairValue = val => {
  return val
    ? (val.substring(0, val.lastIndexOf('-')) || '0') +
        ' ' +
        val.substring(val.lastIndexOf('-') + 1)
    : '';
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
  parseHyphenatedPairValue,
  precursorAndPoisonQuantityValidators,
  getFormattedDate,
  isEditMode,
  getSubstanceShortLabel,
  textAreaDefaultLength,
  isValidConcentrationValue,
  displayOptionalField,
  formatAttachments,
  showCounterSignatoryDetails,
  parseHyphenatedPairValue,
  precursorAndPoisonQuantityValidators,
  NotifyClient:
    config.govukNotify.notifyApiKey === 'USE_MOCK'
      ? NotifyMock
      : require('notifications-node-client').NotifyClient
};
