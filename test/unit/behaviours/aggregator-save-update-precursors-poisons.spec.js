const proxyquire = require('proxyquire');
const helpersStub = {
  DEFAULT_AGGREGATOR_LIMIT: 5,
  getSubstanceShortLabel: sinon.stub().returns('short-label')
};

const Behaviour = proxyquire(
  '../../../apps/epp-common/behaviours/aggregator-save-update-precursors-poisons',
  {
    '../../../utilities/helpers': helpersStub
  }
);

describe('Behaviour', () => {
  let instance;
  let req;

  beforeEach(() => {
    req = {
      sessionModel: {
        get: sinon.stub(),
        set: sinon.stub(),
        unset: sinon.stub()
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
    it('should parse array field correctly when field is amend-where-to-store-precursor', () => {
      const field = 'amend-where-to-store-precursor';
      const value = ['value1', 'value2'];
      req.sessionModel.get.withArgs('homeAddressInline').returns('homeAddress');
      req.sessionModel.get
        .withArgs('store-precursors-other-address')
        .returns('otherAddress');

      const result = instance.parsePrecursorField(field, value, req);

      expect(result).to.equal('homeAddress\n\notherAddress');
    });

    it('should parse array field correctly when field is amend-where-to-use-precursor', () => {
      const field = 'amend-where-to-use-precursor';
      const value = ['value1', 'value2'];
      req.sessionModel.get.withArgs('homeAddressInline').returns('homeAddress');
      req.sessionModel.get
        .withArgs('precursors-use-other-address')
        .returns('otherAddress');

      const result = instance.parsePrecursorField(field, value, req);

      expect(result).to.equal('homeAddress\n\notherAddress');
    });

    it(
      'should parse string field correctly when field is ' +
        'amend-where-to-store-precursor and value is ' +
        'amend-store-precursors-home-address',
      () => {
        const field = 'amend-where-to-store-precursor';
        const value = 'amend-store-precursors-home-address';
        req.sessionModel.get
          .withArgs('homeAddressInline')
          .returns('homeAddress');

        const result = instance.parsePrecursorField(field, value, req);

        expect(result).to.equal('homeAddress');
      }
    );

    it(
      'should parse string field correctly when field is ' +
        'amend-where-to-store-precursor and value is ' +
        'amend-store-precursors-other-address',
      () => {
        const field = 'amend-where-to-store-precursor';
        const value = 'amend-store-precursors-other-address';
        req.sessionModel.get
          .withArgs('store-precursors-other-address')
          .returns('otherAddress');

        const result = instance.parsePrecursorField(field, value, req);

        expect(result).to.equal('otherAddress');
      }
    );

    it(
      'should parse string field correctly when field is ' +
        'amend-where-to-use-precursor and ' +
        'value is amend-use-precursors-home-address',
      () => {
        const field = 'amend-where-to-use-precursor';
        const value = 'amend-use-precursors-home-address';
        req.sessionModel.get
          .withArgs('homeAddressInline')
          .returns('homeAddress');

        const result = instance.parsePrecursorField(field, value, req);

        expect(result).to.equal('homeAddress');
      }
    );

    it(
      'should parse string field correctly when field is ' +
        'amend-where-to-use-precursor and value is ' +
        'amend-use-precursors-other-address',
      () => {
        const field = 'amend-where-to-use-precursor';
        const value = 'amend-use-precursors-other-address';
        req.sessionModel.get
          .withArgs('precursors-use-other-address')
          .returns('otherAddress');

        const result = instance.parsePrecursorField(field, value, req);

        expect(result).to.equal('otherAddress');
      }
    );

    it('should parse field using custom parser if provided', () => {
      const field = { field: 'customField', value: 'customValue' };
      req.form.options.fieldsConfig.customField = {
        parse: sinon.stub().returns('parsedValue')
      };

      const result = instance.parsePrecursorField(field, field.value, req);

      expect(result).to.equal('parsedValue');
      expect(
        req.form.options.fieldsConfig.customField.parse.calledOnceWith(
          'customValue'
        )
      ).to.be.true;
    });

    it('should return original value if no specific parsing is needed', () => {
      const field = 'someField';
      const value = 'someValue';

      const result = instance.parsePrecursorField(field, value, req);

      expect(result).to.equal('someValue');
    });
  });

  describe('parsePoisonField', () => {
    it('should parse array field correctly when field is amend-where-to-store-poison', () => {
      const field = 'amend-where-to-store-poison';
      const value = ['value1', 'value2'];
      req.sessionModel.get.withArgs('homeAddressInline').returns('homeAddress');
      req.sessionModel.get
        .withArgs('store-poison-other-address')
        .returns('otherAddress');

      const result = instance.parsePoisonField(field, value, req);

      expect(result).to.equal('homeAddress\n\notherAddress');
    });

    it('should parse array field correctly when field is amend-where-to-use-poison', () => {
      const field = 'amend-where-to-use-poison';
      const value = ['value1', 'value2'];
      req.sessionModel.get.withArgs('homeAddressInline').returns('homeAddress');
      req.sessionModel.get
        .withArgs('poison-use-other-address')
        .returns('otherAddress');

      const result = instance.parsePoisonField(field, value, req);

      expect(result).to.equal('homeAddress\n\notherAddress');
    });

    it(
      'should parse string field correctly when field is ' +
        'amend-where-to-store-poison and value is ' +
        'amend-store-poison-home-address',
      () => {
        const field = 'amend-where-to-store-poison';
        const value = 'amend-store-poison-home-address';
        req.sessionModel.get
          .withArgs('homeAddressInline')
          .returns('homeAddress');

        const result = instance.parsePoisonField(field, value, req);

        expect(result).to.equal('homeAddress');
      }
    );

    it(
      'should parse string field correctly when field is ' +
        'amend-where-to-store-poison and value is ' +
        'amend-store-poison-other-address',
      () => {
        const field = 'amend-where-to-store-poison';
        const value = 'amend-store-poison-other-address';
        req.sessionModel.get
          .withArgs('store-poison-other-address')
          .returns('otherAddress');

        const result = instance.parsePoisonField(field, value, req);

        expect(result).to.equal('otherAddress');
      }
    );

    it(
      'should parse string field correctly when field is ' +
        'amend-where-to-use-poison and ' +
        'value is amend-use-poison-home-address',
      () => {
        const field = 'amend-where-to-use-poison';
        const value = 'amend-use-poison-home-address';
        req.sessionModel.get
          .withArgs('homeAddressInline')
          .returns('homeAddress');

        const result = instance.parsePoisonField(field, value, req);

        expect(result).to.equal('homeAddress');
      }
    );

    it(
      'should parse string field correctly when field is ' +
        'amend-where-to-use-poison and value is ' +
        'amend-use-poison-other-address',
      () => {
        const field = 'amend-where-to-use-poison';
        const value = 'amend-use-poison-other-address';
        req.sessionModel.get
          .withArgs('poison-use-other-address')
          .returns('otherAddress');

        const result = instance.parsePoisonField(field, value, req);

        expect(result).to.equal('otherAddress');
      }
    );

    it('should parse field using custom parser if provided', () => {
      const field = { field: 'customField', value: 'customValue' };
      req.form.options.fieldsConfig.customField = {
        parse: sinon.stub().returns('parsedValue')
      };

      const result = instance.parsePoisonField(field, field.value, req);

      expect(result).to.equal('parsedValue');
      expect(
        req.form.options.fieldsConfig.customField.parse.calledOnceWith(
          'customValue'
        )
      ).to.be.true;
    });

    it('should return original value if no specific parsing is needed', () => {
      const field = 'someField';
      const value = 'someValue';

      const result = instance.parsePoisonField(field, value, req);

      expect(result).to.equal('someValue');
    });
  });
});
