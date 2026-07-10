const CheckChangedDate = require('../../../utilities/helpers/move-date-validator');

describe('after-date-validator', () => {
  let AfterDateValidator;
  let ValidationError;
  let MockSuperclass;
  let mockReq;

  beforeEach(() => {
    ValidationError = mockFn();
    MockSuperclass = class {
      /* eslint-disable-next-line no-unused-vars */
      validateField(key, req) {
        return true;
      }
      constructor() {
        this.ValidationError = ValidationError;
      }
    };

    AfterDateValidator =
      require('../../../apps/epp-common/behaviours/after-date-validator')(
        'dobFieldName'
      )(MockSuperclass);

    mockReq = {
      log: mockFn(),
      sessionModel: {
        get: mockFn()
      }
    };
  });
  it('should return ValidationError if date is after dob', () => {
    mockSpyOn(CheckChangedDate, 'checkIfDateAfterDob')
      .mockReturnValue({ error: 'Date is after dob' });

    const instance = new AfterDateValidator();
    const result = instance.validateField(
      'amend-new-date-name-changed',
      mockReq
    );

    expect(result).toBeInstanceOf(ValidationError);
    expect(CheckChangedDate.checkIfDateAfterDob).toHaveBeenCalledWith(
      'amend-new-date-name-changed',
      mockReq,
      'dobFieldName'
    );

    CheckChangedDate.checkIfDateAfterDob.mockRestore();
  });

  it('should not return ValidationError if date is not after dob', () => {
    mockSpyOn(CheckChangedDate, 'checkIfDateAfterDob').mockReturnValue({});

    const instance = new AfterDateValidator();
    const result = instance.validateField(
      'amend-new-date-name-changed',
      mockReq
    );

    expect(result).toBe(true);
    expect(mockReq.log).toHaveBeenCalledWith('info', 'No validation error');

    CheckChangedDate.checkIfDateAfterDob.mockRestore();
  });
});
