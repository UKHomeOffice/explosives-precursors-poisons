const JourneyValidatorBehaviour = require('../../../apps/epp-common/behaviours/journey-validator');

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
        get: mockFn()
      },
      baseUrl: ''
    };
    res = {};
    next = mockFn();

    JourneyValidator = JourneyValidatorBehaviour(Base);
  });

  it(
    'should throw an error if application type does not not match with the URL - ' +
      'application type new',
    () => {
      req.sessionModel.get.withArgs('applicationType').mockReturnValue('new');
      req.baseUrl = '/replace';
      const instance = new JourneyValidator();
      expect(() => instance.getValues(req, res, next)).toThrow(
        'Selected application type does not match with the URL'
      );
    }
  );

  it(
    'should throw an error if application type does not not match with the URL - ' +
      'application type amend',
    () => {
      req.sessionModel.get.withArgs('applicationType').mockReturnValue('amend');
      req.baseUrl = '/new-renew';
      const instance = new JourneyValidator();
      expect(() => instance.getValues(req, res, next)).toThrow(
        'Selected application type does not match with the URL'
      );
    }
  );

  it(
    'should throw an error if application type does not not match with the URL - ' +
      'application type renew',
    () => {
      req.sessionModel.get.withArgs('applicationType').mockReturnValue('renew');
      req.baseUrl = '/amend';
      const instance = new JourneyValidator();
      expect(() => instance.getValues(req, res, next)).toThrow(
        'Selected application type does not match with the URL'
      );
    }
  );

  it(
    'should throw an error if application type does not not match with the URL - ' +
      'application type replace',
    () => {
      req.sessionModel.get
        .withArgs('applicationType')
        .mockReturnValue('replace');
      req.baseUrl = '/new-renew';
      const instance = new JourneyValidator();
      expect(() => instance.getValues(req, res, next)).toThrow(
        'Selected application type does not match with the URL'
      );
    }
  );

  it(
    'should successfully call super.getValues when application type matches with URL - ' +
      'application type new',
    () => {
      req.sessionModel.get.withArgs('applicationType').mockReturnValue('new');
      req.baseUrl = '/new-renew';
      const instance = new JourneyValidator();
      instance.getValues(req, res, next);
      expect(next.called).toBe(true);
      expect(() => instance.getValues(req, res, next)).not.toThrow();
    }
  );

  it(
    'should successfully call super.getValues when application type matches with URL - ' +
      'application type amend',
    () => {
      req.sessionModel.get.withArgs('applicationType').mockReturnValue('amend');
      req.baseUrl = '/amend';
      const instance = new JourneyValidator();
      instance.getValues(req, res, next);
      expect(next.called).toBe(true);
      expect(() => instance.getValues(req, res, next)).not.toThrow();
    }
  );

  it(
    'should successfully call super.getValues when application type matches with URL - ' +
      'application type renew',
    () => {
      req.sessionModel.get.withArgs('applicationType').mockReturnValue('renew');
      req.baseUrl = '/new-renew';
      const instance = new JourneyValidator();
      instance.getValues(req, res, next);
      expect(next.called).toBe(true);
      expect(() => instance.getValues(req, res, next)).not.toThrow();
    }
  );

  it(
    'should successfully call super.getValues when application type matches with URL - ' +
      'application type replace',
    () => {
      req.sessionModel.get
        .withArgs('applicationType')
        .mockReturnValue('replace');
      req.baseUrl = '/replace';
      const instance = new JourneyValidator();
      instance.getValues(req, res, next);
      expect(next.called).toBe(true);
      expect(() => instance.getValues(req, res, next)).not.toThrow();
    }
  );
});
