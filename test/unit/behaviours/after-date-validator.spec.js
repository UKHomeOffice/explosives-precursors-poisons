const CheckChangedDate = require('../../../utilities/helpers/move-date-validator');

describe('after-date-validator', () => {
  let AfterDateValidator;
  let ValidationError;
  let MockSuperclass;
  let mockReq;

  beforeEach(() => {
    ValidationError = sinon.stub();
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
      log: sinon.stub(),
      sessionModel: {
        get: sinon.stub()
      }
    };
  });
  it('should return ValidationError if date is after dob', () => {
    sinon
      .stub(CheckChangedDate, 'checkIfDateAfterDob')
      .returns({ error: 'Date is after dob' });

    const instance = new AfterDateValidator();
    const result = instance.validateField(
      'amend-new-date-name-changed',
      mockReq
    );

    expect(result).to.be.instanceOf(ValidationError);
    expect(
      CheckChangedDate.checkIfDateAfterDob.calledWith(
        'amend-new-date-name-changed',
        mockReq,
        'dobFieldName'
      )
    ).to.be.true;

    CheckChangedDate.checkIfDateAfterDob.restore();
  });

  it('should not return ValidationError if date is not after dob', () => {
    sinon.stub(CheckChangedDate, 'checkIfDateAfterDob').returns({});

    const instance = new AfterDateValidator();
    const result = instance.validateField(
      'amend-new-date-name-changed',
      mockReq
    );

    expect(result).to.be.true;
    expect(mockReq.log.calledWith('info', 'No validation error')).to.be.true;

    CheckChangedDate.checkIfDateAfterDob.restore();
  });
});
