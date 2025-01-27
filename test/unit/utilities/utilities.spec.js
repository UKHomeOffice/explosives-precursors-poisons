const {
  validLicenceNumber,
  isWithoutFullStop,
  isValidUkDrivingLicenceNumber
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

  it('isValidUkDrivingLicenceNumber- should match uk driving licence number if format is correct', () => {
    const input = [
      'FARME100165AB5EW',
      'FAR99700165AB5EW',
      'MERED811165AB5EW',
      'SMITH816305DF5EW',
      'Smith816305DF5Ew'
    ];
    input.forEach(item => expect(isValidUkDrivingLicenceNumber(item)).to.not.equal(null));
  });

  it('isValidUkDrivingLicenceNumber- should return null for invalid format', () => {
    const input = [
      'FARMETHER65AB5EW',
      'MERED811165AB588',
      'STR4M382940AZ9AZ',
      '1VEET382940AZ9AZ'
    ];
    input.forEach(item => expect(isValidUkDrivingLicenceNumber(item)).to.equal(null));
  });
});
