const mockHelpersStub = {
  DEFAULT_AGGREGATOR_LIMIT: 5,
  getSubstanceShortLabel: mockFn().mockReturnValue('short-label')
};

jest.mock('../../../utilities/helpers', () => mockHelpersStub);

const Behaviour = require('../../../apps/epp-common/behaviours/aggregator-save-update-precursors-poisons');

describe('Behaviour', () => {
  let instance;
  let req;

  beforeEach(() => {
    req = {
      sessionModel: {
        get: mockFn(),
        set: mockFn(),
        unset: mockFn()
      },
      form: {
        options: {
          fieldsConfig: {}
        }
      }
    };
    class SuperClass {}
    instance = new (Behaviour(SuperClass))({
      aggregateTo: 'aggregateField',
      aggregateFrom: ['field1', 'field2']
    });
  });

  describe('parsePrecursorField', () => {
    it('should parse array field correctly when field is where-to-store-precursor', () => {
      const field = 'where-to-store-precursor';
      const value = ['value1', 'value2'];
      req.sessionModel.get
        .withArgs('homeAddressInline')
        .mockReturnValue('homeAddress');
      req.sessionModel.get
        .withArgs('store-precursors-other-address')
        .mockReturnValue('otherAddress');

      const result = instance.parsePrecursorField(field, value, req);

      expect(result).toBe('homeAddress\n\notherAddress');
    });

    it('should parse array field correctly when field is where-to-use-precursor', () => {
      const field = 'where-to-use-precursor';
      const value = ['value1', 'value2'];
      req.sessionModel.get
        .withArgs('homeAddressInline')
        .mockReturnValue('homeAddress');
      req.sessionModel.get
        .withArgs('precursors-use-other-address')
        .mockReturnValue('otherAddress');

      const result = instance.parsePrecursorField(field, value, req);

      expect(result).toBe('homeAddress\n\notherAddress');
    });

    it(
      'should parse string field correctly when field is ' +
        'where-to-store-precursor and value is ' +
        'store-precursors-home-address-value',
      () => {
        const field = 'where-to-store-precursor';
        const value = 'store-precursors-home-address-value';
        req.sessionModel.get
          .withArgs('homeAddressInline')
          .mockReturnValue('homeAddress');

        const result = instance.parsePrecursorField(field, value, req);

        expect(result).toBe('homeAddress');
      }
    );

    it(
      'should parse string field correctly when field is ' +
        'where-to-store-precursor and value is ' +
        'store-precursors-other-address-value',
      () => {
        const field = 'where-to-store-precursor';
        const value = 'store-precursors-other-address-value';
        req.sessionModel.get
          .withArgs('store-precursors-other-address')
          .mockReturnValue('otherAddress');

        const result = instance.parsePrecursorField(field, value, req);

        expect(result).toBe('otherAddress');
      }
    );

    it(
      'should parse string field correctly when field is ' +
        'where-to-use-precursor and ' +
        'value is use-precursors-home-address-value',
      () => {
        const field = 'where-to-use-precursor';
        const value = 'use-precursors-home-address-value';
        req.sessionModel.get
          .withArgs('homeAddressInline')
          .mockReturnValue('homeAddress');

        const result = instance.parsePrecursorField(field, value, req);

        expect(result).toBe('homeAddress');
      }
    );

    it(
      'should parse string field correctly when field is ' +
        'where-to-use-precursor and value is ' +
        'use-precursors-other-address-value',
      () => {
        const field = 'where-to-use-precursor';
        const value = 'use-precursors-other-address-value';
        req.sessionModel.get
          .withArgs('precursors-use-other-address')
          .mockReturnValue('otherAddress');

        const result = instance.parsePrecursorField(field, value, req);

        expect(result).toBe('otherAddress');
      }
    );

    it('should parse field using custom parser if provided', () => {
      const field = { field: 'customField', value: 'customValue' };
      req.form.options.fieldsConfig.customField = {
        parse: mockFn().mockReturnValue('parsedValue')
      };

      const result = instance.parsePrecursorField(field, field.value, req);

      expect(result).toBe('parsedValue');
      expect(
        req.form.options.fieldsConfig.customField.parse
      ).toHaveBeenCalledTimes(1);
      expect(
        req.form.options.fieldsConfig.customField.parse
      ).toHaveBeenCalledWith('customValue');
    });

    it('should return original value if no specific parsing is needed', () => {
      const field = 'someField';
      const value = 'someValue';

      const result = instance.parsePrecursorField(field, value, req);

      expect(result).toBe('someValue');
    });
  });

  describe('parsePoisonField', () => {
    it('should parse array field correctly when field is where-to-store-poison', () => {
      const field = 'where-to-store-poison';
      const value = ['value1', 'value2'];
      req.sessionModel.get
        .withArgs('homeAddressInline')
        .mockReturnValue('homeAddress');
      req.sessionModel.get
        .withArgs('store-poison-other-address')
        .mockReturnValue('otherAddress');

      const result = instance.parsePoisonField(field, value, req);

      expect(result).toBe('homeAddress\n\notherAddress');
    });

    it('should parse array field correctly when field is where-to-use-poison', () => {
      const field = 'where-to-use-poison';
      const value = ['value1', 'value2'];
      req.sessionModel.get
        .withArgs('homeAddressInline')
        .mockReturnValue('homeAddress');
      req.sessionModel.get
        .withArgs('poison-use-other-address')
        .mockReturnValue('otherAddress');

      const result = instance.parsePoisonField(field, value, req);

      expect(result).toBe('homeAddress\n\notherAddress');
    });

    it(
      'should parse string field correctly when field is ' +
        'where-to-store-poison and value is ' +
        'store-poison-home-address-value',
      () => {
        const field = 'where-to-store-poison';
        const value = 'store-poison-home-address-value';
        req.sessionModel.get
          .withArgs('homeAddressInline')
          .mockReturnValue('homeAddress');

        const result = instance.parsePoisonField(field, value, req);

        expect(result).toBe('homeAddress');
      }
    );

    it(
      'should parse string field correctly when field is ' +
        'where-to-store-poison and value is ' +
        'store-poison-other-address-value',
      () => {
        const field = 'where-to-store-poison';
        const value = 'store-poison-other-address-value';
        req.sessionModel.get
          .withArgs('store-poison-other-address')
          .mockReturnValue('otherAddress');

        const result = instance.parsePoisonField(field, value, req);

        expect(result).toBe('otherAddress');
      }
    );

    it(
      'should parse string field correctly when field is ' +
        'where-to-use-poison and ' +
        'value is use-poison-home-address',
      () => {
        const field = 'where-to-use-poison';
        const value = 'use-poison-home-address';
        req.sessionModel.get
          .withArgs('homeAddressInline')
          .mockReturnValue('homeAddress');

        const result = instance.parsePoisonField(field, value, req);

        expect(result).toBe('homeAddress');
      }
    );

    it(
      'should parse string field correctly when field is ' +
        'where-to-use-poison and value is ' +
        'use-poison-other-address-value',
      () => {
        const field = 'where-to-use-poison';
        const value = 'use-poison-other-address-value';
        req.sessionModel.get
          .withArgs('poison-use-other-address')
          .mockReturnValue('otherAddress');

        const result = instance.parsePoisonField(field, value, req);

        expect(result).toBe('otherAddress');
      }
    );

    it('should parse field using custom parser if provided', () => {
      const field = { field: 'customField', value: 'customValue' };
      req.form.options.fieldsConfig.customField = {
        parse: mockFn().mockReturnValue('parsedValue')
      };

      const result = instance.parsePoisonField(field, field.value, req);

      expect(result).toBe('parsedValue');
      expect(
        req.form.options.fieldsConfig.customField.parse
      ).toHaveBeenCalledTimes(1);
      expect(
        req.form.options.fieldsConfig.customField.parse
      ).toHaveBeenCalledWith('customValue');
    });

    it('should return original value if no specific parsing is needed', () => {
      const field = 'someField';
      const value = 'someValue';

      const result = instance.parsePoisonField(field, value, req);

      expect(result).toBe('someValue');
    });
  });
});
