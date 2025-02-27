const proxyquire = require('proxyquire');
const crypto = require('crypto');
const {
  generateRequestPayload,
  getErrorTemplateBasePath,
  generateHmac
} = require('../../../utilities/helpers/api');

describe('apis.js tests', () => {
  const expectedRequestPayload = {
    amount: 3950,
    reference: 'New payment Reference',
    description: 'New payment description',
    return_url: 'http://localhost:8080/new-and-renew/application-submitted',
    token: 'ABCD1234',
    metadata: {
      custom_metadata_key1: 'custom_metadata_value1',
      custom_metadata_key2: 'custom_metadata_value2'
    },
    billing_address: {
      line1: 'mock_get_value',
      line2: 'mock_get_value',
      postcode: 'mock_get_value',
      city: 'mock_get_value',
      country: 'mock_get_value'
    },
    email: 'mock_get_value'
  };

  let modelMock;
  let getPaymentDetails;
  let initiatePayment;

  beforeEach(() => {
    modelMock = {
      _request: sinon.stub()
    };

    const apis = proxyquire('../../../utilities/helpers/api', {
      hof: { model: sinon.stub().returns(modelMock) }
    });

    getPaymentDetails = apis.getPaymentDetails;
    initiatePayment = apis.initiatePayment;
  });

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

    it('should return the payload for new application type', () => {
      expect(
        generateRequestPayload(
          {
            sessionModel: {
              get: () => 'mock_get_value'
            }
          },
          'new',
          'ABCD1234'
        )
      ).to.deep.equal(expectedRequestPayload);
    });

    it('should return the payload for renew application type', () => {
      const updatedPayload = {
        ...expectedRequestPayload,
        reference: 'Renew payment reference',
        description: 'Renew payment description'
      };
      expect(
        generateRequestPayload(
          {
            sessionModel: {
              get: () => 'mock_get_value'
            }
          },
          'renew',
          'ABCD1234'
        )
      ).to.deep.equal(updatedPayload);
    });

    it('should return the payload for replace application type', () => {
      const updatedPayload = {
        ...expectedRequestPayload,
        amount: 2500,
        reference: 'Replace payment reference',
        description: 'Replace payment description',
        return_url: 'http://localhost:8080/replace/application-submitted'
      };
      expect(
        generateRequestPayload(
          {
            sessionModel: {
              get: () => 'mock_get_value'
            }
          },
          'replace',
          'ABCD1234'
        )
      ).to.deep.equal(updatedPayload);
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
      modelMock._request.resolves(mockResponse);
      const result = await initiatePayment({});
      expect(result).to.deep.equal(mockResponse.data);
      expect(modelMock._request.calledOnce).to.be.true;
    });

    it('should throw and error', async () => {
      const mockError = new Error('Error creating a payment request');
      modelMock._request.rejects(mockError);
      try {
        await initiatePayment({});
        throw new Error('Test should not throw an error');
      } catch (err) {
        expect(err).to.deep.equal(mockError);
        expect(modelMock._request.calledOnce).to.be.true;
      }
    });
  });

  describe('getPaymentDetails tests', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('should return payment details on success', async () => {
      const mockResponse = { data: { amount: 100, status: 'paid' } };
      modelMock._request.resolves(mockResponse);
      const result = await getPaymentDetails('1234');
      expect(modelMock._request.calledOnce).to.be.true;
      expect(result).to.deep.equal(mockResponse.data);
    });

    it('should throw and error', async () => {
      const mockError = new Error('Error getting the payment details');
      modelMock._request.rejects(mockError);
      try {
        await getPaymentDetails('12345');
        throw new Error('Test should not throw an error');
      } catch (err) {
        expect(modelMock._request.calledOnce).to.be.true;
        expect(err).to.deep.equal(mockError);
      }
    });
  });
});
