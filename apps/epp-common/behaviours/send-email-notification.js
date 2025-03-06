const { govukNotify } = require('../../../config');

const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyKey = govukNotify.notifyApiKey;
const notifyClient = new NotifyClient(notifyKey);

const newRenewTranslation = require('../../epp-new/translations/src/en/fields.json');
const amendTranslation = require('../../epp-amend/translations/src/en/fields.json');
const replaceTranslation = require('../../epp-replace/translations/src/en/fields.json');

const {
  isDateOlderOrEqualTo,
  getFormattedDate
} = require('../../../utilities/helpers');

const USER = 'user';
const BUSINESS = 'business';

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
      applicationType === 'replace' &&
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

const getNewRenewPersonalisation = req => {
  return {
    licence_number: req.sessionModel.get('new-renew-licence-number'),
    title: req.sessionModel.get('new-renew-title'),
    first_name: req.sessionModel.get('new-renew-first-name'),
    has_middle_name: req.sessionModel.get('new-renew-middle-name')
      ? 'yes'
      : 'no',
    middle_name: req.sessionModel.get('new-renew-middle-name'),
    last_name: req.sessionModel.get('new-renew-last-name'),
    has_other_names:
      req.sessionModel.get('new-renew-other-names') === 'yes' ? 'yes' : 'no',
    other_names: formatSectionSummaryItems(req.sessionModel.get('othernames')),
    date_of_birth: getFormattedDate(req.sessionModel.get('new-renew-dob')),
    place_of_birth: req.sessionModel.get('new-renew-birth-place'),
    country_of_birth: req.sessionModel.get('new-renew-birth-country'),
    country_of_nationality: req.sessionModel.get(
      'new-renew-country-nationality'
    ),
    has_other_nationality:
      req.sessionModel.get('new-renew-more-nationalities') === 'yes'
        ? 'yes'
        : 'no',
    sex: req.sessionModel.get('new-renew-your-sex'),
    height: req.sessionModel.get('new-renew-your-height'),
    occupation: req.sessionModel.get('new-renew-occupation'),
    other_nationality:
      req.sessionModel.get('new-renew-other-country-nationality') || '',
    current_address: req.sessionModel.get('homeAddressInline'),
    moved_date: req.sessionModel.get('new-renew-home-address-moveto-date'),
    proof_of_address: parseDocumentList(
      req.sessionModel.get('new-renew-proof-address')
    ),
    has_previous_address: 'no', // TODO: where to get it
    previous_addresses: '', // TODO: Format previous addresses
    phone_number: req.sessionModel.get('new-renew-phone-number'),
    email_address: req.sessionModel.get('new-renew-email'),
    identity_document: 'TBD', // TODO: refactor here and also on notify to look for all possible values
    identity_document_number: 'TBD', // TODO: refactor here and also on notify to look for all possible values
    identity_document_attachment: 'TBD', // TODO: refactor here and also on notify to look for all possible values
    has_certificate_conduct:
      req.sessionModel.get('new-renew-dob') &&
      !isDateOlderOrEqualTo(req.sessionModel.get('new-renew-dob'), 18)
        ? 'yes'
        : 'no',
    certificate_conduct_attachment: '',
    firearms_licence: getLabel(
      'new-renew-other-firearms-licence',
      req.sessionModel.get('new-renew-other-firearms-licence'),
      newRenewTranslation
    ),
    shotgun_licence: getLabel(
      'new-renew-other-shotgun-licence',
      req.sessionModel.get('new-renew-other-shotgun-licence'),
      newRenewTranslation
    ),
    licence_refused: getLabel(
      'new-renew-other-refused-licence',
      req.sessionModel.get('new-renew-other-refused-licence'),
      newRenewTranslation
    ),
    has_criminal_record: req.sessionModel
      .get('steps')
      .includes('/criminal-record')
      ? 'yes'
      : 'no',
    criminal_offences: 'TBD', // TODO: fetch and format
    explosive_precursor: 'TBD', // TODO: fetch and format
    poisons: 'TBD', // TODO: fetch and format
    countersignatory_title: req.sessionModel.get(
      'new-renew-countersignatory-title'
    ),
    countersignatory_first_name: req.sessionModel.get(
      'new-renew-countersignatory-firstname'
    ),
    has_countersignatory_middle_name: req.sessionModel.get(
      'new-renew-countersignatory-middlename'
    )
      ? 'yes'
      : 'no',
    countersignatory_middle_name: req.sessionModel.get(
      'new-renew-countersignatory-middlename'
    ),
    countersignatory_last_name: req.sessionModel.get(
      'new-renew-countersignatory-lastname'
    ),
    countersignatory_address: 'TBD', // TODO: Format inlin address
    countersignatory_phone: req.sessionModel.get(
      'new-renew-countersignatory-phone-number'
    ),
    countersignatory_email: req.sessionModel.get(
      'new-renew-countersignatory-email'
    ),
    countersignatory_id_type: 'TBD', // TODO: Format here and also update the template
    countersignatory_id: 'TBD' // TODO: Format here and also update the template
  };
};
const getAmendPersonalisation = req => {
  return {
    licence_number: req.sessionModel.get('amend-licence-number')
  };
};
const getReplacePersonalisation = req => {
  return {
    licence_number: req.sessionModel.get('amend-licence-number')
  };
};

const getPersonalisation = (req, applicationType, recipientType) => {
  if (recipientType === USER) {
    // only pdf link for user templates
    return {};
  }
  switch (applicationType) {
    case 'new':
    case 'renew':
      return getNewRenewPersonalisation(req);

    case 'amend':
      return getAmendPersonalisation(req);

    case 'replace':
      return getReplacePersonalisation(req);

    default:
      throw Error(`Unknown application type: ${applicationType}`);
  }
};

module.exports = class SendEmailConfirmation {
  async sendEmailNotification(req, recipientType) {
    const applicationType = req.sessionModel.get('applicationType');

    if (!applicationType) {
      const errorMessage = `Invalid application Type: ${applicationType}`;
      req.log('error', errorMessage);
      throw Error(errorMessage);
    }

    const templateId = getTemplateId(req, applicationType, recipientType);

    const recipientEmailAddress =
      recipientType === USER
        ? req.sessionModel.get(getUserEmail(applicationType))
        : govukNotify.caseworkerEmail;

    const userOrBusinessStr = () =>
      recipientType === USER ? 'User' : 'Business';

    const emailReplyToId = govukNotify.replyToEmailID;

    const personalisation = getPersonalisation(
      req,
      applicationType,
      recipientType
    );

    req.log(personalisation);

    try {
      await notifyClient.sendEmail(templateId, recipientEmailAddress, {
        personalisation: Object.assign({}, personalisation),
        emailReplyToId
      });

      req.log(
        'info',
        `${userOrBusinessStr()} Confirmation Email sent successfully`
      );
    } catch (err) {
      const errorDetails = err.response?.data
        ? `Cause: ${JSON.stringify(err.response.data)}`
        : '';
      const errorCode = err.code ? `${err.code} -` : '';
      const errorMessage = `${errorCode} ${err.message}; ${errorDetails}`;

      req.log(
        'error',
        `Failed to send ${userOrBusinessStr()} Confirmation Email`,
        errorMessage
      );
      throw Error(errorMessage);
    }
  }

  async send(req) {
    try {
      await this.sendEmailNotification(req, USER);
      await this.sendEmailNotification(req, BUSINESS);

      req.log(
        'info',
        'Request to send notification emails completed successfully.'
      );
    } catch (err) {
      req.log('error', `Failed to send all notifications emails. ${err}`);
      throw err;
    }
  }
};
