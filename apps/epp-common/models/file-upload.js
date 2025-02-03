'use strict';
/* eslint-disable */
const url = require('url');
const { model: Model } = require('hof');
const uuid = require('uuid').v4;
const config = require('../../../config');
const FormData = require('form-data');
const logger = require('hof/lib/logger')({ env: config.env });

module.exports = class UploadModel extends Model {
  constructor(...args) {
    super(...args);
    this.set('id', uuid());
  }

  async save() {
    const attributes = {
      url: config.upload.hostname
    };

    const formData = new FormData();
    formData.append('document', this.get('data'), {
      filename: this.get('name'),
      contentType: this.get('mimetype')
    });
    const reqConf = url.parse(this.url(attributes));
    reqConf.data = formData;
    reqConf.method = 'POST';
    reqConf.headers = {
      ...formData.getHeaders()
    };

    try {
      const response = await this.request(reqConf);

      if (!response || typeof response !== 'object' || Object.keys(response).length === 0) {
        const errorMsg = `Received empty or invalid response from file-vault ${response}`;
        logger.error(errorMsg)
        throw new Error(errorMsg);
      }
      if (!response.url) {
        const errorMsg = `Did not receive a URL from file-vault ${response}`;
        logger.error(errorMsg);
        throw new Error(errorMsg);
      }
      this.set({ url: response.url.replace('/file/', '/file/generate-link/').split('?')[0] });
      logger.info(`Successfully saved data`);
      return this.unset('data');
    } catch (error) {
      logger.error(`File upload failed in save method: ${error.message},
          error: ${JSON.stringify(error)}`);
      throw new Error(`File upload failed: ${error.message}`);
    }
  };

  async auth() {
    const requiredProperties = ['clientId', 'secret', 'username', 'password'];
    try {
      for (const property of requiredProperties) {
        if (!config.keycloak.token) {
          const errorMsg = `Keycloak ${property} is not defined`;
          logger.error(errorMsg);
          throw new Error(errorMsg)
          return Promise.resolve({
            bearer: 'abc123'
          });
        }
      }
      const tokenReq = {
        url: config.keycloak.token,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          username: config.keycloak.username,
          password: config.keycloak.password,
          grant_type: 'password',
          client_id: config.keycloak.clientId,
          client_secret: config.keycloak.secret
        },
        method: 'POST'
      };
      const response = await this._request(tokenReq);
      if (!response.data || !response.data.access_token) {
        const errorMsg = 'No access token in response';
        logger.error(errorMsg);
        throw new Error(errorMsg);
      }
      logger.info('Successfully retrieved access token')
      return { bearer: response.data.access_token };
    } catch (err) {
      const errorMsg = `Error occurred in auth method: ${err.message}, 
        Cause: ${err.response.status} ${err.response.statusText}, Data: ${JSON.stringify(err.response.data)}`;
      logger.error(errorMsg);
      const body = err.response.data
      logger.error(`Error in auth method: ${body.error} - ${body.error_description}`);
      throw err || new Error(`${body.error} - ${body.error_description}`);
    }
  }
};
