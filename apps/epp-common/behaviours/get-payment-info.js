const {
  getPaymentDetails,
  generateHmac,
  getErrorTemplateBasePath
} = require('../../../utilities/helpers/api');
module.exports = superclass =>
  class extends superclass {
    async getValues(req, res, next) {
      const applicationType = req.sessionModel.get('applicationType');
      const errorTemplateBasePath = getErrorTemplateBasePath(applicationType);

      try {
        // reset existing payment page URL as user has completed or cancelled the payment
        req.sessionModel.unset('payment-page-url');
        const randomId = req.sessionModel.get('random-id');
        const paymentId = req.sessionModel.get('payment-id');

        if (!randomId || !paymentId) {
          req.log('error', 'random id or payment id is missing');
          return res.redirect(`${errorTemplateBasePath}/payment-problem`);
        }

        const token = req.query.token;
        const expectedToken = generateHmac(randomId);
        if (token !== expectedToken) {
          req.log('error', 'token does not match');
          return res.redirect(`${errorTemplateBasePath}/payment-problem`);
        }
        req.log('info', 'Payment requested for: ' + paymentId);
        const { state } = await getPaymentDetails(paymentId);
        if (state.code === 'P0030') {
          req.log('error', state.message);
          return res.redirect(`${errorTemplateBasePath}/payment-cancelled`);
        }

        if (state.code === 'P0010') {
          req.log('error', state.message);
          return res.redirect(`${errorTemplateBasePath}/payment-failed`);
        }

        if (state.status !== 'success') {
          req.log('error', state.status);
          return res.redirect(`${errorTemplateBasePath}/payment-problem`);
        }
        // TODO: Notify?
        // req.sessionModel.reset();
      } catch (error) {
        req.log('error', `Error fetching payment status: ${error}`);
        return res.redirect(`${errorTemplateBasePath}/payment-problem`);
      }

      return super.getValues(req, res, next);
    }
  };
