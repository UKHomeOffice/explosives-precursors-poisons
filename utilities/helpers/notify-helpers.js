/* eslint-disable indent */
const {
  APP_TYPE_NEW,
  APP_TYPE_RENEW,
  APP_TYPE_AMEND,
  APP_TYPE_REPLACE
} = require('../constants/string-constants');
const { govukNotify } = require('../../config');
const { isDateOlderOrEqualTo, getFormattedDate } = require('./index');

const newRenewTranslation = require('../../apps/epp-new/translations/src/en/fields.json');
const amendTranslation = require('../../apps/epp-amend/translations/src/en/fields.json');
const replaceTranslation = require('../../apps/epp-replace/translations/src/en/fields.json');

const USER = 'user';
const BUSINESS = 'business';
const STR_YES = 'yes';
const STR_NO = 'no';

/**
 * Retrieves the PDF title based on the application type stored in the session model.
 *
 * @param {Object} req - The request object containing session data and translation function.
 * @param {Object} req.sessionModel - The session model containing application data.
 * @param {function} req.sessionModel.get - Function to get a value from the session model.
 * @param {string} req.sessionModel.get.applicationType - The type of application.
 * @param {function} req.translate - Function to translate keys into localized strings.
 * @returns {string} The translated service name based on the application type.
 * @throws {Error} Throws an error if the application type is unknown.
 */

const getPdfTitle = req => {
  const applicationType = req.sessionModel.get('applicationType');

  switch (applicationType) {
    case APP_TYPE_NEW:
      return req.translate('journey.serviceNameNew');
    case APP_TYPE_RENEW:
      return req.translate('journey.serviceNameRenew');

    case APP_TYPE_AMEND:
    case APP_TYPE_REPLACE:
      return req.translate('journey.serviceName');
    default:
      throw Error(`Unknown application type: ${applicationType}`);
  }
};

/**
 * Formats the section summary items into a string.
 *
 * @param {Object} items - The items to be formatted.
 * @param {Array} items.aggregatedValues - An array of aggregated values.
 * @param {Array} items.aggregatedValues[].fields - An array of fields within each aggregated value.
 * @param {Object} items.aggregatedValues[].fields[] - A field object.
 * @param {string} items.aggregatedValues[].fields[].parsed - The parsed value of the field.
 * @returns {string} A formatted string of section summary items, with
 * fields separated by newlines and sections separated by "\n\n ---\n^".
 */
const formatSectionSummaryItems = items => {
  const dateFields = [
    'new-renew-other-name-start-date',
    'new-renew-other-name-stop-date'
  ];
  return items
    ? items.aggregatedValues
      .map(({ fields }) =>
        fields
          .map(({ field, parsed }) => {
            if (dateFields.includes(field)) {
              return getFormattedDate(parsed);
            }
            return parsed;
          })
          .join('\n')
      )
      .join('\n\n ---\n^')
    : '';
};

const poisonsLabels = {
  'why-need-poison': 'whyNeedPoisonLabel',
  'where-to-store-poison': 'whereToStorePoisonLegend',
  'where-to-use-poison': 'whereToUsePoisonLegend',
  'compound-or-salt': 'Specific compound or salt',
  'how-much-poison': 'How much do you wish to acquire at any one time within a 6-month period?',
  'what-concentration-poison':
  'What concentration % w/w of the substance do you need for your intended purpose?'
};

const precursorsLabels = {
  'why-need-precursor': 'whyNeedPrecursorLabel',
  'how-much-precursor': 'How much do you wish to acquire at any one time within a 6-month period?',
  'what-concentration-precursor':
  'What concentration % w/w of the substance do you need for your intended purpose?',
  'where-to-store-precursor': 'whereToStorePrecursorLegend',
  'where-to-use-precursor': 'whereToUsePrecursorLegend'
};
const formatPoisonPrecursorSummary = (req, aggregateType, list) => {
  if (!list?.aggregatedValues) {
    return '';
  }
  let currentLabel = '';
  let labelKey;
  return list.aggregatedValues.map(item => {
    const fieldLines = item?.fields?.map(element => {
      if (element.field === 'display-precursor-title' || element.field === 'display-poison-title') {
        return null;
      }
      if (element.field !== 'display-precursor-title') {
        if (aggregateType === 'poisons-details-aggregate') {
          if (Object.keys(poisonsLabels)?.includes(element.field)) {
            labelKey = poisonsLabels[element.field];
            currentLabel = labelKey?.includes(' ') ? poisonsLabels[element.field]
              : req.sessionModel.get(poisonsLabels[element.field]);
          }
        } else if (aggregateType === 'precursors-details-aggregate') {
          if (Object.keys(precursorsLabels)?.includes(element.field)) {
            labelKey = precursorsLabels[element.field];
            currentLabel = labelKey?.includes(' ') ? precursorsLabels[element.field]
              : req.sessionModel.get(precursorsLabels[element.field]);
          }
        }
      }
      return `${currentLabel}: ${element.parsed}`;
    });
    return `${item.joinTitle}\n${fieldLines?.join('\n')}`;
  }).join('\n\n');
};
/**
 * Parses a list of documents into a formatted string.
 *
 * @param {Array} documents - An array of document objects.
 * @param {string} documents[].name - The name of the document.
 * @param {string} documents[].url - The URL of the document.
 * @returns {string} A formatted string of document links, each on a new line,
 * or an empty string if the documents array is empty or not an array.
 */
