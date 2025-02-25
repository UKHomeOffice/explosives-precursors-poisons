/* eslint-disable camelcase */
const axios = require('axios');
const crypto = require('crypto');
const { payment, env } = require('../../config');
const logger = require('hof/lib/logger')({ env });

const generateRandomId = () => crypto.randomBytes(16).toString('hex');

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
    const { data } = await axios.post(
      payment.CREATE_PAYMENT_ENDPOINT,
      {
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
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payment.govUkApiKey}`
        }
      }
    );
    return data;
  } catch (error) {
    logger.error(`Error creating a payment request : ${error}`);
    throw new Error('Error creating a payment request');
  }
}

async function getPaymentDetails(paymentId) {
  try {
    const { data } = await axios.get(
      `${payment.GET_PAYMENT_INFO_ENDPOINT}${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${payment.govUkApiKey}`
        }
      }
    );
    return data;
  } catch (error) {
    logger.error(`Error getting the payment details : ${error}`);
    throw new Error('Error getting the payment details');
  }
}

const generateHmac = randomId => {
  return crypto
    .createHmac('sha256', payment.govUkApiKey)
    .update(randomId)
    .digest('hex');
};

// TODO: fetch dynamic values from ENV or session?
const generateRequestPayload = (req, applicationType, hmac) => {
  if (applicationType === 'new' || applicationType === 'renew') {
    return {
      amount: 3950,
      reference:
        applicationType === 'new'
          ? 'New payment Reference'
          : 'Renew payment reference',
      description:
        applicationType === 'new'
          ? 'New payment description'
          : 'Renew payment description',
      return_url: 'http://localhost:8080/new-and-renew/application-submitted',
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

  if (applicationType === 'replace') {
    return {
      amount: 2500,
      reference: 'Replace payment reference',
      description: 'Replace payment description',
      return_url: 'http://localhost:8080/replace/application-submitted',
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
  if (applicationType === 'new' || applicationType === 'renew') {
    return '/new-and-renew';
  }

  if (applicationType === 'replace') {
    return '/replace';
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
