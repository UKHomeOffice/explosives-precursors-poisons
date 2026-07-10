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
    expect(result.items).toHaveLength(1);
    const fields = result.items[0].fields;
    expect(fields[0].parsed).toBe('Already');
    expect(fields[1].parsed).toBe('B');
  });

  it('should use exact field parse when available', () => {
    const parseStub = mockFn().mockImplementation(v => `parsed-${v}`);
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
    expect(parseStub).toHaveBeenCalledWith('X');
    expect(field.parsed).toBe('parsed-X');
  });

  it('should fall back to parent path parse when exact is missing', () => {
    const parentParse = mockFn().mockImplementation(v => `parent-${v}`);
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
    expect(parentParse).toHaveBeenCalledWith('UT_test');
    expect(field.parsed).toBe('parent-UT_test');
  });

  it('should prefer exact parse over parent when both exist', () => {
    const exactParse = mockFn().mockReturnValue('EXACT');
    const parentParse = mockFn().mockReturnValue('PARENT');
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
    expect(exactParse).toHaveBeenCalledWith('val');
    expect(parentParse).not.toHaveBeenCalled();
    expect(field.parsed).toBe('EXACT');
  });

  it('should use falsy but non-nullish parsed values (e.g., empty string)', () => {
    const exactParse = mockFn().mockReturnValue('');
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
    expect(exactParse).toHaveBeenCalledWith('something');
    expect(field.parsed).toBe('');
  });

  it('should not attempt parse when value is falsy (null/undefined)', () => {
    const parseSpy = mockFn();
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
    expect(parseSpy).not.toHaveBeenCalled();
    expect(fields[0].parsed).toBe(null);
    expect(fields[1].parsed).toBe(undefined);
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
    expect(result.other).toBe('keep-me');
    expect(result.items[0].fields[0].parsed).toBe('A-1');
    expect(result.items[1].fields[0].parsed).toBe('B-2');
  });
});
