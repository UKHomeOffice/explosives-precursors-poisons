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
const formatSectionSummaryItems = items => {
  return items
    ? items.aggregatedValues
        .map(({ fields }) => fields.map(({ parsed }) => parsed).join('\n'))
        .join('\n\n ---\n^')
    : '';
};

const parseDocumentList = documents => {
  return Array.isArray(documents)
    ? documents.map(doc => `[${doc.name}](${doc.url})`).join('\n')
    : '';
};

const getLabel = (fieldKey, fieldValue, translation) => {
  if (Array.isArray(fieldValue)) {
    return fieldValue
      .map(option => translation[fieldKey].options[option].label)
      .join(', ');
  }
  return translation[fieldKey]?.options[fieldValue]?.label;
};

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
      req.sessionModel.get('replace-replacement-reason') === 'damaged'
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

const getUserEmail = applicationType => {
  const appUserEmailMap = {
    new: 'new-renew-email',
    renew: 'new-renew-email',
    amend: 'amend-email',
    replace: 'replace-email'
  };

  return appUserEmailMap[applicationType];
};

const getIdentityAttachment = (req, idFields) => {
  const fieldMap = {
    'new-renew-UK-passport-number': 'new-renew-british-passport',
    'new-renew-EU-passport-number': 'new-renew-eu-passport',
    'new-renew-Uk-driving-licence-number': 'new-renew-upload-driving-licence',
    'amend-UK-passport-number': 'amend-british-passport',
    'amend-EU-passport-number': 'amend-eu-passport',
    'amend-Uk-driving-licence-number': 'amend-uk-driving-licence'
  };

  for (const idField of idFields) {
    if (req.sessionModel.get(idField)) {
      return parseDocumentList(req.sessionModel.get(fieldMap[idField]) || '');
    }
  }

  return '';
};

const checkYesNo = value => (value === STR_YES ? STR_YES : STR_NO);

const hasValue = value => (value ? STR_YES : STR_NO);

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

const getSessionValueOrDefault = value => value || '';

