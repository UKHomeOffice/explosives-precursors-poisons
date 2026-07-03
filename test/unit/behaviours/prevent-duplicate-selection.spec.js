'use strict';

const PreventDuplicateSelection = require('../../../apps/epp-common/behaviours/prevent-duplicate-selection');

describe('preventDuplicateSelection behaviour', () => {
  let Behaviour;
  let req;
  let res;
  let next;

  beforeEach(() => {
    // Mock superclass and subclass instance
    const Base = class {
      saveValues() {
        next();
      }
    };

    Behaviour = PreventDuplicateSelection(
      'precursor-field',
      'aggregatorKey',
      '/error'
    )(Base);

    req = {
      sessionModel: {
        get: mockFn(),
        set: mockFn()
      },
      form: { values: {} }
    };

    res = { redirect: mockFn() };
    next = mockFn();
  });

  it('redirects when a duplicate is found', () => {
    req.sessionModel.get.mockReturnValue({
      aggregatedValues: [{ longTitle: 'Hydrogen Peroxide' }]
    });
    req.form.values['precursor-field'] = 'Hydrogen Peroxide';

    const behaviour = new Behaviour();
    behaviour.saveValues(req, res, next);

    expect(res.redirect.calledOnceWith('/error')).toBe(true);
    expect(next.called).toBe(false);
  });

  it('calls next() when no duplicates exist', () => {
    req.sessionModel.get.mockReturnValue({
      aggregatedValues: [{ longTitle: 'Ammonium Nitrate' }]
    });
    req.form.values['precursor-field'] = 'Hydrogen Peroxide';

    const behaviour = new Behaviour();
    behaviour.saveValues(req, res, next);

    expect(next.calledOnce).toBe(true);
    expect(res.redirect.called).toBe(false);
  });

  it('calls next() when there are no previously selected substances', () => {
    req.sessionModel.get.mockReturnValue(null);
    req.form.values['precursor-field'] = 'Hydrogen Peroxide';

    const behaviour = new Behaviour();
    behaviour.saveValues(req, res, next);

    expect(next.calledOnce).toBe(true);
    expect(res.redirect.called).toBe(false);
  });
});
