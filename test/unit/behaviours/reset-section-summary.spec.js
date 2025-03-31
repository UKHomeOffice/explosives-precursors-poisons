const proxyquire = require('proxyquire');

describe('reset-section-summary behaviour tests', () => {
  class Base {
    constructor() {}
    successHandler(req, res, next) {
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
      }
    };
    res = {};
    next = sinon.spy();
    Behaviour = proxyquire(
      '../../../apps/epp-common/behaviours/reset-section-summary',
      {}
    );
  });

  describe('successHandler tests', () => {
    let instance;

    beforeEach(() => {
      sinon
        .stub(Base.prototype, 'successHandler')
        .callsFake((request, response, nextFn) => nextFn());
      instance = new (Behaviour(
        ['aggregateToField'],
        'sectionStartField'
      )(Base))();
    });

    it(
      'should unset aggregateToField if sectionStartField is "no" ' +
        'and aggregatedValues length is greater than 0',
      () => {
        req.sessionModel.get.withArgs('sectionStartField').returns('no');
        req.sessionModel.get
          .withArgs('aggregateToField')
          .returns({ aggregatedValues: [1, 2, 3] });

        instance.successHandler(req, res, next);

        expect(req.sessionModel.unset.calledWith('aggregateToField')).to.be
          .true;
        sinon.assert.calledWithExactly(
          Base.prototype.successHandler,
          req,
          res,
          next
        );
      }
    );

    it('should not unset aggregateToField if sectionStartField is not "no"', () => {
      req.sessionModel.get.withArgs('sectionStartField').returns('yes');
      req.sessionModel.get
        .withArgs('aggregateToField')
        .returns({ aggregatedValues: [1, 2, 3] });

      instance.successHandler(req, res, next);

      expect(req.sessionModel.unset.calledWith('aggregateToField')).to.be.false;
      sinon.assert.calledWithExactly(
        Base.prototype.successHandler,
        req,
        res,
        next
      );
    });

    it('should call superclass successHandler', () => {
      instance.successHandler(req, res, next);

      sinon.assert.calledWithExactly(
        Base.prototype.successHandler,
        req,
        res,
        next
      );
    });

    afterEach(() => {
      Base.prototype.successHandler.restore();
    });
  });
});
