/* eslint-disable camelcase */
const crypto = require('crypto');
const { payment } = require('../../config');

const generateRandomId = () => crypto.randomBytes(16).toString('hex');

async function initiatePayment(
  req,
  {
    amount,
    reference,
    description,
    return_url,
    billing_address,
    email,
    metadata
  }
) {
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
      return_url,
      delayed_capture: false,
      metadata,
      prefilled_cardholder_details: {
        billing_address
      },
      email,
      language: 'en'
    })
  });

  req.log('info', `Callback URL: ${return_url}`);

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

module.exports = {
  initiatePayment,
  getPaymentDetails,
  generateRandomId,
  generateHmac
};
