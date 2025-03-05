const { govukNotify } = require('../../../config');

const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyKey = govukNotify.notifyApiKey;
const notifyClient = new NotifyClient(notifyKey);

const USER = 'user';
const BUSINESS = 'business';

const getTemplateId = (req, applicationType, recipientType) => {
  const userAppTemplateMap = {
    new: govukNotify.newApplicationUserTemplateId,
    renew: govukNotify.renewApplicationUserTemplateId,
    amend: govukNotify.amendApplicationUserTemplateId,
    replace: govukNotify.replaceApplicationUserTemplateId
  };

  const businessAppTemplateMap = {
    new: govukNotify.newApplicationBusinessTemplateId,
    renew: govukNotify.renewApplicationBusinessTemplateId,
    amend: govukNotify.amendApplicationBusinessTemplateId,
    replace: govukNotify.replaceApplicationBusinessTemplateId
  };

  if (recipientType === USER) {
    if (
      applicationType === 'replace' &&
      req.sessionModel.get('replace-replacement-reason') === 'damaged'
    ) {
      return govukNotify.replaceDamagedApplicationUserTemplateId;
    }
    return userAppTemplateMap[applicationType];
  }

  if (recipientType === BUSINESS) {
    return businessAppTemplateMap[applicationType];
  }

  return '';
};

const getUserEmail = applicationType => {
  const appUserEmailMap = {
    new: 'new-renew-email',
    renew: 'new-renew-email',
    amend: 'amend-email',
    replace: 'replace-email'
  };

  return appUserEmailMap[applicationType];
};

module.exports = class SendEmailConfirmation {
  async sendEmailNotification(req, recipientType) {
    const applicationType = req.sessionModel.get('applicationType');

    if (!applicationType) {
      const errorMessage = `Invalid application Type: ${applicationType}`;
      req.log('error', errorMessage);
      throw Error(errorMessage);
    }
    const personalisation = {};

    // TODO: helpers
    // getPersonalisation(req) // this should return data for specific journey like payload in payment
    // getTemplateId(req) // return the appropriate template id whether its user or business and what journey
    // getUserEmail(req) // return the user email based on the journey
    // PDF - should generate the pdf based on journey and user of business

    const templateId = getTemplateId(req, applicationType, recipientType);

    const recipientEmailAddress =
      recipientType === USER
        ? req.sessionModel.get(getUserEmail(applicationType))
        : govukNotify.caseworkerEmail;

    const userOrBusinessStr = () =>
      recipientType === USER ? 'User' : 'Business';

    const emailReplyToId = govukNotify.replyToEmailID;

    try {
      await notifyClient.sendEmail(templateId, recipientEmailAddress, {
        personalisation: Object.assign({}, personalisation),
        emailReplyToId
      });

      req.log(
        'info',
        `${userOrBusinessStr()} Confirmation Email sent successfully`
      );
    } catch (err) {
      const errorDetails = err.response?.data
        ? `Cause: ${JSON.stringify(err.response.data)}`
        : '';
      const errorCode = err.code ? `${err.code} -` : '';
      const errorMessage = `${errorCode} ${err.message}; ${errorDetails}`;

      req.log(
        'error',
        `Failed to send ${userOrBusinessStr()} Confirmation Email`,
        errorMessage
      );
      throw Error(errorMessage);
    }
  }

  async send(req) {
    try {
      await this.sendEmailNotification(req, USER);
      await this.sendEmailNotification(req, BUSINESS);

      req.log(
        'info',
        'Request to send notification emails completed successfully.'
      );
    } catch (err) {
      req.log('error', `Failed to send all notifications emails. ${err}`);
      throw err;
    }
  }
};
