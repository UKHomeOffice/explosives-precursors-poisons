const axios = require('axios');
const crypto = require('crypto');
const {
  generateRequestPayload,
  getErrorTemplateBasePath,
  initiatePayment,
  getPaymentDetails,
  generateHmac
} = require('../../../utilities/helpers/api');

describe('apis.js tests', () => {
  describe('generateHmac tests', () => {
    let cryptoStub;

    beforeEach(() => {
      cryptoStub = sinon.stub(crypto, 'createHmac');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return a valid HMAC', () => {
      const mockHmac = {
        update: sinon.stub().returnsThis(),
        digest: sinon.stub().returns('mock-hmac')
      };

      cryptoStub.returns(mockHmac);
      const randomId = 'test-random-id';
      const result = generateHmac(randomId);
      expect(result).to.equal('mock-hmac');
      expect(mockHmac.update.calledWith(randomId)).to.be.true;
      expect(mockHmac.digest.calledWith('hex')).to.be.true;
    });
  });

  describe('generateRequestPayload tests', () => {
    it('unsupported applicationType - should throw an error for amend flow', () => {
      expect(() => generateRequestPayload({}, 'amend', 'ABCD1234')).to.throw(
        'Unknown application type'
      );
    });

    it('unsupported applicationType - should throw an error for unknown value', () => {
      expect(() =>
        generateRequestPayload({}, 'hello-world', 'ABCD1234')
      ).to.throw('Unknown application type');
    });
  });

  describe('getErrorTemplateBasePath tests', () => {
    it('unsupported applicationType - should throw an error for amend flow', () => {
      expect(() => getErrorTemplateBasePath('amend')).to.throw(
        'Unknown application type'
      );
    });

    it('unsupported applicationType - should throw an error for unknown value', () => {
      expect(() => getErrorTemplateBasePath('hello-world')).to.throw(
        'Unknown application type'
      );
    });

    it('supported applicationType - should return the path for new flow', () => {
      expect(getErrorTemplateBasePath('new')).to.equal('/new-and-renew');
    });

    it('supported applicationType - should return the path for renew flow', () => {
      expect(getErrorTemplateBasePath('renew')).to.equal('/new-and-renew');
    });

    it('supported applicationType - should return the path for replace flow', () => {
      expect(getErrorTemplateBasePath('replace')).to.equal('/replace');
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

    it('should throw and error', async () => {
      const mockError = new Error('Error creating a payment request');
      sinon.stub(axios, 'post').rejects(mockError);
      try {
        await initiatePayment({});
        throw new Error('Test should not throw an error');
      } catch (err) {
        expect(err).to.deep.equal(mockError);
      }
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

    it('should throw and error', async () => {
      const mockError = new Error('Error getting the payment details');
      sinon.stub(axios, 'get').rejects(mockError);
      try {
        await getPaymentDetails('12345');
        throw new Error('Test should not throw an error');
      } catch (err) {
        expect(err).to.deep.equal(mockError);
      }
    });
  });
});