const parseDocumentList = documents => {
  return Array.isArray(documents) && documents.length
    ? '\n' + documents.map(doc => `[${doc.name}](${doc.url})`).join('\n')
    : '';
};

/**
 * Retrieves the label for a given field key and value from the provided translation object.
 *
 * @param {string} fieldKey - The key of the field to retrieve the label for.
 * @param {string|Array} fieldValue - The value(s) of the field to retrieve the label(s)
 * for. Can be a string or an array of strings.
 * @param {Object} translation - The translation object containing field labels.
 * @param {Object} translation[fieldKey] - The translation entry for the field.
 * @param {Object} translation[fieldKey].options - The options for the field.
 * @param {Object} translation[fieldKey].options[].label - The label for each option.
 * @returns {string} The label(s) for the given field value(s), joined by ', ' if multiple.
 */
const getLabel = (fieldKey, fieldValue, translation) => {
  if (Array.isArray(fieldValue)) {
    return fieldValue
      .map(option => translation[fieldKey]?.options[option]?.label)
      .join(', ');
  }
  return translation[fieldKey]?.options[fieldValue]?.label;
};

/**
 * Retrieves the template ID based on the application type and recipient type.
 *
 * @param {Object} req - The request object containing session and configuration data.
 * @param {Object} req.sessionModel - The session model containing application data.
 * @param {function} req.sessionModel.get - Function to get a value from the session model.
 * @param {string} applicationType - The type of application (e.g., 'new', 'renew', 'amend', 'replace').
 * @param {string} recipientType - The type of recipient (e.g., 'USER', 'BUSINESS').
 * @returns {string} The template ID for the given application and recipient
 * type, or an empty string if no match is found.
 */
const getTemplateId = (req, applicationType, recipientType) => {
  const userAppTemplateMap = {
    new: govukNotify.newApplicationUserTemplateId,
    renew: govukNotify.renewApplicationUserTemplateId,
    amend: govukNotify.amendApplicationUserTemplateId,
    replace: govukNotify.replaceApplicationUserTemplateId
  };

  const businessAppTemplateMap = {
    new: govukNotify.newApplicationBusinessTemplateId,
    renew: govukNotify.renewApplicationBusinessTemplateId,
    amend: govukNotify.amendApplicationBusinessTemplateId,
    replace: govukNotify.replaceApplicationBusinessTemplateId
  };

  if (recipientType === USER) {
    if (
      applicationType === APP_TYPE_REPLACE &&
      req.sessionModel.get('replace-licence') === 'replace-licence-damaged'
    ) {
      return govukNotify.replaceDamagedApplicationUserTemplateId;
    }
    return userAppTemplateMap[applicationType];
  }

  if (recipientType === BUSINESS) {
    return businessAppTemplateMap[applicationType];
  }

  return '';
};

/**
 * Retrieves the email field key based on the application type.
 *
 * @param {string} applicationType - The type of application
 * (e.g., 'new', 'renew', 'amend', 'replace').
 * @returns {string} The email field key corresponding to the given application type.
 */
const getUserEmail = applicationType => {
  const appUserEmailMap = {
    new: 'new-renew-email',
    renew: 'new-renew-email',
    amend: 'amend-email',
    replace: 'replace-email'
  };

  return appUserEmailMap[applicationType];
};

/**
 * Retrieves the identity attachment document list based on the provided ID fields.
 *
 * @param {Object} req - The request object containing session data.
 * @param {Object} req.sessionModel - The session model containing application data.
 * @param {function} req.sessionModel.get - Function to get a value from the session model.
 * @param {Array<string>} idFields - An array of ID field keys to check in the session model.
 * @returns {string} A formatted string of document links for the identity attachment,
 * or an empty string if no matching document is found.
 */
