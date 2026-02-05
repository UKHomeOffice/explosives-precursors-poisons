'use strict';

const behaviour = require('../../../apps/epp-common/behaviours/execute-field-custom-parse');

describe('behaviours/execute-field-custom-parse tests', () => {
  const makeController = locals => {
    class Base {
      locals() {
        return locals;
      }
    }
    const Controller = behaviour(Base);
    return new Controller();
  };

  it('should set parsed to existing parsed or value when no fieldsConfig', () => {
    const controller = makeController({
      items: [
        {
          fields: [
            { field: 'alpha', value: 'A', parsed: 'Already' },
            { field: 'beta', value: 'B' }
          ]
        }
      ]
    });

    const result = controller.locals({}, {});
    expect(result.items).to.have.length(1);
    const fields = result.items[0].fields;
    expect(fields[0].parsed).to.equal('Already');
    expect(fields[1].parsed).to.equal('B');
  });

  it('should use exact field parse when available', () => {
    const parseStub = sinon.stub().callsFake(v => `parsed-${v}`);
    const controller = makeController({
      items: [{ fields: [{ field: 'exact.field', value: 'X' }] }]
    });

    const req = {
      form: {
        options: {
          fieldsConfig: {
            'exact.field': { parse: parseStub }
          }
        }
      }
    };

    const result = controller.locals(req, {});
    const field = result.items[0].fields[0];
    expect(parseStub).to.have.been.calledOnceWith('X');
    expect(field.parsed).to.equal('parsed-X');
  });

  it('should fall back to parent path parse when exact is missing', () => {
    const parentParse = sinon.stub().callsFake(v => `parent-${v}`);
    const controller = makeController({
      items: [{ fields: [{ field: 'person.name.first', value: 'UT_test' }] }]
    });

    const req = {
      form: {
        options: {
          fieldsConfig: {
            'person.name': { parse: parentParse }
          }
        }
      }
    };

    const result = controller.locals(req, {});
    const field = result.items[0].fields[0];
    expect(parentParse).to.have.been.calledOnceWith('UT_test');
    expect(field.parsed).to.equal('parent-UT_test');
  });

  it('should prefer exact parse over parent when both exist', () => {
    const exactParse = sinon.stub().returns('EXACT');
    const parentParse = sinon.stub().returns('PARENT');
    const controller = makeController({
      items: [{ fields: [{ field: 'a.b.c', value: 'val' }] }]
    });

    const req = {
      form: {
        options: {
          fieldsConfig: {
            'a.b.c': { parse: exactParse },
            'a.b': { parse: parentParse }
          }
        }
      }
    };

    const result = controller.locals(req, {});
    const field = result.items[0].fields[0];
    expect(exactParse).to.have.been.calledOnceWith('val');
    expect(parentParse).not.to.have.been.called;
    expect(field.parsed).to.equal('EXACT');
  });

  it('should use falsy but non-nullish parsed values (e.g., empty string)', () => {
    const exactParse = sinon.stub().returns('');
    const controller = makeController({
      items: [{ fields: [{ field: 'foo.bar', value: 'something' }] }]
    });

    const req = {
      form: {
        options: {
          fieldsConfig: {
            'foo.bar': { parse: exactParse }
          }
        }
      }
    };

    const result = controller.locals(req, {});
    const field = result.items[0].fields[0];
    expect(exactParse).to.have.been.calledOnceWith('something');
    expect(field.parsed).to.equal('');
  });

  it('should not attempt parse when value is falsy (null/undefined)', () => {
    const parseSpy = sinon.spy();
    const controller = makeController({
      items: [
        {
          fields: [
            { field: 'x.y', value: null },
            { field: 'x.z', value: undefined }
          ]
        }
      ]
    });

    const req = {
      form: {
        options: {
          fieldsConfig: {
            'x.y': { parse: parseSpy },
            x: { parse: parseSpy }
          }
        }
      }
    };

    const result = controller.locals(req, {});
    const fields = result.items[0].fields;
    expect(parseSpy).not.to.have.been.called;
    expect(fields[0].parsed).to.equal(null);
    expect(fields[1].parsed).to.equal(undefined);
  });

  it('should handle multiple items and preserve non-field locals', () => {
    const controller = makeController({
      other: 'keep-me',
      items: [
        { fields: [{ field: 'a', value: '1' }] },
        { fields: [{ field: 'b.c', value: '2' }] }
      ]
    });

    const req = {
      form: {
        options: {
          fieldsConfig: {
            a: { parse: v => `A-${v}` },
            b: { parse: v => `B-${v}` }
          }
        }
      }
    };

    const result = controller.locals(req, {});
    expect(result.other).to.equal('keep-me');
    expect(result.items[0].fields[0].parsed).to.equal('A-1');
    expect(result.items[1].fields[0].parsed).to.equal('B-2');
  });
});
