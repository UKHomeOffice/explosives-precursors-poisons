const proxyquire = require('proxyquire');

describe('reset-section-summary behaviour tests', () => {
  class Base {
    constructor() {}
    saveValues(req, res, next) {
      next();
    }
  }

  let req;
  let res;
  let next;
  let Behaviour;

  beforeEach(() => {
    req = {
      sessionModel: {
        get: sinon.stub(),
        unset: sinon.stub()
      },
      form: {}
    };
    res = {};
    next = sinon.spy();
    Behaviour = proxyquire(
      '../../../apps/epp-common/behaviours/reset-section-summary',
      {}
    );
  });

  describe('saveValues tests', () => {
    let instance;

    beforeEach(() => {
      sinon
        .stub(Base.prototype, 'saveValues')
        .callsFake((request, response, nextFn) => nextFn());
      instance = new (Behaviour(
        ['aggregateToField'],
        'sectionStartField'
      )(Base))();
    });

    it('should unset aggregateToField if sectionStartField is "no" ' +
        'and aggregatedValues length is greater than 0',
    () => {
      req.form.values = {
        sectionStartField: 'no'
      };
      req.sessionModel.get
        .withArgs('aggregateToField')
        .returns({ aggregatedValues: [1, 2, 3] });

      instance.saveValues(req, res, next);

      expect(req.sessionModel.unset.calledWith('aggregateToField')).to.be
        .true;
      sinon.assert.calledWithExactly(
        Base.prototype.saveValues,
        req,
        res,
        next
      );
    });

    it('should not unset aggregateToField if sectionStartField is not "no"', () => {
      req.form.values = {
        sectionStartField: 'yes'
      };

      instance.saveValues(req, res, next);

      expect(req.sessionModel.unset.calledWith('aggregateToField')).to.be.false;
      sinon.assert.calledWithExactly(Base.prototype.saveValues, req, res, next);
    });

    it('should call superclass saveValues', () => {
      instance.saveValues(req, res, next);

      sinon.assert.calledWithExactly(Base.prototype.saveValues, req, res, next);
    });

    afterEach(() => {
      Base.prototype.saveValues.restore();
    });
  });
});