const getIdentityAttachment = (req, idFields) => {
  if (!Array.isArray(idFields) || !req) {
    return '';
  }
  const fieldMap = {
    'new-renew-UK-passport-number': 'new-renew-british-passport',
    'new-renew-EU-passport-number': 'new-renew-eu-passport',
    'new-renew-Uk-driving-licence-number': 'new-renew-upload-driving-licence',
    'amend-UK-passport-number': 'amend-british-passport',
    'amend-EU-passport-number': 'amend-eu-passport',
    'amend-Uk-driving-licence-number': 'amend-uk-driving-licence',
    'replace-UK-passport-number': 'replace-british-passport',
    'replace-EU-passport-number': 'replace-eu-passport',
    'replace-Uk-driving-licence-number': 'replace-upload-driving-licence'
  };

  for (const idField of idFields) {
    if (req.sessionModel.get(idField)) {
      return parseDocumentList(req.sessionModel.get(fieldMap[idField]) || '');
    }
  }

  return '';
};

/**
 * Checks if the given value is a "yes" or "no" string.
 *
 * @param {string} value - The value to check.
 * @returns {string} - Returns `STR_YES` if the value is equal to `STR_YES`, otherwise returns `STR_NO`.
 */
const checkYesNo = value => (value === STR_YES ? STR_YES : STR_NO);

/**
 * Determines if the given value is truthy or falsy.
 *
 * @param {*} value - The value to check.
 * @returns {string} - Returns `STR_YES` if the value is truthy, otherwise returns `STR_NO`.
 */
const hasValue = value => (value ? STR_YES : STR_NO);

/**
 * Determines if the request contains countersignatory details based on the application type.
 *
 * @param {Object} req - The request object containing session data.
 * @param {Object} req.sessionModel - The session model containing application data.
 * @param {function} req.sessionModel.get - Function to get a value from the session model.
 * @param {string} applicationType - The type of application (e.g., 'APP_TYPE_AMEND', 'APP_TYPE_REPLACE').
 * @returns {boolean} True if countersignatory details are present for the given application type, false otherwise.
 */
const hasCountersignatoryDetails = (req, applicationType) => {
  if (applicationType === APP_TYPE_AMEND) {
    return (
      req.sessionModel.get('amend-name-options') === STR_YES ||
      req.sessionModel.get('amend-home-address-options') === STR_YES
    );
  }

  if (applicationType === APP_TYPE_REPLACE) {
    return (
      req.sessionModel.get('replace-name-options') === STR_YES ||
      req.sessionModel.get('replace-home-address-options') === STR_YES
    );
  }

  return false;
};

/**
 * Determines if the request contains a previous address based on the home move date.
 *
 * @param {Object} req - The request object containing session data.
 * @param {Object} req.sessionModel - The session model containing application data.
 * @param {function} req.sessionModel.get - Function to get a value from the session model.
 * @returns {boolean} True if the home move date is within the last 5
 * years and there are other addresses, false otherwise.
 */
const hasPreviousAddress = req => {
  const homeMoveDate = req.sessionModel.get(
    'new-renew-home-address-moveto-date'
  );
  return !!(
    homeMoveDate &&
    !isDateOlderOrEqualTo(homeMoveDate, 5) &&
    req.sessionModel.get('otheraddresses')?.aggregatedValues?.length
  );
};

/**
 * Returns the provided value if it is defined, otherwise returns an empty string.
 *
 * @param {*} value - The value to check.
 * @returns {*} The provided value if it is defined, otherwise an empty string.
 */
const getSessionValueOrDefault = value => value || '';

/**
 * Formats the specified fields from the request object, joining their values with a newline character.
 *
 * @param {Object} req - The request object containing the session model.
 * @param {Array<string>} fields - An array of field names to retrieve values for.
 * @returns {string} A newline-separated string of the field values, or an empty string if no valid values are found.
 */
const formatFieldsNewLine = (req, fields) => {
  if (req && Array.isArray(fields) && fields.length > 0) {
    const values = fields.map(field => req.sessionModel.get(field));
    return values.filter(Boolean)?.join('\n');
  }
  return '';
};

