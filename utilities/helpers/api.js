/* eslint-disable camelcase */
const { model: Model } = require('hof');
const crypto = require('crypto');
const { payment, env } = require('../../config');
const logger = require('hof/lib/logger')({ env });

const {
  APP_TYPE_NEW,
  APP_TYPE_RENEW,
  APP_TYPE_REPLACE,
  PATH_NEW_AND_RENEW,
  PATH_REPLACE
} = require('../constants/string-constants');

const generateRandomId = () => crypto.randomBytes(16).toString('hex');

const generateHmac = randomId => {
  return crypto
    .createHmac('sha256', payment.govUkApiKey)
    .update(randomId)
    .digest('hex');
};

async function initiatePayment({
  amount,
  reference,
  description,
  return_url,
  token,
  billing_address,
  email,
  metadata
}) {
  try {
    const model = new Model();
    const params = {
      url: payment.CREATE_PAYMENT_ENDPOINT,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payment.govUkApiKey}`
      },
      data: {
        amount,
        reference,
        description,
        return_url: `${return_url}/?token=${token}`,
        delayed_capture: false,
        metadata,
        prefilled_cardholder_details: {
          billing_address
        },
        email,
        language: 'en'
      }
    };

    const { data } = await model._request(params);

    return data;
  } catch (error) {
    logger.error(`Error creating a payment request : ${error}`);
    throw new Error('Error creating a payment request');
  }
}

async function getPaymentDetails(paymentId) {
  try {
    const model = new Model();
    const params = {
      url: `${payment.GET_PAYMENT_INFO_ENDPOINT}${paymentId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${payment.govUkApiKey}`
      }
    };
    const { data } = await model._request(params);

    return data;
  } catch (error) {
    logger.error(`Error getting the payment details : ${error}`);
    throw new Error('Error getting the payment details');
  }
}

const generateRequestPayload = (req, applicationType, hmac) => {
  const return_url = `${req.protocol}://${req.get('host')}${
    applicationType === APP_TYPE_REPLACE ? PATH_REPLACE : PATH_NEW_AND_RENEW
  }/application-submitted`;

  if (applicationType === APP_TYPE_NEW || applicationType === APP_TYPE_RENEW) {
    return {
      amount:
        applicationType === APP_TYPE_NEW
          ? payment.AMOUNT_NEW
          : payment.AMOUNT_RENEW,
      reference:
        applicationType === APP_TYPE_NEW
          ? 'New payment Reference'
          : 'Renew payment reference',
      description:
        applicationType === APP_TYPE_NEW
          ? 'New payment description'
          : 'Renew payment description',
      return_url,
      token: hmac,
      metadata: {
        custom_metadata_key1: 'custom_metadata_value1',
        custom_metadata_key2: 'custom_metadata_value2'
      },
      billing_address: {
        line1: req.sessionModel.get('new-renew-home-address-line1'),
        line2: req.sessionModel.get('new-renew-home-address-line2'),
        postcode: req.sessionModel.get('new-renew-home-address-postcode'),
        city: req.sessionModel.get('new-renew-home-address-town'),
        country: req.sessionModel.get('new-renew-home-address-country')
      },
      email: req.sessionModel.get('new-renew-email')
    };
  }

  if (applicationType === APP_TYPE_REPLACE) {
    return {
      amount: payment.AMOUNT_REPLACE,
      reference: 'Replace payment reference',
      description: 'Replace payment description',
      return_url,
      token: hmac,
      metadata: {
        custom_metadata_key1: 'custom_metadata_value1',
        custom_metadata_key2: 'custom_metadata_value2'
      },
      // TODO: Discuss which address to pick if users change the address
      billing_address: {
        line1: req.sessionModel.get('replace-home-address-1'),
        line2: req.sessionModel.get('replace-home-address-2'),
        postcode: req.sessionModel.get('replace-home-postcode'),
        city: req.sessionModel.get('replace-home-town-or-city'),
        country: req.sessionModel.get('replace-home-county')
      },
      email: req.sessionModel.get('replace-email')
    };
  }
  logger.error(
    `Application type ${applicationType} not supported for the payment`
  );
  throw new Error('Unknown application type');
};

const getErrorTemplateBasePath = applicationType => {
  if (applicationType === APP_TYPE_NEW || applicationType === APP_TYPE_RENEW) {
    return PATH_NEW_AND_RENEW;
  }

  if (applicationType === APP_TYPE_REPLACE) {
    return PATH_REPLACE;
  }
  logger.error(
    `Application type ${applicationType} not supported for the payment`
  );
  throw new Error('Unknown application type');
};

module.exports = {
  initiatePayment,
  getPaymentDetails,
  generateRandomId,
  generateHmac,
  generateRequestPayload,
  getErrorTemplateBasePath
};
