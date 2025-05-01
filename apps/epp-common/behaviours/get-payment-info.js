const SendEmailConfirmation = require('./send-email-notification');

const {
  getPaymentDetails,
  generateHmac,
  getErrorTemplateBasePath
} = require('../../../utilities/helpers/api');

const {
  STR_APPLICATION_TYPE,
  STR_PAYMENT_PAGE_URL,
  PATH_PAYMENT_PROBLEM,
  PATH_PAYMENT_CANCELLED,
  PATH_PAYMENT_FAILED,
  GOV_PAY_ERROR_CODE_P0030,
  GOV_PAY_ERROR_CODE_P0010,
  GOV_PAY_STATUS_SUCCESS,
  PATH_SERVICE_PROBLEM
} = require('../../../utilities/constants/string-constants');

module.exports = superclass =>
  class extends superclass {
    async getValues(req, res, next) {
      const applicationType = req.sessionModel.get(STR_APPLICATION_TYPE);
      if (!applicationType) {
        req.log('error', 'no session available, redirecting to home page');
        return res.redirect('/application-type');
      }
      const errorTemplateBasePath = getErrorTemplateBasePath(applicationType);

      try {
        // reset existing payment page URL as user has completed or cancelled the payment
        req.sessionModel.unset(STR_PAYMENT_PAGE_URL);
        const randomId = req.sessionModel.get('random-id');
        const paymentId = req.sessionModel.get('payment-id');

        if (!randomId || !paymentId) {
          req.log('error', 'random id or payment id is missing');
          return res.redirect(
            `${errorTemplateBasePath}${PATH_PAYMENT_PROBLEM}`
          );
        }

        const token = req.query.token;
        const expectedToken = generateHmac(randomId);
        if (token !== expectedToken) {
          req.log('error', 'token does not match');
          return res.redirect(
            `${errorTemplateBasePath}${PATH_PAYMENT_PROBLEM}`
          );
        }
        req.log('info', 'Payment requested for: ' + paymentId);
        const { state } = await getPaymentDetails(paymentId);
        if (state.code === GOV_PAY_ERROR_CODE_P0030) {
          req.log('error', state.message);
          return res.redirect(
            `${errorTemplateBasePath}${PATH_PAYMENT_CANCELLED}`
          );
        }

        if (state.code === GOV_PAY_ERROR_CODE_P0010) {
          req.log('error', state.message);
          return res.redirect(`${errorTemplateBasePath}${PATH_PAYMENT_FAILED}`);
        }

        if (state.status !== GOV_PAY_STATUS_SUCCESS) {
          req.log('error', state.status);
          return res.redirect(
            `${errorTemplateBasePath}${PATH_PAYMENT_PROBLEM}`
          );
        }

        // Notify
        try {
          const notifyEmail = new SendEmailConfirmation();
          await notifyEmail.send(req, res, super.locals(req, res));
        } catch (error) {
          req.log(
            'error',
            `Failed to send notification emails: redirecting to ${PATH_SERVICE_PROBLEM}`,
            error
          );
          return res.redirect(
            `${errorTemplateBasePath}${PATH_SERVICE_PROBLEM}`
          );
        }
      } catch (error) {
        req.log(
          'error',
          `Error fetching payment status: ${error.message ?? error}`
        );
        return res.redirect(`${errorTemplateBasePath}${PATH_PAYMENT_PROBLEM}`);
      }

      return super.getValues(req, res, next);
    }
  };