const getReplacePersonalisation = req => {
  return {
    why_need_replacement: getSessionValueOrDefault(
      getLabel(
        'replace-licence',
        req.sessionModel.get('replace-licence'),
        replaceTranslation
      )
    ),
    has_licence_stolen: hasValue(
      req.sessionModel.get('steps')?.includes('/police-report')
    ),
    reported_to_police: getSessionValueOrDefault(
      getLabel(
        'replace-police-report',
        req.sessionModel.get('replace-police-report'),
        replaceTranslation
      )
    ),

    police_force: getSessionValueOrDefault(
      req.sessionModel.get('replace-police-force')
    ),
    crime_number: getSessionValueOrDefault(
      req.sessionModel.get('replace-crime-number')
    ),
    name_on_licence: formatFieldsNewLine(req, [
      'replace-title',
      'replace-first-name',
      'replace-middle-name',
      'replace-last-name'
    ]),
    has_licence_number: hasValue(req.sessionModel.get('replace-licence-number')),
    licence_number: getSessionValueOrDefault(req.sessionModel.get('replace-licence-number')),
    date_of_birth: getSessionValueOrDefault(
      getFormattedDate(req.sessionModel.get('replace-date-of-birth'))
    ),
    current_address: getSessionValueOrDefault(
      req.sessionModel.get('homeAddressInline')
    ),
    phone_number: getSessionValueOrDefault(
      req.sessionModel.get('replace-phone-number')
    ),
    email_address: getSessionValueOrDefault(
      req.sessionModel.get('replace-email')
    ),
    has_amended_name: checkYesNo(req.sessionModel.get('replace-name-options')),
    new_name: getSessionValueOrDefault(
      req.sessionModel.get('formattedNewName')
    ),
    identity_document:
      req.sessionModel.get('replace-name-options') === STR_YES
        ? getSessionValueOrDefault(
          getLabel(
            'replace-which-document-type',
            req.sessionModel.get('replace-which-document-type'),
            replaceTranslation
          )
        )
        : '',
    identity_document_number: getSessionValueOrDefault(
      req.sessionModel.get('replace-UK-passport-number') ||
      req.sessionModel.get('replace-EU-passport-number') ||
      req.sessionModel.get('replace-Uk-driving-licence-number')
    ),
    identity_document_attachment: getSessionValueOrDefault(
      getIdentityAttachment(req, [
        'replace-UK-passport-number',
        'replace-EU-passport-number',
        'replace-Uk-driving-licence-number'
      ])
    ),
    has_certificate_conduct:
      req.sessionModel.get('steps')?.includes('/upload-certificate-conduct') &&
        parseDocumentList(req.sessionModel.get('replace-certificate-conduct'))
        ? STR_YES
        : STR_NO,
    certificate_conduct_attachment: getSessionValueOrDefault(
      parseDocumentList(req.sessionModel.get('replace-certificate-conduct'))
    ),
    has_amended_address: checkYesNo(
      req.sessionModel.get('replace-home-address-options')
    ),
    new_address: getSessionValueOrDefault(
      req.sessionModel.get('otherAddressInline')
    ),
    date_moved_to:
      req.sessionModel.get('replace-home-address-options') === STR_YES
        ? getSessionValueOrDefault(
          getFormattedDate(
            req.sessionModel.get('replace-new-date-moved-to-address')
          )
        )
        : '',
    address_proof_attachments: getSessionValueOrDefault(
      parseDocumentList(req.sessionModel.get('replace-proof-address'))
    ),
    has_amended_substances: checkYesNo(
      req.sessionModel.get('replace-change-substances')
    ),
    has_amended_precursor: checkYesNo(req.sessionModel.get('replace-regulated-explosives-precursors')),
    explosive_precursor: getSessionValueOrDefault(
      formatPoisonPrecursorSummary(req, 'precursors-details-aggregate',
        req.sessionModel.get('precursors-details-aggregate'))),
    has_amended_poisons: checkYesNo(req.sessionModel.get('replace-poisons-option')),
    poison_list: getSessionValueOrDefault(
      formatPoisonPrecursorSummary(req, 'poisons-details-aggregate',
        req.sessionModel.get('poisons-details-aggregate'))),
    has_countersignatory_details: hasValue(
      hasCountersignatoryDetails(req, APP_TYPE_REPLACE)
    ),
    countersignatory_title: hasCountersignatoryDetails(req, APP_TYPE_REPLACE)
      ? getSessionValueOrDefault(
        req.sessionModel.get('replace-countersignatory-title')
      )
      : '',
    countersignatory_first_name: hasCountersignatoryDetails(
      req,
      APP_TYPE_REPLACE
    )
      ? getSessionValueOrDefault(
        req.sessionModel.get('replace-countersignatory-firstname')
      )
      : '',
    has_countersignatory_middle_name: hasValue(
      req.sessionModel.get('replace-countersignatory-middlename')
    ),
    countersignatory_middle_name: hasCountersignatoryDetails(
      req,
      APP_TYPE_REPLACE
    )
      ? getSessionValueOrDefault(
        req.sessionModel.get('replace-countersignatory-middlename')
      )
      : '',
    countersignatory_last_name: hasCountersignatoryDetails(
      req,
      APP_TYPE_REPLACE
    )
      ? getSessionValueOrDefault(
        req.sessionModel.get('replace-countersignatory-lastname')
      )
      : '',
    countersignatory_address: hasCountersignatoryDetails(req, APP_TYPE_REPLACE)
      ? getSessionValueOrDefault(
        req.sessionModel.get('counterSignatoryAddress')
      )
      : '',
    countersignatory_phone: hasCountersignatoryDetails(req, APP_TYPE_REPLACE)
      ? getSessionValueOrDefault(
        req.sessionModel.get('replace-countersignatory-phone-number')
      )
      : '',
    countersignatory_email: hasCountersignatoryDetails(req, APP_TYPE_REPLACE)
      ? getSessionValueOrDefault(
        req.sessionModel.get('replace-countersignatory-email')
      )
      : '',
    countersignatory_id_type: hasCountersignatoryDetails(req, APP_TYPE_REPLACE)
      ? getSessionValueOrDefault(
        getLabel(
          'replace-countersignatory-Id-type',
          req.sessionModel.get('replace-countersignatory-Id-type'),
          replaceTranslation
        )
      )
      : '',
    countersignatory_id: hasCountersignatoryDetails(req, APP_TYPE_REPLACE)
      ? getSessionValueOrDefault(
        req.sessionModel.get('replace-countersignatory-UK-passport-number') ||
        req.sessionModel.get(
          'replace-countersignatory-EU-passport-number'
        ) ||
        req.sessionModel.get(
          'replace-countersignatory-Uk-driving-licence-number'
        )
      )
      : '',
    has_birth_certificate:
      getSessionValueOrDefault(req.sessionModel.get('replace-date-of-birth')) &&
        req.sessionModel.get('steps')?.includes('/birth-certificate') &&
        !isDateOlderOrEqualTo(req.sessionModel.get('replace-date-of-birth'), 18)
        ? STR_YES
        : STR_NO,
    birth_certificate_attachment:
      getSessionValueOrDefault(req.sessionModel.get('replace-date-of-birth')) &&
        req.sessionModel.get('steps')?.includes('/birth-certificate') &&
        !isDateOlderOrEqualTo(req.sessionModel.get('replace-date-of-birth'), 18)
        ? parseDocumentList(req.sessionModel.get('replace-birth-certificate'))
        : ''
  };
};

