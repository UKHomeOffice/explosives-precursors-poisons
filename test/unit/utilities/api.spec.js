const axios = require('axios');
const {
  generateRequestPayload,
  getErrorTemplateBasePath,
  initiatePayment,
  getPaymentDetails
} = require('../../../utilities/helpers/api');

describe('apis.js tests', () => {
  describe('generateRequestPayload tests', () => {
    it('unsupported applicationType - should throw an error', () => {
      expect(() => generateRequestPayload({}, 'replace', 'ABCD1234')).to.throw(
        'Unknown application type'
      );
    });
  });

  describe('getErrorTemplateBasePath tests', () => {
    it('unsupported applicationType - should throw an error', () => {
      expect(() => getErrorTemplateBasePath('replace')).to.throw(
        'Unknown application type'
      );
    });
  });

  describe('initiatePayment tests', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('should return successful response', async () => {
      const mockResponse = {
        data: { amount: 100, state: { status: 'created', finished: false } }
      };
      sinon.stub(axios, 'post').resolves(mockResponse);
      const result = await initiatePayment({});
      expect(result).to.deep.equal(mockResponse.data);
    });
  });

  describe('getPaymentDetails tests', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('should return payment details on success', async () => {
      const mockResponse = { data: { amount: 100, status: 'paid' } };
      sinon.stub(axios, 'get').resolves(mockResponse);
      const result = await getPaymentDetails('1234');
      expect(result).to.deep.equal(mockResponse.data);
    });
  });
});
