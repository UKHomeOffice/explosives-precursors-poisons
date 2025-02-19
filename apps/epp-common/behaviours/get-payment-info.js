const {
  getPaymentDetails,
  generateHmac
} = require('../../../utilities/helpers/api');
module.exports = superclass =>
  class extends superclass {
    async getValues(req, res, next) {
      // TODO: Redirection routes based on the flow
      try {
        const id = req.sessionModel.get('random-id');
        const paymentId = req.sessionModel.get('payment-id');
        if (!id) {
          return res.redirect('/new-and-renew/payment-problem');
        }

        if (!paymentId) {
          return res.redirect('/new-and-renew/payment-problem');
        }

        const token = req.query.token;
        const expectedToken = generateHmac(id);
        if (token !== expectedToken) {
          return res.redirect('/new-and-renew/payment-problem');
        }
        req.log('info', 'Payment requested for: ' + paymentId);
        const resp = await getPaymentDetails(paymentId);
        const { state } = await resp.json();
        if (state.code === 'P0030') {
          return res.redirect('/new-and-renew/payment-cancelled');
        }

        if (state.code === 'P0020') {
          return res.redirect('/new-and-renew/payment-failed');
        }

        if (state.status !== 'success') {
          return res.redirect('/new-and-renew/payment-problem');
        }
      } catch (error) {
        req.log('error', error);
        return next(Error('Error fetching payment status'));
      }

      return super.getValues(req, res, next);
    }
  };
