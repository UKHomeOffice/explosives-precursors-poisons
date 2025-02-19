const {
  initiatePayment,
  generateRandomId,
  generateHmac
} = require('../../../utilities/helpers/api');

module.exports = superclass =>
  class extends superclass {
    async saveValues(req, res) {
      // TODO: Redirection routes based on the flow
      try {
        const randomId = generateRandomId();
        const hmac = generateHmac(randomId);

        const paymentPayload = {
          amount: 200,
          reference: 'Payment Reference',
          description: 'Payment description',
          return_url:
            'http://localhost:8080/new-and-renew/application-submitted',
          token: hmac,
          metadata: {
            ledger_code: 'AB100',
            internal_reference_number: 'Internal Ref Number'
          },
          billing_address: {
            line1: 'Address Line 1',
            line2: 'Address Line 2',
            postcode: 'L2 1ED',
            city: 'London',
            country: 'United Kingdom'
          },
          email: 'epp@test.com'
        };

        const resp = await initiatePayment(paymentPayload);
        const data = await resp.json();
        req.sessionModel.set('payment-id', data.payment_id);
        req.sessionModel.set('random-id', randomId);
        if (data?._links?.next_url?.href) {
          return res.redirect(data._links.next_url.href);
        }
        return res.redirect('/new-and-renew/payment-problem');
      } catch (error) {
        req.log('error', 'Error initiating the payment: ' + error);
        return res.redirect('/new-and-renew/payment-problem');
      }
    }
  };
