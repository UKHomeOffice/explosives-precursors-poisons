/* eslint-disable camelcase */
const {
  initiatePayment,
  generateRandomId,
  generateHmac,
  generateRequestPayload,
  getErrorTemplateBasePath
} = require('../../../utilities/helpers/api');

const {
  STR_APPLICATION_TYPE,
  STR_PAYMENT_PAGE_URL,
  PATH_PAYMENT_PROBLEM
} = require('../../../utilities/constants/string-constants');

module.exports = superclass =>
  class extends superclass {
    async saveValues(req, res) {
      const applicationType = req.sessionModel.get(STR_APPLICATION_TYPE);
      const errorTemplateBasePath = getErrorTemplateBasePath(applicationType);

      try {
        if (req.sessionModel.get(STR_PAYMENT_PAGE_URL)) {
          return res.redirect(req.sessionModel.get(STR_PAYMENT_PAGE_URL));
        }

        const randomId = generateRandomId();
        const hmac = generateHmac(randomId);
        const paymentPayload = generateRequestPayload(
          req,
          applicationType,
          hmac
        );
        const { payment_id, _links } = await initiatePayment(paymentPayload);
        req.sessionModel.set('payment-id', payment_id);
        req.sessionModel.set('random-id', randomId);
        const paymentPageUrl = _links?.next_url?.href;
        req.sessionModel.unset(STR_PAYMENT_PAGE_URL);
        if (paymentPageUrl && payment_id) {
          req.sessionModel.set(STR_PAYMENT_PAGE_URL, paymentPageUrl);
          return res.redirect(paymentPageUrl);
        }
        return res.redirect(`${errorTemplateBasePath}${PATH_PAYMENT_PROBLEM}`);
      } catch (error) {
        req.sessionModel.unset(STR_PAYMENT_PAGE_URL);
        req.log('error', `Error initiating the payment: ${error.message ?? error}`);
        return res.redirect(`${errorTemplateBasePath}${PATH_PAYMENT_PROBLEM}`);
      }
    }
  };
