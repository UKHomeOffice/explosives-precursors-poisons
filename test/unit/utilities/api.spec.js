const crypto = require('crypto');

describe('apis.js tests', () => {
  const expectedRequestPayload = {
    amount: 3950,
    description: 'New Explosives Precursors and Poisons Licence',
    return_url: 'http://localhost:8080/new-renew/application-submitted',
    token: 'ABCD1234',
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
  let generateRequestPayload;
  let getErrorTemplateBasePath;
  let generateHmac;

  beforeEach(() => {
    modelMock = {
      _request: mockFn()
    };
    jest.resetModules();
    jest.doMock('hof', () => ({ model: mockFn().mockReturnValue(modelMock) }));
    jest.doMock('../../../utilities/helpers/crypto-random-string', () => ({
      getCryptoRandomString: mockFn().mockResolvedValue('UT-REF-001')
    }));
    const apis = require('../../../utilities/helpers/api');

    getPaymentDetails = apis.getPaymentDetails;
    initiatePayment = apis.initiatePayment;
    generateRequestPayload = apis.generateRequestPayload;
    getErrorTemplateBasePath = apis.getErrorTemplateBasePath;
    generateHmac = apis.generateHmac;
  });

  describe('generateHmac tests', () => {
    let cryptoStub;

    beforeEach(() => {
      cryptoStub = mockSpyOn(crypto, 'createHmac');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return a valid HMAC', () => {
      const mockHmac = {
        update: mockFn().mockReturnThis(),
        digest: mockFn().mockReturnValue('mock-hmac')
      };

      cryptoStub.mockReturnValue(mockHmac);
      const randomId = 'test-random-id';
      const result = generateHmac(randomId);
      expect(result).toBe('mock-hmac');
      expect(mockHmac.update.calledWith(randomId)).toBe(true);
      expect(mockHmac.digest.calledWith('hex')).toBe(true);
    });
  });

  describe('generateRequestPayload tests', () => {
    const mockError = new Error('Unknown application type');
    it('unsupported applicationType - should throw an error for amend flow', async () => {
      try {
        await generateRequestPayload(
          { protocol: '', get: mockFn() },
          'amend',
          'ABCD1234'
        );
      } catch (err) {
        expect(err).toEqual(mockError);
      }
    });

    it('unsupported applicationType - should throw an error for unknown value', async () => {
      try {
        await generateRequestPayload(
          { protocol: '', get: mockFn() },
          'hello-world',
          'ABCD1234'
        );
      } catch (err) {
        expect(err).toEqual(mockError);
      }
    });

    it('should return the payload for new application type', async () => {
      const result = await generateRequestPayload(
        {
          sessionModel: {
            get: () => 'mock_get_value'
          },
          get: () => 'localhost:8080',
          protocol: 'http'
        },
        'new',
        'ABCD1234'
      );
      delete result.reference;
      expect(result).toEqual(expectedRequestPayload);
    });

    it('should return the payload for renew application type', async () => {
      const updatedPayload = {
        ...expectedRequestPayload,
        description: 'Renew Explosives Precursors and Poisons Licence'
      };

      const result = await generateRequestPayload(
        {
          sessionModel: {
            get: () => 'mock_get_value'
          },
          get: () => 'localhost:8080',
          protocol: 'http'
        },
        'renew',
        'ABCD1234'
      );
      delete result.reference;
      expect(result).toEqual(updatedPayload);
    });

    it('should return the payload for replace application type', async () => {
      const updatedPayload = {
        ...expectedRequestPayload,
        amount: 2500,
        description: 'Replace Explosives Precursors and Poisons Licence',
        return_url:
          'http://localhost:8080/replace/replace-application-submitted'
      };
      delete updatedPayload.billing_address;

      const result = await generateRequestPayload(
        {
          sessionModel: {
            get: () => 'mock_get_value'
          },
          get: () => 'localhost:8080',
          protocol: 'http'
        },
        'replace',
        'ABCD1234'
      );
      delete result.reference;
      expect(result).toEqual(updatedPayload);
    });
  });

  describe('getErrorTemplateBasePath tests', () => {
    it('unsupported applicationType - should throw an error for amend flow', () => {
      expect(() => getErrorTemplateBasePath('amend')).toThrow(
        'Unknown application type'
      );
    });

    it('unsupported applicationType - should throw an error for unknown value', () => {
      expect(() => getErrorTemplateBasePath('hello-world')).toThrow(
        'Unknown application type'
      );
    });

    it('supported applicationType - should return the path for new flow', () => {
      expect(getErrorTemplateBasePath('new')).toBe('/new-renew');
    });

    it('supported applicationType - should return the path for renew flow', () => {
      expect(getErrorTemplateBasePath('renew')).toBe('/new-renew');
    });

    it('supported applicationType - should return the path for replace flow', () => {
      expect(getErrorTemplateBasePath('replace')).toBe('/replace');
    });
  });

  describe('initiatePayment tests', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('should return successful response', async () => {
      const mockResponse = {
        data: { amount: 100, state: { status: 'created', finished: false } }
      };
      modelMock._request.mockResolvedValue(mockResponse);
      const result = await initiatePayment({});
      expect(result).toEqual(mockResponse.data);
      expect(modelMock._request.calledOnce).toBe(true);
    });

    it('should throw and error', async () => {
      const mockError = new Error('Error creating a payment request');
      modelMock._request.mockRejectedValue(mockError);
      try {
        await initiatePayment({});
        throw new Error('Test should not throw an error');
      } catch (err) {
        expect(err).toEqual(mockError);
        expect(modelMock._request.calledOnce).toBe(true);
      }
    });
  });

  describe('getPaymentDetails tests', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('should return payment details on success', async () => {
      const mockResponse = { data: { amount: 100, status: 'paid' } };
      modelMock._request.mockResolvedValue(mockResponse);
      const result = await getPaymentDetails('1234');
      expect(modelMock._request.calledOnce).toBe(true);
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw and error', async () => {
      const mockError = new Error('Error getting the payment details');
      modelMock._request.mockRejectedValue(mockError);
      try {
        await getPaymentDetails('12345');
        throw new Error('Test should not throw an error');
      } catch (err) {
        expect(modelMock._request.calledOnce).toBe(true);
        expect(err).toEqual(mockError);
      }
    });
  });
});
