const CountersignatoryBehaviour = require('../../../apps/epp-amend/behaviours/countersignatory-navigation');
const reqres = require('hof').utils.reqres;

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
    mockSpyOn(Base.prototype, 'saveValues').mockReturnValue(req, res, next);
  });

  afterEach(() => {
    Base.prototype.saveValues.mockRestore();
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
        req.sessionModel.get = mockFn();
        req.sessionModel.get
          .withArgs('amend-name-options')
          .mockReturnValue(sessionModelGetStub['amend-name-options']);
        req.sessionModel.get
          .withArgs('amend-home-address-options')
          .mockReturnValue(sessionModelGetStub['amend-home-address-options']);
        res.redirect = mockFn();

        instance = new (CountersignatoryBehaviour(currentRoute)(Base))();
        instance.saveValues(req, res, next);

        expect(res.redirect.calledOnce).toBe(true);
        expect(res.redirect.calledWith(expectedRedirect)).toBe(true);
      });
    }
  );
});