// TODO: Validate all fields when pages are built
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
      req.sessionModel.get('steps').includes('/police-report')
    ),
    reported_to_police: getSessionValueOrDefault(
      getLabel(
        'replace-police-report',
        req.sessionModel.get('replace-police-report'),
        replaceTranslation
      )
    ),

    police_force: getSessionValueOrDefault(req.sessionModel.get('TBD')),
    crime_number: getSessionValueOrDefault(req.sessionModel.get('TBD')),
    name_on_licence: getSessionValueOrDefault(req.sessionModel.get('TBD')),
    date_of_birth: getSessionValueOrDefault(
      getFormattedDate(req.sessionModel.get('replace-date-of-birth'))
    ),
    current_address: getSessionValueOrDefault(req.sessionModel.get('TBD')),
    phone_number: getSessionValueOrDefault(
      req.sessionModel.get('replace-phone-number')
    ),
    email_address: getSessionValueOrDefault(
      req.sessionModel.get('replace-email')
    ),
    has_amended_name: checkYesNo(req.sessionModel.get('TBD')),
    new_name: '', // TODO format the values
    identity_document:
      req.sessionModel.get('TBD') === STR_YES
        ? getSessionValueOrDefault(
            getLabel('TBD', req.sessionModel.get('TBD'), replaceTranslation)
          )
        : '',
    identity_document_number: getSessionValueOrDefault(
      req.sessionModel.get('TBD') ||
        req.sessionModel.get('TBD') ||
        req.sessionModel.get('TBD')
    ),
    identity_document_attachment: getSessionValueOrDefault(
      getIdentityAttachment(req, ['TBD', 'TBD', 'TBD'])
    ),
    has_amended_address: checkYesNo(req.sessionModel.get('TBD')),
    new_address: '', // TODO: save and format new address
    date_moved_to:
      req.sessionModel.get('TBD') === STR_YES
        ? getSessionValueOrDefault(req.sessionModel.get('TBD'))
        : '',
    address_proof_attachments: getSessionValueOrDefault(
      parseDocumentList(req.sessionModel.get('TBD'))
    ),
    has_amended_substances: STR_YES, // TODO: Page to be developed
    explosive_precursor: '', // TODO: from section summary
    has_amended_poisons: STR_YES, // TODO: Page to be developed
    poison_list: '', // TODO: from summary page
    has_countersignatory_details: hasValue(
      hasCountersignatoryDetails(req, APP_TYPE_REPLACE)
    ),
    countersignatory_title: hasCountersignatoryDetails(req, APP_TYPE_REPLACE)
      ? getSessionValueOrDefault(req.sessionModel.get('TBD'))
      : '',
    countersignatory_first_name: hasCountersignatoryDetails(
      req,
      APP_TYPE_REPLACE
    )
      ? getSessionValueOrDefault(req.sessionModel.get('TBD'))
      : '',
    has_countersignatory_middle_name:
      hasCountersignatoryDetails(req, APP_TYPE_REPLACE) &&
      hasValue(req.sessionModel.get('TBD')),
    countersignatory_middle_name: hasCountersignatoryDetails(
      req,
      APP_TYPE_REPLACE
    )
      ? getSessionValueOrDefault(req.sessionModel.get('TBD'))
      : '',
    countersignatory_last_name: hasCountersignatoryDetails(
      req,
      APP_TYPE_REPLACE
    )
      ? getSessionValueOrDefault(req.sessionModel.get('TBD'))
      : '',
    countersignatory_address: 'TBD', // TODO: Format inline address
    countersignatory_phone: hasCountersignatoryDetails(req, APP_TYPE_REPLACE)
      ? getSessionValueOrDefault(req.sessionModel.get('TBD'))
      : '',
    countersignatory_email: hasCountersignatoryDetails(req, APP_TYPE_REPLACE)
      ? getSessionValueOrDefault(req.sessionModel.get('TBD'))
      : '',
    countersignatory_id_type: hasCountersignatoryDetails(req, APP_TYPE_REPLACE)
      ? getSessionValueOrDefault(
          getLabel('TBD', req.sessionModel.get('TBD'), replaceTranslation)
        )
      : '',
    countersignatory_id: hasCountersignatoryDetails(req, APP_TYPE_REPLACE)
      ? getSessionValueOrDefault(
          req.sessionModel.get('TBD') ||
            req.sessionModel.get('TBD') ||
            req.sessionModel.get('TBD')
        )
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
    new_name: '', // TODO format the values
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
    has_amended_address: checkYesNo(
      req.sessionModel.get('amend-home-address-options')
    ),
    new_address: '', // TODO: save and format new address
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
    has_amended_substances: STR_YES, // TODO: Page to be developed
    explosive_precursor: '', // TODO: from section summary
    has_amended_poisons: STR_YES, // TODO: Page to be developed
    poison_list: '', // TODO: from summary page
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
    has_countersignatory_middle_name:
      hasCountersignatoryDetails(req, APP_TYPE_AMEND) &&
      hasValue(req.sessionModel.get('amend-countersignatory-middlename')),
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
    countersignatory_address: 'TBD', // TODO: Format inline address
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
      : ''
  };
};

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
      req.sessionModel.get('new-renew-dob') &&
      hasValue(
        !isDateOlderOrEqualTo(req.sessionModel.get('new-renew-dob'), 18)
      ),
    certificate_conduct_attachment:
      getSessionValueOrDefault(req.sessionModel.get('new-renew-dob')) &&
      !isDateOlderOrEqualTo(req.sessionModel.get('new-renew-dob'), 18)
        ? parseDocumentList(req.sessionModel.get('new-renew-birth-certificate'))
        : '',
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
    has_criminal_record: req.sessionModel
      .get('steps')
      .includes('/criminal-record')
      ? STR_YES
      : STR_NO,
    criminal_offences: 'TBD', // TODO: fetch and format
    explosive_precursor: 'TBD', // TODO: fetch and format
    poisons: 'TBD', // TODO: fetch and format
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
    countersignatory_address: 'TBD', // TODO: Format inline address
    countersignatory_phone: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-countersignatory-phone-number')
    ),
    countersignatory_email: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-countersignatory-email')
    ),
    countersignatory_id_type: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-countersignatory-Id-type')
    ), // TODO: confirm field names when id page is done
    countersignatory_id: getSessionValueOrDefault(
      req.sessionModel.get('new-renew-countersignatory-UK-passport-number') ||
        req.sessionModel.get('new-renew-countersignatory-EU-passport-number') ||
        req.sessionModel.get(
          'new-renew-countersignatory-Uk-driving-licence-number'
        )
    ) // TODO: confirm field names when id page is done
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
  BUSINESS: BUSINESS
};
