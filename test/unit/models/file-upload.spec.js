describe('File upload model tests', () => {
  let UploadModel;
  let mockConfig;
  let mockLogger;
  let mockRequest;

  beforeEach(() => {
    mockConfig = {
      upload: {
        hostname: 'htttp://file-valut'
      },
      keycloak: {
        token: 'http://keycloak/token',
        username: 'test-user',
        password: 'test-pwd',
        clientId: 'test-client-id',
        secret: 'test-secret'
      }
    };

    mockLogger = {
      error: mockFn(),
      info: mockFn()
    };
    mockRequest = mockFn();

    jest.resetModules();
    jest.doMock('../../../config', () => mockConfig);
    jest.doMock('hof/lib/logger', () => () => mockLogger);

    UploadModel = require('../../../apps/epp-common/models/file-upload');
  });

  describe('save', () => {
    it('should throw error - hostname not defined', () => {
      delete mockConfig.upload.hostname;
      const model = new UploadModel();
      expect(() => model.save()).toThrow('File-vault hostname is not defined');
      expect(
        mockLogger.error.calledWith('File-vault hostname is not defined')
      ).toBe(true);
    });

    it('should reject when request fails', async () => {
      const model = new UploadModel();
      model.get = mockFn().mockReturnValue('test-result');
      mockRequest.mockImplementation((options, cb) => {
        cb(new Error('request failed'));
      });

      model.request = mockRequest;

      try {
        await model.save();
      } catch (err) {
        expect(err.message).toEqual('File upload failed: request failed');
      }
    });

    it('should throw error if no url in the response', async () => {
      const model = new UploadModel();
      model.get = mockFn().mockReturnValue('test-result');
      mockRequest.mockImplementation((options, cb) => {
        cb(null, {});
      });

      model.request = mockRequest;

      try {
        await model.save();
      } catch (err) {
        expect(mockLogger.error.called).toBe(true);
      }
    });

    it('should unset data after successful request', async () => {
      const model = new UploadModel();
      model.get = mockFn().mockReturnValue('test-result');
      model.set = mockFn();
      model.unset = mockFn();
      mockRequest.mockImplementation((options, cb) => {
        cb(null, { url: 'http://file-vault/file/test' });
      });

      model.request = mockRequest;

      await model.save();
      expect(model.set).toHaveBeenCalledWith({
        url: 'http://file-vault/file/generate-link/test'
      });
    });
  });

  describe('auth', () => {
    it('should throw error - required keycloak property is missing', async () => {
      delete mockConfig.keycloak.username;

      const model = new UploadModel();
      try {
        await model.auth();
      } catch (err) {
        expect(err.message).toBe('Keycloak username is not defined');
      }
    });

    it('should throw error when request fails', async () => {
      const model = new UploadModel();
      mockRequest.mockRejectedValue({
        response: {}
      });
      model._request = mockRequest;

      try {
        await model.auth();
      } catch (err) {
        expect(err).toBeTruthy();
      }
    });

    it('should throw error when response does not contain access token', async () => {
      const model = new UploadModel();
      mockRequest.mockResolvedValue({ data: {} });
      model._request = mockRequest;

      try {
        await model.auth();
      } catch (err) {
        expect(err).toBeTruthy();
      }
    });

    it('should return the token when auth is successful', async () => {
      const model = new UploadModel();
      mockRequest.mockResolvedValue({ data: { access_token: 'test-token' } });
      model._request = mockRequest;

      const result = await model.auth();
      expect(result).toEqual({ bearer: 'test-token' });
    });
  });
});