const getAmendPersonalisation = req => {
  return {
    licence_number: getSessionValueOrDefault(
      req.sessionModel.get('amend-licence-number')
    ),
    title: getSessionValueOrDefault(req.sessionModel.get('amend-name-title')),
    first_name: getSessionValueOrDefault(
      req.sessionModel.get('amend-firstname')
    ),
    has_middle_name: hasValue(req.sessionModel.get('amend-middlename')),
    middle_name: getSessionValueOrDefault(
      req.sessionModel.get('amend-middlename')
    ),
    last_name: getSessionValueOrDefault(req.sessionModel.get('amend-lastname')),
    date_of_birth: getSessionValueOrDefault(
      getFormattedDate(req.sessionModel.get('amend-date-of-birth'))
    ),
    current_address: getSessionValueOrDefault(
      req.sessionModel.get('homeAddressInline')
    ),
    phone_number: getSessionValueOrDefault(
      req.sessionModel.get('amend-phone-number')
    ),
    email_address: getSessionValueOrDefault(
      req.sessionModel.get('amend-email')
    ),
    has_amended_name: checkYesNo(req.sessionModel.get('amend-name-options')),
    new_name: getSessionValueOrDefault(
      req.sessionModel.get('formattedNewName')
    ),
    identity_document:
      req.sessionModel.get('amend-name-options') === STR_YES
        ? getSessionValueOrDefault(
          getLabel(
            'amend-applicant-Id-type',
            req.sessionModel.get('amend-applicant-Id-type'),
            amendTranslation
          )
        )
        : '',
    identity_document_number: getSessionValueOrDefault(
      req.sessionModel.get('amend-UK-passport-number') ||
      req.sessionModel.get('amend-EU-passport-number') ||
      req.sessionModel.get('amend-Uk-driving-licence-number')
    ),
    identity_document_attachment: getSessionValueOrDefault(
      getIdentityAttachment(req, [
        'amend-UK-passport-number',
        'amend-EU-passport-number',
        'amend-Uk-driving-licence-number'
      ])
    ),
    has_certificate_conduct:
      req.sessionModel.get('steps')?.includes('/upload-certificate-conduct') &&
        parseDocumentList(req.sessionModel.get('amend-certificate-conduct'))
        ? STR_YES
        : STR_NO,
    certificate_conduct_attachment: getSessionValueOrDefault(
      parseDocumentList(req.sessionModel.get('amend-certificate-conduct'))
    ),
    has_amended_address: checkYesNo(
      req.sessionModel.get('amend-home-address-options')
    ),
    new_address: getSessionValueOrDefault(
      req.sessionModel.get('otherAddressInline')
    ),
    date_moved_to:
      req.sessionModel.get('amend-home-address-options') === STR_YES
        ? getSessionValueOrDefault(
          getFormattedDate(
            req.sessionModel.get('amend-new-date-moved-to-address')
          )
        )
        : '',
    address_proof_attachments: getSessionValueOrDefault(
      parseDocumentList(req.sessionModel.get('amend-proof-address'))
    ),
    has_amended_substances: checkYesNo(
      req.sessionModel.get('amend-change-substances-options')
    ),
    has_amended_precursor: checkYesNo(
      req.sessionModel.get('amend-regulated-explosives-precursors')
    ),
    explosive_precursor: getSessionValueOrDefault(
      formatPoisonPrecursorSummary(req, 'precursors-details-aggregate',
        req.sessionModel.get('precursors-details-aggregate'))),
    has_amended_poisons: checkYesNo(
      req.sessionModel.get('amend-poisons-option')
    ),
    poison_list: getSessionValueOrDefault(
      formatPoisonPrecursorSummary(req, 'poisons-details-aggregate',
        req.sessionModel.get('poisons-details-aggregate'))),
    has_countersignatory_details: hasValue(
      hasCountersignatoryDetails(req, APP_TYPE_AMEND)
    ),

    countersignatory_title: hasCountersignatoryDetails(req, APP_TYPE_AMEND)
      ? getSessionValueOrDefault(
        req.sessionModel.get('amend-countersignatory-title')
      )
      : '',
    countersignatory_first_name: hasCountersignatoryDetails(req, APP_TYPE_AMEND)
      ? getSessionValueOrDefault(
        req.sessionModel.get('amend-countersignatory-firstname')
      )
      : '',
    has_countersignatory_middle_name: hasValue(
      req.sessionModel.get('amend-countersignatory-middlename')
    ),
    countersignatory_middle_name: hasCountersignatoryDetails(
      req,
      APP_TYPE_AMEND
    )
      ? getSessionValueOrDefault(
        req.sessionModel.get('amend-countersignatory-middlename')
      )
      : '',
    countersignatory_last_name: hasCountersignatoryDetails(req, APP_TYPE_AMEND)
      ? getSessionValueOrDefault(
        req.sessionModel.get('amend-countersignatory-lastname')
      )
      : '',
    countersignatory_address: hasCountersignatoryDetails(req, APP_TYPE_AMEND)
      ? getSessionValueOrDefault(
        req.sessionModel.get('counterSignatoryAddress')
      )
      : '',
    countersignatory_phone: hasCountersignatoryDetails(req, APP_TYPE_AMEND)
      ? getSessionValueOrDefault(
        req.sessionModel.get('amend-countersignatory-phone-number')
      )
      : '',
    countersignatory_email: hasCountersignatoryDetails(req, APP_TYPE_AMEND)
      ? getSessionValueOrDefault(
        req.sessionModel.get('amend-countersignatory-email')
      )
      : '',
    countersignatory_id_type: hasCountersignatoryDetails(req, APP_TYPE_AMEND)
      ? getSessionValueOrDefault(
        getLabel(
          'amend-countersignatory-Id-type',
          req.sessionModel.get('amend-countersignatory-Id-type'),
          amendTranslation
        )
      )
      : '',
    countersignatory_id: hasCountersignatoryDetails(req, APP_TYPE_AMEND)
      ? getSessionValueOrDefault(
        req.sessionModel.get('amend-countersignatory-UK-passport-number') ||
        req.sessionModel.get('amend-countersignatory-EU-passport-number') ||
        req.sessionModel.get(
          'amend-countersignatory-Uk-driving-licence-number'
        )
      )
      : '',
    has_birth_certificate:
      getSessionValueOrDefault(req.sessionModel.get('amend-date-of-birth')) &&
        req.sessionModel.get('steps')?.includes('/birth-certificate') &&
        !isDateOlderOrEqualTo(req.sessionModel.get('amend-date-of-birth'), 18)
        ? STR_YES
        : STR_NO,
    birth_certificate_attachment:
      getSessionValueOrDefault(req.sessionModel.get('amend-date-of-birth')) &&
        req.sessionModel.get('steps')?.includes('/birth-certificate') &&
        !isDateOlderOrEqualTo(req.sessionModel.get('amend-date-of-birth'), 18)
        ? parseDocumentList(req.sessionModel.get('amend-birth-certificate'))
        : ''
  };
};

