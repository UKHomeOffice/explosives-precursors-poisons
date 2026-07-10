const crs = require('../../../utilities/helpers/crypto-random-string');

describe('crypto-random-string tests', () => {
  it('should return a mocked random string', async () => {
    const stub = mockSpyOn(crs, 'getCryptoRandomString').mockResolvedValue(
      'ABCD1234'
    );
    const result = await crs.getCryptoRandomString();
    expect(result).toBe('ABCD1234');
    stub.mockRestore();
  });
});
