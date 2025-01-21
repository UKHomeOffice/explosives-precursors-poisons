const SaveApplicationSelection = require('../../../apps/epp-common/behaviours/save-application-selection');
const Model = require('hof').model;

describe('save-application-selection behaviour tests', () => {
  let behaviour;
  let Behaviour;
  let superGetValuesStub;
  let req;
  let res;
  let next;

  class Base {}

  beforeEach(() => {
    req = reqres.req();
    res = {
      redirect: sinon.spy()
    };
    next = sinon.stub();
    superGetValuesStub = sinon.stub();

    req.sessionModel = new Model({});

    Base.prototype.saveValues = superGetValuesStub;
    Behaviour = SaveApplicationSelection;
    Behaviour = Behaviour(Base);
    behaviour = new Behaviour();
  });

  it('should be an instance', () => {
    expect(behaviour).to.be.an.instanceOf(Base);
  });

  it('should call super.saveValues', () => {
    behaviour.saveValues(req, res, next);
    superGetValuesStub.should.be.calledOnce;
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
    expect(
      req.sessionModel.options.session['hof-wizard-EPP form']
    ).to.deep.equal(expectedPartialSessionData);
    superGetValuesStub.should.be.calledOnce;
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
    expect(
      req.sessionModel.options.session['hof-wizard-EPP form']
    ).to.deep.equal(expectedCompleteSessionData);
    superGetValuesStub.should.be.calledOnce;
  });
});