/**
 * Retrieves personalisation data for a new or renewal application.
 *
 * @param {Object} req - The request object containing session data.
 * @param {Object} req.sessionModel - The session model containing application data.
 * @param {function} req.sessionModel.get - Function to get a value from the session model.
 * @returns {Object} An object containing personalisation data for the new or renewal application.
 */
const getNewRenewPersonalisation = req => {
  return {
    licence_number: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-licence-number')
    ),
    title: getSessionValueOrDefault(req.sessionModel.get('new-renew-title')),
    first_name: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-first-name')
    ),
    has_middle_name: hasValue(req.sessionModel.get('new-renew-middle-name')),
    middle_name: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-middle-name')
    ),
    last_name: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-last-name')
    ),
    has_other_names: checkYesNo(req.sessionModel.get('new-renew-other-names')),
    other_names: getSessionValueOrDefault(
      formatSectionSummaryItems(req.sessionModel.get('othernames'))
    ),
    date_of_birth: getSessionValueOrDefault(
      getFormattedDate(req.sessionModel.get('new-renew-dob'))
    ),
    place_of_birth: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-birth-place')
    ),
    country_of_birth: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-birth-country')
    ),
    country_of_nationality: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-country-nationality')
    ),
    has_other_nationality: checkYesNo(
      req.sessionModel.get('new-renew-more-nationalities')
    ),
    sex: getSessionValueOrDefault(
      getLabel(
        'new-renew-your-sex',
        req.sessionModel.get('new-renew-your-sex'),
        newRenewTranslation
      )
    ),
    height: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-your-height')
    ),
    occupation: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-occupation')
    ),
    other_nationality: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-other-country-nationality')
    ),
    current_address: getSessionValueOrDefault(
      req.sessionModel.get('homeAddressInline')
    ),
    moved_date: getSessionValueOrDefault(
      getFormattedDate(
        req.sessionModel.get('new-renew-home-address-moveto-date')
      )
    ),
    proof_of_address: getSessionValueOrDefault(
      parseDocumentList(req.sessionModel.get('new-renew-proof-address'))
    ),
    has_previous_address: hasValue(hasPreviousAddress(req)),
    previous_addresses: getSessionValueOrDefault(
      formatSectionSummaryItems(req.sessionModel.get('otheraddresses'))
    ),
    phone_number: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-phone-number')
    ),
    email_address: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-email')
    ),
    identity_document: getSessionValueOrDefault(
      getLabel(
        'new-renew-applicant-Id-type',
        req.sessionModel.get('new-renew-applicant-Id-type'),
        newRenewTranslation
      )
    ),
    identity_document_number: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-UK-passport-number') ||
      req.sessionModel.get('new-renew-EU-passport-number') ||
      req.sessionModel.get('new-renew-Uk-driving-licence-number')
    ),
    identity_document_attachment: getSessionValueOrDefault(
      getIdentityAttachment(req, [
        'new-renew-UK-passport-number',
        'new-renew-EU-passport-number',
        'new-renew-Uk-driving-licence-number'
      ])
    ),
    has_certificate_conduct:
      req.sessionModel.get('steps')?.includes('/upload-certificate-conduct') &&
        parseDocumentList(req.sessionModel.get('new-renew-certificate-conduct'))
        ? STR_YES
        : STR_NO,
    certificate_conduct_attachment: getSessionValueOrDefault(
      parseDocumentList(req.sessionModel.get('new-renew-certificate-conduct'))
    ),
    firearms_licence: getSessionValueOrDefault(
      getLabel(
        'new-renew-other-firearms-licence',
        req.sessionModel.get('new-renew-other-firearms-licence'),
        newRenewTranslation
      )
    ),
    shotgun_licence: getSessionValueOrDefault(
      getLabel(
        'new-renew-other-shotgun-licence',
        req.sessionModel.get('new-renew-other-shotgun-licence'),
        newRenewTranslation
      )
    ),
    licence_refused: getSessionValueOrDefault(
      getLabel(
        'new-renew-other-refused-licence',
        req.sessionModel.get('new-renew-other-refused-licence'),
        newRenewTranslation
      )
    ),
    has_criminal_record:
      req.sessionModel.get('steps')?.includes('/criminal-record') &&
        req.sessionModel.get('new-renew-have-criminal-record') === STR_YES
        ? STR_YES
        : STR_NO,
    criminal_record: getSessionValueOrDefault(
      getLabel(
        'new-renew-have-criminal-record',
        req.sessionModel.get('new-renew-have-criminal-record'),
        newRenewTranslation
      )
    ),
    criminal_offences: getSessionValueOrDefault(
      formatSectionSummaryItems(req.sessionModel.get('criminalrecordsummary'))
    ),
    treatment_health_problem: getSessionValueOrDefault(
      getLabel(
        'new-renew-has-seen-doctor',
        req.sessionModel.get('new-renew-has-seen-doctor'),
        newRenewTranslation
      )
    ),
    treatment_drug_alcohol: getSessionValueOrDefault(
      getLabel(
        'new-renew-received-treatment',
        req.sessionModel.get('new-renew-received-treatment'),
        newRenewTranslation
      )
    ),
    doctor_details: formatFieldsNewLine(req, [
      'new-renew-doctor-name',
      'new-renew-doctor-address-line-1',
      'new-renew-doctor-address-line-2',
      'new-renew-doctor-town-city',
      'new-renew-doctor-county',
      'new-renew-doctor-postcode',
      'new-renew-doctor-country'
    ]),
    has_medical_form:
      req.sessionModel.get('steps')?.includes('/medical-form') &&
        parseDocumentList(req.sessionModel.get('new-renew-medical-form'))
        ? STR_YES
        : STR_NO,
    medical_form_attachment:
      req.sessionModel.get('steps')?.includes('/medical-form') &&
        parseDocumentList(req.sessionModel.get('new-renew-medical-form'))
        ? parseDocumentList(req.sessionModel.get('new-renew-medical-form'))
        : '',
    has_explosive_precursor: checkYesNo(
      req.sessionModel.get('new-renew-regulated-explosives-precursors-options')
    ),
    explosive_precursor: getSessionValueOrDefault(
      formatPoisonPrecursorSummary(req, 'precursors-details-aggregate',
        req.sessionModel.get('precursors-details-aggregate'))),
    has_poisons: checkYesNo(req.sessionModel.get('new-renew-poisons-options')),
    poisons: getSessionValueOrDefault(
      formatPoisonPrecursorSummary(req, 'poisons-details-aggregate',
        req.sessionModel.get('poisons-details-aggregate'))),
    countersignatory_title: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-countersignatory-title')
    ),
    countersignatory_first_name: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-countersignatory-firstname')
    ),
    has_countersignatory_middle_name: hasValue(
      req.sessionModel.get('new-renew-countersignatory-middlename')
    ),
    countersignatory_middle_name: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-countersignatory-middlename')
    ),
    countersignatory_last_name: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-countersignatory-lastname')
    ),
    countersignatory_address: getSessionValueOrDefault(
      req.sessionModel.get('counterSignatoryAddress')
    ),
    countersignatory_phone: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-countersignatory-phone-number')
    ),
    countersignatory_email: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-countersignatory-email')
    ),
    countersignatory_id_type: getSessionValueOrDefault(
      getLabel(
        'new-renew-countersignatory-Id-type',
        req.sessionModel.get('new-renew-countersignatory-Id-type'),
        newRenewTranslation
      )
    ),
    countersignatory_id: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-countersignatory-UK-passport-number') ||
      req.sessionModel.get('new-renew-countersignatory-EU-passport-number') ||
      req.sessionModel.get(
        'new-renew-countersignatory-Uk-driving-licence-number'
      )
    ),
    has_birth_certificate:
      getSessionValueOrDefault(req.sessionModel.get('new-renew-dob')) &&
        req.sessionModel.get('steps')?.includes('/birth-certificate') &&
        !isDateOlderOrEqualTo(req.sessionModel.get('new-renew-dob'), 18)
        ? STR_YES
        : STR_NO,
    birth_certificate_attachment:
      getSessionValueOrDefault(req.sessionModel.get('new-renew-dob')) &&
        req.sessionModel.get('steps')?.includes('/birth-certificate') &&
        !isDateOlderOrEqualTo(req.sessionModel.get('new-renew-dob'), 18)
        ? parseDocumentList(req.sessionModel.get('new-renew-birth-certificate'))
        : ''
  };
};

module.exports = {
  getPdfTitle: getPdfTitle,
  formatSectionSummaryItems: formatSectionSummaryItems,
  parseDocumentList: parseDocumentList,
  getLabel: getLabel,
  getTemplateId: getTemplateId,
  getUserEmail: getUserEmail,
  getIdentityAttachment: getIdentityAttachment,
  checkYesNo: checkYesNo,
  hasValue: hasValue,
  hasCountersignatoryDetails: hasCountersignatoryDetails,
  hasPreviousAddress: hasPreviousAddress,
  getSessionValueOrDefault: getSessionValueOrDefault,
  getReplacePersonalisation: getReplacePersonalisation,
  getAmendPersonalisation: getAmendPersonalisation,
  getNewRenewPersonalisation: getNewRenewPersonalisation,
  STR_YES: STR_YES,
  STR_NO: STR_NO,
  USER: USER,
  BUSINESS: BUSINESS,
  formatFieldsNewLine: formatFieldsNewLine,
  formatPoisonPrecursorSummary
};
