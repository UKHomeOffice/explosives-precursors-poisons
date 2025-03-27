/* eslint-disable camelcase */
const { model: Model } = require('hof');
const crypto = require('crypto');
const { payment, env } = require('../../config');
const logger = require('hof/lib/logger')({ env });

const {
  APP_TYPE_NEW,
  APP_TYPE_RENEW,
  APP_TYPE_REPLACE,
  PATH_REPLACE,
  API_METHODS,
  PATH_APPLICATION_SUBMITTED,
  PATH_NEW_RENEW,
  PATH_REPLACE_APPLICATION_SUBMITTED
} = require('../constants/string-constants');

const { getCryptoRandomString } = require('./crypto-random-string');

/**
 * Generates a random ID using crypto
 * @returns {string} - A random ID
 */
const generateRandomId = () => crypto.randomBytes(16).toString('hex');

/**
 * Generates a HMAC using random ID and gov pay key
 * @param {string} randomId - The random id
 * @returns {string} - Generated HMAC
 */

const generateHmac = randomId => {
  return crypto
    .createHmac('sha256', payment.govUkApiKey)
    .update(randomId)
    .digest('hex');
};

/**
 * Initiates the payment request
 * @param {Object} params = The payment parameters as request payload
 * @param {number} params.amount - The amount for the payment
 * @param {string} params.reference - The payment reference
 * @param {string} params.description - The payment description
 * @param {string} params.return_url - The return url after payment is completed
 * @param {string} params.token - The payment token to validate the return url
 * @param {Object | undefined} params.billing_address - Billing address
 * @returns {Promise<Object>} - The payment response data
 * @throws {Error} - If there is any error during initiating the payment request
 */

async function initiatePayment({
  amount,
  reference,
  description,
  return_url,
  token,
  billing_address,
  email
}) {
  try {
    const model = new Model();
    const params = {
      url: payment.CREATE_PAYMENT_ENDPOINT,
      method: API_METHODS.POST,
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
    logger.error(
      `Error creating a payment request : ${error.message ?? error}`
    );
    throw new Error('Error creating a payment request');
  }
}

/**
 * Fetch payment details for a given payment id
 * @param {string} paymentId = The payment id
 * @returns {Promise<Object>} - Payment details
 * @throws {Error} - If there is any error during get payment details
 */

async function getPaymentDetails(paymentId) {
  try {
    const model = new Model();
    const params = {
      url: `${payment.GET_PAYMENT_INFO_ENDPOINT}${paymentId}`,
      method: API_METHODS.GET,
      headers: {
        Authorization: `Bearer ${payment.govUkApiKey}`
      }
    };
    const { data } = await model._request(params);

    return data;
  } catch (error) {
    logger.error(
      `Error getting the payment details : ${error.message ?? error}`
    );
    throw new Error('Error getting the payment details');
  }
}

/**
 * Generates the payment request payload based on the application type
 *
 * @param {Object} req = The req object
 * @param {string} applicationType = Selected application type
 * @param {string} hmac = The generated HMAC
 * @returns {Object} - Request payload for initiate payment
 * @throws {Error} - If application type is unexpected
 */

const generateRequestPayload = async (req, applicationType, hmac) => {
  let return_url = `${req.protocol}://${req.get(
    'host'
  )}${PATH_NEW_RENEW}${PATH_APPLICATION_SUBMITTED}`;

  if (applicationType === APP_TYPE_REPLACE) {
    return_url = `${req.protocol}://${req.get(
      'host'
    )}${PATH_REPLACE}${PATH_REPLACE_APPLICATION_SUBMITTED}`;
  }

  const uniqueRefNumber = await getCryptoRandomString();

  if (applicationType === APP_TYPE_NEW || applicationType === APP_TYPE_RENEW) {
    return {
      amount:
        applicationType === APP_TYPE_NEW
          ? payment.AMOUNT_NEW
          : payment.AMOUNT_RENEW,
      reference: uniqueRefNumber,
      description:
        applicationType === APP_TYPE_NEW
          ? payment.NEW_LICENCE_PAYMENT_DESCRIPTION
          : payment.RENEW_LICENCE_PAYMENT_DESCRIPTION,
      return_url,
      token: hmac,
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
      reference: uniqueRefNumber,
      description: payment.REPLACE_LICENCE_PAYMENT_DESCRIPTION,
      return_url,
      token: hmac,
      email: req.sessionModel.get('replace-email')
    };
  }
  logger.error(
    `Application type ${applicationType} not supported for the payment`
  );
  throw new Error('Unknown application type');
};

/**
 * Returns the base path for error templates for the given application type
 *
 * @param {string} applicationType = The application type
 * @returns {string | Error} - Base path for the error templates or error if application
 * type is unknown
 */

const getErrorTemplateBasePath = applicationType => {
  if (applicationType === APP_TYPE_NEW || applicationType === APP_TYPE_RENEW) {
    return PATH_NEW_RENEW;
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
