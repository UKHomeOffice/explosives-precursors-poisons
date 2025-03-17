'use strict';

const env = process.env.NODE_ENV || 'production';

module.exports = {
  PRETTY_DATE_FORMAT: 'DD MMMM YYYY',
  dateTimeFormat: 'DD MMM YYYY HH:mm:ss',
  dateLocales: 'en-GB',
  dateFormat: {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  },
  env: env,
  govukNotify: {
    notifyApiKey: process.env.NOTIFY_STUB === 'true' ? 'USE_MOCK' : process.env.NOTIFY_KEY,
    caseworkerEmail: process.env.CASEWORKER_EMAIL,
    replyToEmailID: process.env.REPLY_TO_EMAIL_ID,
    newApplicationUserTemplateId: process.env.NEW_APPLICATION_USER_TEMPLATE_ID,
    newApplicationBusinessTemplateId: process.env.NEW_APPLICATION_BUSINESS_TEMPLATE_ID,
    renewApplicationUserTemplateId: process.env.RENEW_APPLICATION_USER_TEMPLATE_ID,
    renewApplicationBusinessTemplateId: process.env.RENEW_APPLICATION_BUSINESS_TEMPLATE_ID,
    amendApplicationUserTemplateId: process.env.AMEND_APPLICATION_USER_TEMPLATE_ID,
    amendApplicationBusinessTemplateId: process.env.AMEND_APPLICATION_BUSINESS_TEMPLATE_ID,
    replaceApplicationUserTemplateId: process.env.REPLACE_APPLICATION_USER_TEMPLATE_ID,
    replaceDamagedApplicationUserTemplateId: process.env.REPLACE_DAMAGED_APPLICATION_USER_TEMPLATE_ID,
    replaceApplicationBusinessTemplateId: process.env.REPLACE_APPLICATION_BUSINESS_TEMPLATE_ID
  },
  // TODO: set return URL and mac in env variables
  feedback: {
    url: 'https://www.hof-feedback.homeoffice.gov.uk',
    form: Buffer.from('EPP', 'utf8').toString('hex'),
    returnUrl: Buffer.from('', 'utf8').toString('hex'),
    mac: ''
  },
  hosts: {
    acceptanceTests:
      process.env.ACCEPTANCE_HOST_NAME ||
      `http://localhost:${process.env.PORT || 8080}`
  },
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || '127.0.0.1'
  },
  keycloak: {
    token: process.env.KEYCLOAK_TOKEN_URL,
    username: process.env.KEYCLOAK_USERNAME,
    password: process.env.KEYCLOAK_PASSWORD,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_SECRET
  },
  upload: {
    maxFileSizeInBytes: 25 * 1000 * 1000, // 25MB in bytes
    hostname: process.env.FILE_VAULT_URL,
    allowedMimeTypes: [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'application/pdf'
    ],
    documentCategories: {
      'new-renew-british-passport': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxNewRenewBritishPassport'
      },
      'amend-british-passport': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxAmendBritishPassport'
      },
      'new-renew-eu-passport': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxNewRenewEuPassport'
      },
      'amend-eu-passport': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxAmendPassport'
      },
      'amend-certificate-conduct': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxAmendCertificateConduct'
      },
      'amend-uk-driving-licence': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxAmendDrivingLicence'
      },
      'new-renew-proof-address': {
        allowMultipleUploads: true,
        limit: 2,
        limitValidationError: 'maxNewRenewProofAddress'
      },
      'amend-proof-address': {
        allowMultipleUploads: true,
        limit: 2,
        limitValidationError: 'maxAmendProofAddress'
      },
      'amend-birth-certificate': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxAmendBirthCertificate'
      },
      'new-renew-upload-driving-licence': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxNewRenewDrivingLicence'
      },
      'new-renew-medical-form': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxNewRenewMedicalForm'
      },
      'new-renew-certificate-conduct': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxNewRenewCertificateConduct'
      },
      'new-renew-birth-certificate': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxNewRenewBirthCertificate'
      },
      'replace-british-passport': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxReplaceBritishPassport'
      },
      'replace-eu-passport': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxReplaceEuPassport'
      },
      'replace-upload-driving-licence': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxReplaceDrivingLicence'
      },
      'replace-proof-address': {
        allowMultipleUploads: true,
        limit: 2,
        limitValidationError: 'maxReplaceProofAddress'
      },
      'replace-certificate-conduct': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxReplaceCertificateConduct'
      },
      'replace-birth-certificate': {
        allowMultipleUploads: false,
        limit: 1,
        limitValidationError: 'maxReplaceBirthCertificate'
      }
    }
  },
  sectionDetails: {
    totalStepsNew: 20,
    totalStepsRenew: 21
  },
  postCodeCountriesMap: {
    'amend-postcode': 'amend-country',
    'new-renew-home-address-postcode': 'new-renew-home-address-country',
    'new-renew-previous-home-address-postcode': 'new-renew-previous-home-address-country',
    'amend-new-postcode': 'amend-new-country'
  },
  payment: {
    CREATE_PAYMENT_ENDPOINT: 'https://publicapi.payments.service.gov.uk/v1/payments',
    GET_PAYMENT_INFO_ENDPOINT: 'https://publicapi.payments.service.gov.uk/v1/payments/',
    NEW_LICENCE_PAYMENT_DESCRIPTION: 'New Explosives Precursors and Poisons Licence',
    RENEW_LICENCE_PAYMENT_DESCRIPTION: 'Renew Explosives Precursors and Poisons Licence',
    REPLACE_LICENCE_PAYMENT_DESCRIPTION: 'Replace Explosives Precursors and Poisons Licence',
    AMOUNT_NEW: 3950,
    AMOUNT_RENEW: 3950,
    AMOUNT_REPLACE: 2500,
    govUkApiKey: process.env.GOV_PAY_KEY
  }
};
