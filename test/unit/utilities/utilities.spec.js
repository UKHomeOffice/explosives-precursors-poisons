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
  getSubstanceShortLabel,
  textAreaDefaultLength,
  isValidConcentrationValue,
  isLicenceValid,
  displayOptionalField,
  formatAttachments,
  showCounterSignatoryDetails,
  parseUnitValues
} = require('../../../utilities/helpers');

const explosivePrecursorsList = require('../../../utilities/constants/explosive-precursors');
const poisonsList = require('../../../utilities/constants/poisons');
const { SUBSTANCES } = require('../../../utilities/constants/string-constants');

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
      'http://localhost:8080/new-renew/date-of-birth/edit#amend-date-of-birth',
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
      'http://localhost:8080/new-renew/edit-address#amend-date-of-birth',
      'https:/domain/replace/date-of-birth/edit-first-name#amend-date-of-birth',
      'protocol:/domain/url/test'
    ];

    for (const url of urls) {
      const { pathname, search } = new URL(url);
      const originalUrl = pathname + search;
      expect(isEditMode({ originalUrl })).to.be.false;
    }
  });

  it('.getSubstanceShortLabel - should return the shortLabel for the given precursors label', () => {
    for (const explosivePrecursors of explosivePrecursorsList) {
      expect(
        getSubstanceShortLabel(explosivePrecursors.label, SUBSTANCES.PRECURSOR)
      ).to.be.equal(explosivePrecursors.shortLabel);
    }
  });

  it('.getSubstanceShortLabel - should return the shortLabel for the given poison label', () => {
    for (const poison of poisonsList) {
      expect(
        getSubstanceShortLabel(poison.label, SUBSTANCES.POISON)
      ).to.be.equal(poison.shortLabel);
    }
  });

  it('.getSubstanceShortLabel - should return a partial replaced value with shortLabel', () => {
    for (const explosivePrecursors of explosivePrecursorsList) {
      expect(
        getSubstanceShortLabel(
          `Why do you need ${explosivePrecursors.label}`,
          SUBSTANCES.PRECURSOR
        )
      ).to.be.equal(`Why do you need ${explosivePrecursors.shortLabel}`);

      expect(
        getSubstanceShortLabel(
          `Where will you store the ${explosivePrecursors.label}`,
          SUBSTANCES.PRECURSOR
        )
      ).to.be.equal(
        `Where will you store the ${explosivePrecursors.shortLabel}`
      );

      expect(
        getSubstanceShortLabel(
          `Where will you use the ${explosivePrecursors.label}`,
          SUBSTANCES.PRECURSOR
        )
      ).to.be.equal(`Where will you use the ${explosivePrecursors.shortLabel}`);

      expect(
        getSubstanceShortLabel(
          `Storage address for the ${explosivePrecursors.label}`,
          SUBSTANCES.PRECURSOR
        )
      ).to.be.equal(
        `Storage address for the ${explosivePrecursors.shortLabel}`
      );

      expect(
        getSubstanceShortLabel(
          `Usage address for the ${explosivePrecursors.label}`,
          SUBSTANCES.PRECURSOR
        )
      ).to.be.equal(`Usage address for the ${explosivePrecursors.shortLabel}`);
    }
  });

  it('.getSubstanceShortLabel - should return original result for falsy or non string inputs', () => {
    const inputs = [null, undefined, '', 1, true, {}];
    for (const input of inputs) {
      expect(getSubstanceShortLabel(input, SUBSTANCES.PRECURSOR)).to.be.equal(
        input
      );
    }
  });

  it('.getSubstanceShortLabel - should return original result for unknown strings', () => {
    const inputs = ['Hello World', 'Unit test', 'random-text'];
    for (const input of inputs) {
      expect(getSubstanceShortLabel(input, SUBSTANCES.PRECURSOR)).to.be.equal(
        input
      );
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

  describe('.isLicenceValid', () => {
    it('should be valid for empty licence number', () => {
      const req = {
        sessionModel: {
          get: () => 'renew'
        },
        form: {
          values: {
            'new-renew-licence-number': ''
          }
        },
        log: () => {}
      };
      const result = isLicenceValid(req);

      expect(result.isValid).to.be.true;
      expect(result.fieldName).to.equal('new-renew-licence-number');
    });

    it('should be invalid for length less than 13', () => {
      const req = {
        sessionModel: {
          get: () => 'renew'
        },
        form: {
          values: {
            'new-renew-licence-number': '12/a/1235265'
          }
        },
        log: () => {}
      };
      const result = isLicenceValid(req);

      expect(result.isValid).to.be.false;
      expect(result.errorType).to.equal('licence-length-restriction');
      expect(result.fieldName).to.equal('new-renew-licence-number');
    });

    it('should be invalid for length greater than 16', () => {
      const req = {
        sessionModel: {
          get: () => 'renew'
        },
        form: {
          values: {
            'new-renew-licence-number': '12/a/1235265/565775'
          }
        },
        log: () => {}
      };
      const result = isLicenceValid(req);

      expect(result.isValid).to.be.false;
      expect(result.errorType).to.equal('licence-length-restriction');
      expect(result.fieldName).to.equal('new-renew-licence-number');
    });

    it('should throw an error for unsupported application type', () => {
      const req = {
        sessionModel: {
          get: () => 'new'
        },
        form: {
          values: {
            'new-renew-licence-number': '95/W/000000/2024'
          }
        },
        log: () => {}
      };

      expect(() => isLicenceValid(req)).to.throw('Unknown application type');
    });

    it('should be valid for correct format licence number', () => {
      const req = {
        sessionModel: {
          get: () => 'replace'
        },
        form: {
          values: {
            'replace-licence-number': '95/W/000000/2024'
          }
        },
        log: () => {}
      };

      const result = isLicenceValid(req);
      expect(result.isValid).to.be.true;
      expect(result.fieldName).to.equal('replace-licence-number');
      expect(result.errorType).to.equal(undefined);
    });
  });

  describe('displayOptionalField', () => {
    it('should return null if req.sessionModel is not defined', () => {
      const req = {};
      const result = displayOptionalField(req, 'step1', 'value1');
      expect(result).to.be.null;
    });

    it('should return null if req.sessionModel.get("steps") is not defined', () => {
      const req = { sessionModel: { get: sinon.stub().returns(undefined) } };
      const result = displayOptionalField(req, 'step1', 'value1');
      expect(result).to.be.null;
    });

    it('should return null if req.sessionModel.get("steps") does not include the step', () => {
      const req = { sessionModel: { get: sinon.stub().returns(['step2']) } };
      const result = displayOptionalField(req, 'step1', 'value1');
      expect(result).to.be.null;
    });

    it('should return the value if req.sessionModel.get("steps") includes the step and value is provided', () => {
      const req = { sessionModel: { get: sinon.stub().returns(['step1']) } };
      const result = displayOptionalField(req, 'step1', 'value1');
      expect(result).to.equal('value1');
    });

    it(
      'should return "Not provided" if req.sessionModel.get("steps") includes the ' +
        'step and value is not provided',
      () => {
        const req = { sessionModel: { get: sinon.stub().returns(['step1']) } };
        const result = displayOptionalField(req, 'step1');
        expect(result).to.equal('Not provided');
      }
    );
  });

  describe('formatAttachments', () => {
    it('should return empty string if req.sessionModel is not defined', () => {
      const req = {};
      const result = formatAttachments(['doc1', 'doc2'], req, 'step1');
      expect(result).to.equal('');
    });

    it('should return empty string if req.sessionModel.get("steps") is not defined', () => {
      const req = { sessionModel: { get: sinon.stub().returns(undefined) } };
      const result = formatAttachments(['doc1', 'doc2'], req, 'step1');
      expect(result).to.equal('');
    });

    it('should return empty string if req.sessionModel.get("steps") does not include the step', () => {
      const req = { sessionModel: { get: sinon.stub().returns(['step2']) } };
      const result = formatAttachments(['doc1', 'doc2'], req, 'step1');
      expect(result).to.equal('');
    });

    it('should return empty string if documents is not an array', () => {
      const req = { sessionModel: { get: sinon.stub().returns(['step1']) } };
      const result = formatAttachments('doc1', req, 'step1');
      expect(result).to.equal('');
    });

    it('should return empty string if documents is an empty array', () => {
      const req = { sessionModel: { get: sinon.stub().returns(['step1']) } };
      const result = formatAttachments([], req, 'step1');
      expect(result).to.equal('');
    });

    it(
      'should return formatted document names if req.sessionModel.get("steps") ' +
        'includes the step and documents is a non-empty array',
      () => {
        const req = { sessionModel: { get: sinon.stub().returns(['step1']) } };
        const documents = [{ name: 'doc1' }, { name: 'doc2' }];
        const result = formatAttachments(documents, req, 'step1');
        expect(result).to.equal('doc1\n\ndoc2');
      }
    );

    it('should handle documents with missing names gracefully', () => {
      const req = { sessionModel: { get: sinon.stub().returns(['step1']) } };
      const documents = [{ name: 'doc1' }, {}, { name: 'doc2' }];
      const result = formatAttachments(documents, req, 'step1');
      expect(result).to.equal('doc1\n\n\n\ndoc2');
    });
  });

  describe('showCounterSignatoryDetails', () => {
    it('should return null - no changes to details', () => {
      const req = { sessionModel: { get: sinon.stub() } };
      req.sessionModel.get.withArgs('replace-is-details-changed').returns('no');
      req.sessionModel.get.withArgs('replace-name-options').returns('yes');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .returns('yes');

      expect(showCounterSignatoryDetails('test-value', req)).to.be.null;
    });
    it('should return null - no changes to name or address', () => {
      const req = { sessionModel: { get: sinon.stub() } };
      req.sessionModel.get
        .withArgs('replace-is-details-changed')
        .returns('yes');
      req.sessionModel.get.withArgs('replace-name-options').returns('no');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .returns('no');

      expect(showCounterSignatoryDetails('test-value', req)).to.be.null;
    });
    it('should return the value - changes to name', () => {
      const req = { sessionModel: { get: sinon.stub() } };
      req.sessionModel.get
        .withArgs('replace-is-details-changed')
        .returns('yes');
      req.sessionModel.get.withArgs('replace-name-options').returns('yes');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .returns('no');

      expect(showCounterSignatoryDetails('test-value', req)).to.equal(
        'test-value'
      );
    });
    it('should return the value - changes to address', () => {
      const req = { sessionModel: { get: sinon.stub() } };
      req.sessionModel.get
        .withArgs('replace-is-details-changed')
        .returns('yes');
      req.sessionModel.get.withArgs('replace-name-options').returns('no');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .returns('yes');

      expect(showCounterSignatoryDetails('test-value', req)).to.equal(
        'test-value'
      );
    });
    it('should return the value - changes to name and address', () => {
      const req = { sessionModel: { get: sinon.stub() } };
      req.sessionModel.get
        .withArgs('replace-is-details-changed')
        .returns('yes');
      req.sessionModel.get.withArgs('replace-name-options').returns('yes');
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .returns('yes');

      expect(showCounterSignatoryDetails('test-value', req)).to.equal(
        'test-value'
      );
    });
  });

  describe('parseUnitValues tests', () => {
    it('should return empty string for falsy inputs', () => {
      const inputs = [null, undefined, ''];
      inputs.forEach(input => expect(parseUnitValues(input)).to.equal(''));
    });

    it('should format value-unit when hyphen present', () => {
      expect(parseUnitValues('100-g')).to.equal('100 g');
      expect(parseUnitValues('250-ml')).to.equal('250 ml');
    });

    it('should default value to 0 when missing before last hyphen', () => {
      expect(parseUnitValues('-ml')).to.equal('0 ml');
    });

    it('should treat input without hyphen as unit (value becomes 0)', () => {
      expect(parseUnitValues('100ml')).to.equal('0 100ml');
    });

    it('should handle trailing hyphen (empty unit)', () => {
      expect(parseUnitValues('g-')).to.equal('g ');
    });
  });
});
