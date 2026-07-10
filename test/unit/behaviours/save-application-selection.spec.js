const Model = require('hof').model;
const SaveApplicationSelection = require('../../../apps/epp-common/behaviours/save-application-selection');
const reqres = require('hof').utils.reqres;

describe('save-application-selection behaviour tests', () => {
  let behaviour;
  let Behaviour;
  let superSaveValuesStub;
  let req;
  let res;
  let next;

  class Base {}

  beforeEach(() => {
    req = reqres.req();
    res = {
      redirect: mockFn()
    };
    next = mockFn();
    superSaveValuesStub = mockFn();

    req.sessionModel = new Model({});

    Base.prototype.saveValues = superSaveValuesStub;
    Behaviour = SaveApplicationSelection;
    Behaviour = Behaviour(Base);
    behaviour = new Behaviour();
  });

  it('should be an instance', () => {
    expect(behaviour).toBeInstanceOf(Base);
  });

  it('should call super.saveValues', () => {
    behaviour.saveValues(req, res, next);
    expect(superSaveValuesStub).toHaveBeenCalledTimes(1);
  });

  it('Application type changed - clear the session data but keep the csrf-secret', () => {
    req.sessionModel.set('applicationType', 'new');
    req.sessionModel.options.session = {
      'hof-wizard-EPP form': {
        'csrf-secret': 'UT_csrf-secret',
        'other-data1': 'UT_other-data1',
        'other-data2': 'UT_other-data2'
      }
    };
    req.form.values = {
      'application-type': 'renew'
    };

    behaviour.saveValues(req, res, next);
    const expectedPartialSessionData = {
      'csrf-secret': 'UT_csrf-secret'
    };
    expect(req.sessionModel.options.session['hof-wizard-EPP form']).toEqual(
      expectedPartialSessionData
    );
    expect(superSaveValuesStub).toHaveBeenCalledTimes(1);
  });

  it('Application type not changed - should not clear the session', () => {
    req.sessionModel.set('applicationType', 'new');
    req.sessionModel.options.session = {
      'hof-wizard-EPP form': {
        'csrf-secret': 'UT_csrf-secret',
        'other-data1': 'UT_other-data1',
        'other-data2': 'UT_other-data2'
      }
    };
    req.form.values = {
      'application-type': 'new'
    };

    behaviour.saveValues(req, res, next);
    const expectedCompleteSessionData = {
      'csrf-secret': 'UT_csrf-secret',
      'other-data1': 'UT_other-data1',
      'other-data2': 'UT_other-data2'
    };
    expect(req.sessionModel.options.session['hof-wizard-EPP form']).toEqual(
      expectedCompleteSessionData
    );
    expect(superSaveValuesStub).toHaveBeenCalledTimes(1);
  });
});
