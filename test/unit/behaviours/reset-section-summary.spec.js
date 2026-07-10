const Behaviour = require('../../../apps/epp-common/behaviours/reset-section-summary');

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
  beforeEach(() => {
    req = {
      sessionModel: {
        get: mockFn(),
        unset: mockFn()
      },
      form: {}
    };
    res = {};
    next = mockFn();
  });

  describe('saveValues tests', () => {
    let instance;

    beforeEach(() => {
      jest
        .spyOn(Base.prototype, 'saveValues')
        .mockImplementation((request, response, nextFn) => nextFn());
      instance = new (Behaviour(
        ['aggregateToField'],
        'sectionStartField'
      )(Base))();
    });

    it(
      'should unset aggregateToField if sectionStartField is "no" ' +
        'and aggregatedValues length is greater than 0',
      () => {
        req.form.values = {
          sectionStartField: 'no'
        };
        req.sessionModel.get
          .withArgs('aggregateToField')
          .mockReturnValue({ aggregatedValues: [1, 2, 3] });

        instance.saveValues(req, res, next);

        expect(req.sessionModel.unset.calledWith('aggregateToField')).toBe(
          true
        );
        expect(Base.prototype.saveValues).toHaveBeenCalledWith(req, res, next);
      }
    );

    it('should not unset aggregateToField if sectionStartField is not "no"', () => {
      req.form.values = {
        sectionStartField: 'yes'
      };

      instance.saveValues(req, res, next);

      expect(req.sessionModel.unset.calledWith('aggregateToField')).toBe(false);
      expect(Base.prototype.saveValues).toHaveBeenCalledWith(req, res, next);
    });

    it('should call superclass saveValues', () => {
      instance.saveValues(req, res, next);

      expect(Base.prototype.saveValues).toHaveBeenCalledWith(req, res, next);
    });

    afterEach(() => {
      Base.prototype.saveValues.mockRestore();
    });
  });
});
