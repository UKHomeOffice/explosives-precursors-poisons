const RemoveEditMode = require('../../../apps/epp-common/behaviours/remove-edit-mode');
const Model = require('hof').model;

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
      redirect: sinon.spy()
    };
    next = sinon.stub();
    superGetValuesStub = sinon.stub();

    req.sessionModel = new Model({});

    Base.prototype.getValues = superGetValuesStub;
    Behaviour = RemoveEditMode;
    Behaviour = Behaviour(Base);
    behaviour = new Behaviour();
  });

  it('should be an instance', () => {
    expect(behaviour).to.be.an.instanceOf(Base);
  });

  it('should call super.getValues', () => {
    behaviour.getValues(req, res, next);
    superGetValuesStub.should.be.calledOnce;
  });

  it('Application type changed and in edit mode - should remove edit from URL and redirect to the new URL', () => {
    req.originalUrl = 'base/some-url/edit';
    req.sessionModel.set('applicationTypeChanged', true);
    behaviour.getValues(req, res, next);
    expect(res.redirect.calledOnce).to.be.true;
    expect(res.redirect.calledWith('base/some-url')).to.be.true;
    superGetValuesStub.should.not.be.called;
  });

  it('Application type not changed - should not redirect', () => {
    req.originalUrl = 'base/some-url/edit';
    req.sessionModel.set('applicationTypeChanged', false);
    behaviour.getValues(req, res, next);
    expect(res.redirect.called).to.be.false;
    superGetValuesStub.should.be.calledOnce;
  });
});
