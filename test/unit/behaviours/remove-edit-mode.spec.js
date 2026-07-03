const Model = require('hof').model;
const RemoveEditMode = require('../../../apps/epp-common/behaviours/remove-edit-mode');
const reqres = require('hof').utils.reqres;

const setAppTypeChanged = (req, value) => {
  req.sessionModel.set('applicationTypeChanged', value);
};

describe('remove-edit-mode behaviour tests', () => {
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
      redirect: mockFn()
    };
    next = mockFn();
    superGetValuesStub = mockFn();

    req.sessionModel = new Model({});

    Base.prototype.getValues = superGetValuesStub;
    Behaviour = RemoveEditMode;
    Behaviour = Behaviour(Base);
    behaviour = new Behaviour();
  });

  it('should be an instance', () => {
    expect(behaviour).toBeInstanceOf(Base);
  });

  it('should call super.getValues', () => {
    behaviour.getValues(req, res, next);
    expect(superGetValuesStub).toHaveBeenCalledTimes(1);
  });

  it('Application type changed and in edit mode - should remove edit from URL and redirect to the new URL', () => {
    req.originalUrl = 'base/some-url/edit';
    setAppTypeChanged(req, true);
    behaviour.getValues(req, res, next);
    expect(res.redirect.calledOnce).toBe(true);
    expect(res.redirect.calledWith('base/some-url')).toBe(true);
    expect(superGetValuesStub).not.toHaveBeenCalled();
  });

  it('Application type changed and non edit mode - should not redirect', () => {
    req.originalUrl = 'base/some-url';
    setAppTypeChanged(req, true);
    behaviour.getValues(req, res, next);
    expect(res.redirect.calledOnce).toBe(false);
    expect(superGetValuesStub).toHaveBeenCalled();
  });

  it('Application type not changed - should not redirect', () => {
    req.originalUrl = 'base/some-url/edit';
    setAppTypeChanged(req, false);
    behaviour.getValues(req, res, next);
    expect(res.redirect.called).toBe(false);
    expect(superGetValuesStub).toHaveBeenCalledTimes(1);
  });
});
