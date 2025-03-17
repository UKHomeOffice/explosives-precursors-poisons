const crs = require('../../../utilities/helpers/crypto-random-string');

describe('crypto-random-string tests', () => {
  it('should return a mocked random string', async () => {
    const stub = sinon.stub(crs, 'getCryptoRandomString').resolves('ABCD1234');
    const result = await crs.getCryptoRandomString();
    expect(result).to.equal('ABCD1234');
    stub.restore();
  });
});
