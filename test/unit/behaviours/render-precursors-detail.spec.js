const RenderPrecursorsDetail = require('../../../apps/epp-amend/behaviours/render-precursors-detail');
const Model = require('hof').model;

describe.only('render-precursors-detail behaviour tests', () => {
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
    Behaviour = RenderPrecursorsDetail;
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

  it('Should set the items in session', () => {
    req = {
      sessionModel: {
        set: sinon.spy(),
        get: () => 'precursor-value'
      }
    };
    behaviour.getValues(req, res, next);
    expect(req.sessionModel.set.callCount).to.equal(5);
  });
});
