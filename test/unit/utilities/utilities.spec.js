const moment = require('moment');
const {
  validLicenceNumber,
  isWithoutFullStop,
  getKeyByValue,
  isDateOlderOrEqualTo,
  isValidUkDrivingLicenceNumber,
  validInternationalPhoneNumber,
  removeWhiteSpace,
  getFormattedDate,
  isEditMode,
  getPrecursorsShortLabel,
  textAreaDefaultLength,
  isValidConcentrationValue
} = require('../../../utilities/helpers');

const explosivePrecursorsList = require('../../../utilities/constants/explosive-precursors');

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

  it('.isDateOlderOrEqualTo - should return false for dates less than 5 years', () => {
    const dates = [
      moment().format('YYYY-MM-DD'),
      moment().subtract('1', 'years').format('YYYY-MM-DD'),
      moment().subtract('2', 'years').format('YYYY-MM-DD'),
      moment().subtract('3', 'years').format('YYYY-MM-DD'),
      moment().subtract('4', 'years').format('YYYY-MM-DD'),
      'INVALID_DATE',
      ''
    ];
    for (const date of dates) {
      expect(isDateOlderOrEqualTo(`${date}`, 5)).to.be.false;
    }
  });

  it('.isDateOlderOrEqualTo - should return true for dates older than or equal to 5 years', () => {
    const dates = [
      moment().subtract('5', 'years').format('YYYY-MM-DD'),
      moment().subtract('6', 'years').format('YYYY-MM-DD'),
      moment().subtract('7', 'years').format('YYYY-MM-DD'),
      moment().subtract('80', 'years').format('YYYY-MM-DD')
    ];
    for (const date of dates) {
      expect(isDateOlderOrEqualTo(`${date}`, 5)).to.be.true;
    }
  });

  it('isValidUkDrivingLicenceNumber- should match uk driving licence number if format is correct', () => {
    const input = [
      'FARME100165AB5EW',
      'FAR99700165AB5EW',
      'MERED811165AB5EW',
      'SMITH816305DF5EW',
      'Smith816305DF5Ew'
    ];
    input.forEach(item =>
      expect(isValidUkDrivingLicenceNumber(item)).to.not.equal(null)
    );
  });

  it('isValidUkDrivingLicenceNumber- should return null for invalid format', () => {
    const input = [
      'FARMETHER65AB5EW',
      'MERED811165AB588',
      'STR4M382940AZ9AZ',
      '1VEET382940AZ9AZ'
    ];
    input.forEach(item =>
      expect(isValidUkDrivingLicenceNumber(item)).to.equal(null)
    );
  });
  it('.validInternationalPhoneNumber - should return false for invalid formats', () => {
    const phoneNumbers = [
      '123',
      'abc',
      'abc123',
      '123+456',
      '(0)+12345678',
      '0123456789123456',
      '0109758351',
      'HelloWorld07777777777'
    ];
    phoneNumbers.forEach(
      phoneNumber =>
        expect(validInternationalPhoneNumber(phoneNumber)).to.be.false
    );
  });

  it('.validInternationalPhoneNumber - should return true for valid formats', () => {
    const phoneNumbers = [
      '02079460000',
      '07900000000',
      '+442079460000',
      '+447900000000',
      '020 7946 0000',
      '+44020 79460000',
      '07 7 77 77 77 77'
    ];
    phoneNumbers.forEach(
      phoneNumber =>
        expect(validInternationalPhoneNumber(phoneNumber)).to.be.true
    );
  });

  it('.removeWhiteSpace - should remove the whitespace', () => {
    expect(removeWhiteSpace('Hello World')).to.equal('HelloWorld');
    expect(removeWhiteSpace('1 2 3 4 5 ')).to.equal('12345');
  });

  it('.getFormattedDate - should return the formatted date for valid dates', () => {
    expect(getFormattedDate('2000-01-01')).to.equal('01 January 2000');
    expect(getFormattedDate('2000-01-28')).to.equal('28 January 2000');
  });

  it('.getFormattedDate - should return empty string for non date inputs', () => {
    const invalidDates = [
      '2000-13-01',
      'Hello-World',
      null,
      undefined,
      '12345',
      ''
    ];
    for (const invalidDate of invalidDates) {
      expect(getFormattedDate(invalidDate)).to.equal('');
    }
  });

  it('.isEditMode - should return true when in edit mode', () => {
    const urls = [
      'http://localhost:8080/amend/date-of-birth/edit#amend-date-of-birth',
      'http://localhost:8080/new-and-renew/date-of-birth/edit#amend-date-of-birth',
      'https:/domain/replace/date-of-birth/edit#amend-date-of-birth',
      'protocol:/domain/url/edit'
    ];

    for (const url of urls) {
      const { pathname, search } = new URL(url);
      const originalUrl = pathname + search;
      expect(isEditMode({ originalUrl })).to.be.true;
    }
  });

  it('.isEditMode - should return false when not in edit mode', () => {
    const urls = [
      'http://localhost:8080/amend/date-of-birth',
      'http://localhost:8080/new-and-renew/edit-address#amend-date-of-birth',
      'https:/domain/replace/date-of-birth/edit-first-name#amend-date-of-birth',
      'protocol:/domain/url/test'
    ];

    for (const url of urls) {
      const { pathname, search } = new URL(url);
      const originalUrl = pathname + search;
      expect(isEditMode({ originalUrl })).to.be.false;
    }
  });

  it('.getPrecursorsShortLabel - should return the shortLabel for the given precursors label', () => {
    for (const explosivePrecursors of explosivePrecursorsList) {
      expect(getPrecursorsShortLabel(explosivePrecursors.label)).to.be.equal(
        explosivePrecursors.shortLabel
      );
    }
  });

  it('.getPrecursorsShortLabel - should return a partial replaced value with shortLabel', () => {
    for (const explosivePrecursors of explosivePrecursorsList) {
      expect(
        getPrecursorsShortLabel(`Why do you need ${explosivePrecursors.label}`)
      ).to.be.equal(`Why do you need ${explosivePrecursors.shortLabel}`);

      expect(
        getPrecursorsShortLabel(
          `Where will you store the ${explosivePrecursors.label}`
        )
      ).to.be.equal(
        `Where will you store the ${explosivePrecursors.shortLabel}`
      );

      expect(
        getPrecursorsShortLabel(
          `Where will you use the ${explosivePrecursors.label}`
        )
      ).to.be.equal(`Where will you use the ${explosivePrecursors.shortLabel}`);

      expect(
        getPrecursorsShortLabel(
          `Storage address for the ${explosivePrecursors.label}`
        )
      ).to.be.equal(
        `Storage address for the ${explosivePrecursors.shortLabel}`
      );

      expect(
        getPrecursorsShortLabel(
          `Usage address for the ${explosivePrecursors.label}`
        )
      ).to.be.equal(`Usage address for the ${explosivePrecursors.shortLabel}`);
    }
  });

  it('.getPrecursorsShortLabel - should return original result for falsy or non string inputs', () => {
    const inputs = [null, undefined, '', 1, true, {}];
    for (const input of inputs) {
      expect(getPrecursorsShortLabel(input)).to.be.equal(input);
    }
  });

  it('.getPrecursorsShortLabel - should return original result for unknown strings', () => {
    const inputs = ['Hello World', 'Unit test', 'random-text'];
    for (const input of inputs) {
      expect(getPrecursorsShortLabel(input)).to.be.equal(input);
    }
  });

  it('.textAreaDefaultLength - should return false when the input is greater than 2000', () => {
    const str = 'E'.repeat(2001);
    expect(textAreaDefaultLength(str)).to.be.false;
  });

  it('.textAreaDefaultLength - should return true when the input is less than or equal to 2000', () => {
    expect(textAreaDefaultLength('E'.repeat(1999))).to.be.true;
    expect(textAreaDefaultLength('E'.repeat(1000))).to.be.true;
    expect(textAreaDefaultLength('E'.repeat(2000))).to.be.true;
  });

  it('.isValidConcentrationValue - should return null for invalid formats', () => {
    const inputs = ['TEST', '1.024.', '.0.0', 'undefined'];
    inputs.forEach(input =>
      expect(isValidConcentrationValue(input)).to.equal(null)
    );
  });

  it('.isValidConcentrationValue - should match for valid formats', () => {
    const inputs = [
      '1.02',
      '100',
      '0.01',
      '1.0%',
      '5.6%',
      '6%',
      '12.56%',
      '100',
      '100%'
    ];
    inputs.forEach(input =>
      expect(isValidConcentrationValue(input)).to.not.equal(null)
    );
  });
});
