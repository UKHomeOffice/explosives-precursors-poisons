/* eslint-disable camelcase */
const {
  initiatePayment,
  generateRandomId,
  generateHmac,
  generateRequestPayload,
  getErrorTemplateBasePath
} = require('../../../utilities/helpers/api');

module.exports = superclass =>
  class extends superclass {
    async saveValues(req, res) {
      const applicationType = req.sessionModel.get('applicationType');
      const errorTemplateBasePath = getErrorTemplateBasePath(applicationType);

      try {
        // TODO: Shall we use the existing URL to avoid creating additional requests?
        if (req.sessionModel.get('payment-page-url')) {
          return res.redirect(req.sessionModel.get('payment-page-url'));
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
        req.sessionModel.unset('payment-page-url');
        if (paymentPageUrl) {
          req.sessionModel.set('payment-page-url', paymentPageUrl);
          return res.redirect(paymentPageUrl);
        }
        return res.redirect(`${errorTemplateBasePath}/payment-problem`);
      } catch (error) {
        req.sessionModel.unset('payment-page-url');
        req.log('error', 'Error initiating the payment: ' + error);
        return res.redirect(`${errorTemplateBasePath}/payment-problem`);
      }
    }
  };
