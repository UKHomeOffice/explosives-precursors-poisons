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
        const randomId = generateRandomId();
        const hmac = generateHmac(randomId);
        const paymentPayload = generateRequestPayload(
          req,
          applicationType,
          hmac
        );
        const data = await initiatePayment(paymentPayload);
        req.log('Create Payment Response: ' + data);
        req.sessionModel.set('payment-id', data.payment_id);
        req.sessionModel.set('random-id', randomId);
        if (data?._links?.next_url?.href) {
          return res.redirect(data._links.next_url.href);
        }
        return res.redirect(`${errorTemplateBasePath}/payment-problem`);
      } catch (error) {
        req.log('error', 'Error initiating the payment: ' + error);
        return res.redirect(`${errorTemplateBasePath}/payment-problem`);
      }
    }
  };
