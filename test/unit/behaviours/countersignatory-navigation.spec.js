const CountersignatoryBehaviour = require('../../../apps/epp-amend/behaviours/countersignatory-navigation');

describe('Tests for countersignatory-navigation behaviour', () => {
  class Base {
    constructor() {}
    saveValues() {}
  }

  let req;
  let res;
  let instance;
  const next = 'unit-test';

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    sinon.stub(Base.prototype, 'saveValues').returns(req, res, next);
  });

  afterEach(() => {
    Base.prototype.saveValues.restore();
  });

  const scenarios = [
    {
      currentRoute: '/poisons',
      formValues: { 'amend-poisons-option': 'no' },
      sessionModelGetStub: {
        'amend-name-options': 'yes',
        'amend-home-address-options': 'no'
      },
      expectedRedirect: '/amend/countersignatory-details'
    },
    {
      currentRoute: '/poisons',
      formValues: { 'amend-poisons-option': 'no' },
      sessionModelGetStub: {
        'amend-name-options': 'no',
        'amend-home-address-options': 'no'
      },
      expectedRedirect: '/amend/no-poisons-or-precursors'
    },
    {
      currentRoute: '/poison-summary',
      formValues: {},
      sessionModelGetStub: {
        'amend-name-options': 'yes',
        'amend-home-address-options': 'no'
      },
      expectedRedirect: '/amend/countersignatory-details'
    },
    {
      currentRoute: '/no-poisons-or-precursors',
      formValues: { 'amend-no-poisons-precursors-options': 'yes' },
      sessionModelGetStub: {
        'amend-name-options': 'yes',
        'amend-home-address-options': 'no'
      },
      expectedRedirect: '/amend/countersignatory-details'
    },
    {
      currentRoute: '/no-poisons-or-precursors',
      formValues: { 'amend-no-poisons-precursors-options': 'yes' },
      sessionModelGetStub: {
        'amend-name-options': 'no',
        'amend-home-address-options': 'no'
      },
      expectedRedirect: '/amend/no-details-amend'
    }
  ];

  scenarios.forEach(
    ({ currentRoute, formValues, sessionModelGetStub, expectedRedirect }) => {
      it(`Should redirect to ${expectedRedirect} for route ${currentRoute}`, () => {
        req.form.values = formValues;
        req.sessionModel.get = sinon.stub();
        req.sessionModel.get
          .withArgs('amend-name-options')
          .returns(sessionModelGetStub['amend-name-options']);
        req.sessionModel.get
          .withArgs('amend-home-address-options')
          .returns(sessionModelGetStub['amend-home-address-options']);
        res.redirect = sinon.spy();

        instance = new (CountersignatoryBehaviour(currentRoute)(Base))();
        instance.saveValues(req, res, next);

        expect(res.redirect.calledOnce).to.be.true;
        expect(res.redirect.calledWith(expectedRedirect)).to.be.true;
      });
    }
  );
});
