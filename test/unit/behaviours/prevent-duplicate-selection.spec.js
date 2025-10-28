'use strict';

const PreventDuplicateSelection = require('../../../apps/epp-common/behaviours/prevent-duplicate-selection');
const sinon = require('sinon');
const { expect } = require('chai');

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

    Behaviour = PreventDuplicateSelection('precursor-field', 'aggregatorKey', '/error')(Base);

    req = {
      sessionModel: {
        get: sinon.stub(),
        set: sinon.spy()
      },
      form: { values: {} }
    };

    res = { redirect: sinon.spy() };
    next = sinon.spy();
  });

  it('redirects when a duplicate is found', () => {
    req.sessionModel.get.returns({
      aggregatedValues: [{ longTitle: 'Hydrogen Peroxide' }]
    });
    req.form.values['precursor-field'] = 'Hydrogen Peroxide';

    const behaviour = new Behaviour();
    behaviour.saveValues(req, res, next);

    expect(res.redirect.calledOnceWith('/error')).to.be.true;
    expect(next.called).to.be.false;
  });

  it('calls next() when no duplicates exist', () => {
    req.sessionModel.get.returns({
      aggregatedValues: [{ longTitle: 'Ammonium Nitrate' }]
    });
    req.form.values['precursor-field'] = 'Hydrogen Peroxide';

    const behaviour = new Behaviour();
    behaviour.saveValues(req, res, next);

    expect(next.calledOnce).to.be.true;
    expect(res.redirect.called).to.be.false;
  });

  it('calls next() when there are no previously selected substances', () => {
    req.sessionModel.get.returns(null);
    req.form.values['precursor-field'] = 'Hydrogen Peroxide';

    const behaviour = new Behaviour();
    behaviour.saveValues(req, res, next);

    expect(next.calledOnce).to.be.true;
    expect(res.redirect.called).to.be.false;
  });
});
