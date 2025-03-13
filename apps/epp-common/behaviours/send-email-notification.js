const fs = require('fs');
const path = require('path');
const { govukNotify, dateTimeFormat } = require('../../../config');
const utils = require('../../../utilities/helpers');

const NotifyClient = utils.NotifyClient;
const notifyKey = govukNotify.notifyApiKey;
const notifyClient = new NotifyClient(notifyKey);
const PDFModel = require('hof').apis.pdfConverter;
const moment = require('moment');

const {
  APP_TYPE_REPLACE,
  APP_TYPE_AMEND,
  APP_TYPE_NEW,
  APP_TYPE_RENEW
} = require('../../../utilities/constants/string-constants');
const {
  getPdfTitle,
  getUserEmail,
  getTemplateId,
  USER,
  getNewRenewPersonalisation,
  getAmendPersonalisation,
  getReplacePersonalisation,
  BUSINESS
} = require('../../../utilities/helpers/notify-helpers');

const getPersonalisation = (req, applicationType, recipientType) => {
  if (recipientType === USER) {
    // only pdf link for user templates
    return {};
  }
  switch (applicationType) {
    case APP_TYPE_NEW:
    case APP_TYPE_RENEW:
      return getNewRenewPersonalisation(req);

    case APP_TYPE_AMEND:
      return getAmendPersonalisation(req);

    case APP_TYPE_REPLACE:
      return getReplacePersonalisation(req);

    default:
      throw Error(`Unknown application type: ${applicationType}`);
  }
};

module.exports = class SendEmailConfirmation {
  readCss() {
    return new Promise((resolve, reject) => {
      const cssFile = path.resolve(__dirname, '../../../public/css/app.css');
      fs.readFile(cssFile, (err, data) => (err ? reject(err) : resolve(data)));
    });
  }

  readHOLogo() {
    return new Promise((resolve, reject) => {
      const hoLogoFile = path.resolve(
        __dirname,
        '../../../assets/images/ho-logo.png'
      );
      fs.readFile(hoLogoFile, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(`data:image/png;base64,${data.toString('base64')}`);
      });
    });
  }

  async renderHTML(req, res, locs) {
    const locals = locs;
    locals.title = getPdfTitle(req);
    locals.dateTime = moment().format(dateTimeFormat);
    locals.values = req.sessionModel.toJSON();
    locals.htmlLang = res.locals.htmlLang || 'en';

    locals.css = await this.readCss(req);
    locals['ho-logo'] = await this.readHOLogo();
    return new Promise((resolve, reject) => {
      res.render('pdf.html', locals, (err, html) =>
        err ? reject(err) : resolve(html)
      );
    });
  }

  async sendEmailNotification(req, recipientType, pdfData) {
    const applicationType = req.sessionModel.get('applicationType');

    if (!applicationType) {
      const errorMessage = `Invalid application Type: ${applicationType}`;
      req.log('error', errorMessage);
      throw Error(errorMessage);
    }

    const templateId = getTemplateId(req, applicationType, recipientType);

    const recipientEmailAddress =
      recipientType === USER
        ? req.sessionModel.get(getUserEmail(applicationType))
        : govukNotify.caseworkerEmail;

    const userOrBusinessStr = () =>
      recipientType === USER ? 'User' : 'Business';

    const emailReplyToId = govukNotify.replyToEmailID;

    const personalisation = getPersonalisation(
      req,
      applicationType,
      recipientType
    );

    try {
      if (notifyKey === 'USE_MOCK') {
        req.log(
          'warn',
          '*** Notify API Key set to USE_MOCK. Ensure disabled in production! ***'
        );
      }

      await notifyClient.sendEmail(templateId, recipientEmailAddress, {
        personalisation: Object.assign({}, personalisation, {
          link_to_file: notifyClient.prepareUpload(pdfData, {
            confirmEmailBeforeDownload: false
          })
        }),
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

  async send(req, res, locals) {
    try {
      const html = await this.renderHTML(req, res, locals);

      const pdfModel = new PDFModel();
      pdfModel.set({ template: html });
      const pdfData = await pdfModel.save();

      await this.sendEmailNotification(req, USER, pdfData);
      await this.sendEmailNotification(req, BUSINESS, pdfData);

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
