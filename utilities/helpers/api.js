/* eslint-disable camelcase */
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
  const resp = await fetch(payment.CREATE_PAYMENT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payment.govUkApiKey}`
    },
    body: JSON.stringify({
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
    })
  });

  logger.info(`Callback URL: ${return_url}`);

  return resp;
}

async function getPaymentDetails(paymentId) {
  const resp = await fetch(`${payment.GET_PAYMENT_INFO_ENDPOINT}${paymentId}`, {
    headers: {
      Authorization: `Bearer ${payment.govUkApiKey}`
    }
  });
  return resp;
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
      amount: 200,
      reference: 'New-Renew payment Reference',
      description: 'New-Renew payment description',
      return_url: 'http://localhost:8080/new-and-renew/application-submitted',
      token: hmac,
      metadata: {
        ledger_code: 'AB100',
        internal_reference_number: 'Internal Ref Number'
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

  if (applicationType === 'amend') {
    return {
      amount: 200,
      reference: 'Amend payment Reference',
      description: 'Amend payment description',
      return_url: 'http://localhost:8080/new-and-renew/application-submitted',
      token: hmac,
      metadata: {
        ledger_code: 'AB100',
        internal_reference_number: 'Internal Ref Number'
      },
      billing_address: {
        line1: req.sessionModel.get('amend-address-1'),
        line2: req.sessionModel.get('amend-address-2'),
        postcode: req.sessionModel.get('amend-postcode'),
        city: req.sessionModel.get('amend-town-or-city'),
        country: req.sessionModel.get('amend-county')
      },
      email: req.sessionModel.get('amend-email')
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

  if (applicationType === 'amend') {
    return '/amend';
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
