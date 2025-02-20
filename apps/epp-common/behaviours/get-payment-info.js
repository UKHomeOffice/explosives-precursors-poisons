const {
  getPaymentDetails,
  generateHmac,
  getErrorTemplateBasePath
} = require('../../../utilities/helpers/api');
module.exports = superclass =>
  class extends superclass {
    async getValues(req, res, next) {
      try {
        // reset existing payment page URL as user has completed or cancelled the payment
        req.sessionModel.unset('payment-page-url');
        const id = req.sessionModel.get('random-id');
        const paymentId = req.sessionModel.get('payment-id');

        const applicationType = req.sessionModel.get('applicationType');
        const errorTemplateBasePath = getErrorTemplateBasePath(applicationType);

        if (!id || !paymentId) {
          return res.redirect(`${errorTemplateBasePath}/payment-problem`);
        }

        const token = req.query.token;
        const expectedToken = generateHmac(id);
        if (token !== expectedToken) {
          return res.redirect(`${errorTemplateBasePath}/payment-problem`);
        }
        req.log('info', 'Payment requested for: ' + paymentId);
        const { state } = await getPaymentDetails(paymentId);
        if (state.code === 'P0030') {
          return res.redirect(`${errorTemplateBasePath}/payment-cancelled`);
        }

        if (state.code === 'P0020') {
          return res.redirect(`${errorTemplateBasePath}/payment-failed`);
        }

        if (state.status !== 'success') {
          return res.redirect(`${errorTemplateBasePath}/payment-problem`);
        }
        req.sessionModel.reset();
      } catch (error) {
        req.log('error', error);
        return next(Error('Error fetching payment status'));
      }

      return super.getValues(req, res, next);
    }
  };
