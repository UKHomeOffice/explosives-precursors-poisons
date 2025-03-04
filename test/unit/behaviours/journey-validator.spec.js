const proxyquire = require('proxyquire');

describe('journey-validator tests', () => {
  let JourneyValidator;
  let req;
  let res;
  let next;

  class Base {
    getValues(request, response, nextFn) {
      nextFn();
    }
  }

  beforeEach(() => {
    req = {
      sessionModel: {
        get: sinon.stub()
      },
      baseUrl: ''
    };
    res = {};
    next = sinon.stub();

    JourneyValidator = proxyquire(
      '../../../apps/epp-common/behaviours/journey-validator',
      {}
    )(Base);
  });

  it(
    'should throw an error if application type does not not match with the URL - ' +
      'application type new',
    () => {
      req.sessionModel.get.withArgs('applicationType').returns('new');
      req.baseUrl = '/replace';
      const instance = new JourneyValidator();
      expect(() => instance.getValues(req, res, next)).to.throw(
        'Selected application type does not match with the URL'
      );
    }
  );

  it(
    'should throw an error if application type does not not match with the URL - ' +
      'application type amend',
    () => {
      req.sessionModel.get.withArgs('applicationType').returns('amend');
      req.baseUrl = '/new-renew';
      const instance = new JourneyValidator();
      expect(() => instance.getValues(req, res, next)).to.throw(
        'Selected application type does not match with the URL'
      );
    }
  );

  it(
    'should throw an error if application type does not not match with the URL - ' +
      'application type renew',
    () => {
      req.sessionModel.get.withArgs('applicationType').returns('renew');
      req.baseUrl = '/amend';
      const instance = new JourneyValidator();
      expect(() => instance.getValues(req, res, next)).to.throw(
        'Selected application type does not match with the URL'
      );
    }
  );

  it(
    'should throw an error if application type does not not match with the URL - ' +
      'application type replace',
    () => {
      req.sessionModel.get.withArgs('applicationType').returns('replace');
      req.baseUrl = '/new-renew';
      const instance = new JourneyValidator();
      expect(() => instance.getValues(req, res, next)).to.throw(
        'Selected application type does not match with the URL'
      );
    }
  );

  it(
    'should successfully call super.getValues when application type matches with URL - ' +
      'application type new',
    () => {
      req.sessionModel.get.withArgs('applicationType').returns('new');
      req.baseUrl = '/new-renew';
      const instance = new JourneyValidator();
      instance.getValues(req, res, next);
      expect(next.called).to.be.true;
      expect(() => instance.getValues(req, res, next)).to.not.throw();
    }
  );

  it(
    'should successfully call super.getValues when application type matches with URL - ' +
      'application type amend',
    () => {
      req.sessionModel.get.withArgs('applicationType').returns('amend');
      req.baseUrl = '/amend';
      const instance = new JourneyValidator();
      instance.getValues(req, res, next);
      expect(next.called).to.be.true;
      expect(() => instance.getValues(req, res, next)).to.not.throw();
    }
  );

  it(
    'should successfully call super.getValues when application type matches with URL - ' +
      'application type renew',
    () => {
      req.sessionModel.get.withArgs('applicationType').returns('renew');
      req.baseUrl = '/new-renew';
      const instance = new JourneyValidator();
      instance.getValues(req, res, next);
      expect(next.called).to.be.true;
      expect(() => instance.getValues(req, res, next)).to.not.throw();
    }
  );

  it(
    'should successfully call super.getValues when application type matches with URL - ' +
      'application type replace',
    () => {
      req.sessionModel.get.withArgs('applicationType').returns('replace');
      req.baseUrl = '/replace';
      const instance = new JourneyValidator();
      instance.getValues(req, res, next);
      expect(next.called).to.be.true;
      expect(() => instance.getValues(req, res, next)).to.not.throw();
    }
  );
});
