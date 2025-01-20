const {
  validLicenceNumber,
  isWithoutFullStop,
  getKeyByValue
} = require('../../../utilities/helpers');

describe('EPP utilities tests', () => {
  it('.validLicenceNumber - should match for valid formats', () => {
    const licenceNumbers = [
      '12/a/123456/2015',
      '12 a 123456 2015',
      '12-a-123456-2015',
      '12,a,123456,2015',
      '12|a|123456|2015',
      '12a1234562015'
    ];
    licenceNumbers.forEach(licenceNumber =>
      expect(validLicenceNumber(licenceNumber)).to.not.equal(null)
    );
  });

  it('.validLicenceNumber - should return null for invalid formats', () => {
    const licenceNumbers = [
      '1225/a/123456/2015',
      '12 a 123456 2015XZXD',
      '12--a-123456-2015',
      '12,a,123456789,2015',
      '12|aBC|123456|2015',
      '12a1234562015285'
    ];
    licenceNumbers.forEach(licenceNumber =>
      expect(validLicenceNumber(licenceNumber)).to.equal(null)
    );
  });

  it('.isWithoutFullStop - should return false for string with a full stop', () => {
    const input = ['122.5', '.', '0.67', '52.2.5', '..', '00.00'];
    input.forEach(item => expect(isWithoutFullStop(item)).to.be.false);
  });

  it('.isWithoutFullStop - should return true for string without a full stop', () => {
    const input = ['1225', 'UNIT_TEST', 'HELLOWORLD', 'A', '', '0000'];
    input.forEach(item => expect(isWithoutFullStop(item)).to.be.true);
  });

  it('.getKeyByValue - should return key name for the given value', () => {
    const obj = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    };

    for (const [key, value] of Object.entries(obj)) {
      expect(getKeyByValue(obj, value)).to.equal(key);
    }
  });

  it('.getKeyByValue - should return undefined when key is not found', () => {
    const obj = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    };
    expect(getKeyByValue(obj, 'value4')).to.be.undefined;
    expect(getKeyByValue({}, 'value1')).to.be.undefined;
  });
});
