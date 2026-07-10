const Model = require('hof').model;
const reqres = require('hof').utils.reqres;

describe('get-payment-info tests', () => {
  let GetPaymentInfo;
  let Behaviour;
  let behaviour;
  let req;
  let res;
  let next;
  let getPaymentDetailsMock;
  let generateHmacMock;
  let sendEmailMock;

  class Base {
    locals() {}
  }

  beforeEach(() => {
    req = reqres.req();
    res = {
      redirect: mockFn()
    };
    next = mockFn();
    getPaymentDetailsMock = mockFn();
    generateHmacMock = mockFn();
    const getErrorTemplateBasePathMock = mockFn().mockReturnValue('/new-renew');

    sendEmailMock = {
      send: mockFn().mockResolvedValue()
    };

    req.sessionModel = new Model({});
    req.query = {};
    Base.prototype.getValues = next;

    jest.resetModules();
    jest.doMock('../../../utilities/helpers/api', () => ({
      getPaymentDetails: getPaymentDetailsMock,
      generateHmac: generateHmacMock,
      getErrorTemplateBasePath: getErrorTemplateBasePathMock
    }));
    jest.doMock(
      '../../../apps/epp-common/behaviours/send-email-notification',
      () => mockFn().mockReturnValue(sendEmailMock)
    );

    GetPaymentInfo = require('../../../apps/epp-common/behaviours/get-payment-info');

    Behaviour = GetPaymentInfo(Base);
    behaviour = new Behaviour();
  });

  it('should redirect to payment-problem when payment id is missing', async () => {
    req.sessionModel.get = mockFn();
    req.sessionModel.get.withArgs('random-id').mockReturnValue('random-id');
    req.sessionModel.get.withArgs('payment-id').mockReturnValue(undefined);
    req.sessionModel.get.withArgs('applicationType').mockReturnValue('new');

    await behaviour.getValues(req, res, next);
    expect(res.redirect.calledWith('/new-renew/payment-problem')).toBe(true);
    expect(res.redirect.calledWith('/new-renew/payment-failed')).toBe(false);
    expect(res.redirect.calledWith('/new-renew/payment-cancelled')).toBe(false);
    expect(next.called).toBe(false);
  });

  it('should redirect to payment-problem when token does not match', async () => {
    req.sessionModel.get = mockFn();
    req.sessionModel.get.withArgs('random-id').mockReturnValue('random-id');
    req.sessionModel.get.withArgs('payment-id').mockReturnValue('payment-id');
    req.sessionModel.get.withArgs('applicationType').mockReturnValue('new');
    req.query.token = 'ABCD1234';
    generateHmacMock.mockReturnValue('XYZ1234');

    await behaviour.getValues(req, res, next);
    expect(res.redirect.calledWith('/new-renew/payment-problem')).toBe(true);
    expect(res.redirect.calledWith('/new-renew/payment-failed')).toBe(false);
    expect(res.redirect.calledWith('/new-renew/payment-cancelled')).toBe(false);
    expect(next.called).toBe(false);
  });

  it('should redirect to payment-cancelled when code is P0030', async () => {
    req.sessionModel.get = mockFn();
    req.sessionModel.get.withArgs('random-id').mockReturnValue('random-id');
    req.sessionModel.get.withArgs('payment-id').mockReturnValue('payment-id');
    req.sessionModel.get.withArgs('applicationType').mockReturnValue('new');
    req.query.token = 'ABCD1234';
    generateHmacMock.mockReturnValue('ABCD1234');
    getPaymentDetailsMock.mockResolvedValue({
      state: { code: 'P0030', message: 'Payment cancelled by the user' }
    });

    await behaviour.getValues(req, res, next);
    expect(res.redirect.calledWith('/new-renew/payment-cancelled')).toBe(true);
    expect(res.redirect.calledWith('/new-renew/payment-problem')).toBe(false);
    expect(res.redirect.calledWith('/new-renew/payment-failed')).toBe(false);
    expect(next.called).toBe(false);
  });

  it('should redirect to payment-failed when code is P0010', async () => {
    req.sessionModel.get = mockFn();
    req.sessionModel.get.withArgs('random-id').mockReturnValue('random-id');
    req.sessionModel.get.withArgs('payment-id').mockReturnValue('payment-id');
    req.sessionModel.get.withArgs('applicationType').mockReturnValue('new');
    req.query.token = 'ABCD1234';
    generateHmacMock.mockReturnValue('ABCD1234');
    getPaymentDetailsMock.mockResolvedValue({
      state: { code: 'P0010', message: 'Payment cancelled by the user' }
    });

    await behaviour.getValues(req, res, next);
    expect(res.redirect.calledWith('/new-renew/payment-failed')).toBe(true);
    expect(res.redirect.calledWith('/new-renew/payment-cancelled')).toBe(false);
    expect(res.redirect.calledWith('/new-renew/payment-problem')).toBe(false);
    expect(next.called).toBe(false);
  });

  it('should redirect to payment-problem for any unknown error', async () => {
    req.sessionModel.get = mockFn();
    req.sessionModel.get.withArgs('random-id').mockReturnValue('random-id');
    req.sessionModel.get.withArgs('payment-id').mockReturnValue('payment-id');
    req.sessionModel.get.withArgs('applicationType').mockReturnValue('new');
    req.query.token = 'ABCD1234';
    generateHmacMock.mockReturnValue('ABCD1234');
    getPaymentDetailsMock.mockResolvedValue({
      state: { code: 'UNKNOWN', status: 'failed' }
    });

    await behaviour.getValues(req, res, next);
    expect(res.redirect.calledWith('/new-renew/payment-problem')).toBe(true);
    expect(res.redirect.calledWith('/new-renew/payment-failed')).toBe(false);
    expect(res.redirect.calledWith('/new-renew/payment-cancelled')).toBe(false);
    expect(next.called).toBe(false);
  });

  it('should catch the error redirect to payment-problem if we get an error from getPaymentDetails', async () => {
    req.sessionModel.get = mockFn();
    req.sessionModel.get.withArgs('random-id').mockReturnValue('random-id');
    req.sessionModel.get.withArgs('payment-id').mockReturnValue('payment-id');
    req.sessionModel.get.withArgs('applicationType').mockReturnValue('new');
    req.query.token = 'ABCD1234';
    generateHmacMock.mockReturnValue('ABCD1234');
    getPaymentDetailsMock.mockRejectedValue(
      new Error('Error getting the payment details')
    );

    await behaviour.getValues(req, res, next);
    expect(res.redirect.calledWith('/new-renew/payment-problem')).toBe(true);
    expect(res.redirect.calledWith('/new-renew/payment-failed')).toBe(false);
    expect(res.redirect.calledWith('/new-renew/payment-cancelled')).toBe(false);
    expect(next.called).toBe(false);
  });

  it('should not throw and error and continue when payment is successful', async () => {
    req.sessionModel.get = mockFn();
    req.sessionModel.get.withArgs('random-id').mockReturnValue('random-id');
    req.sessionModel.get.withArgs('payment-id').mockReturnValue('payment-id');
    req.sessionModel.get.withArgs('applicationType').mockReturnValue('new');
    req.query.token = 'ABCD1234';
    generateHmacMock.mockReturnValue('ABCD1234');
    getPaymentDetailsMock.mockResolvedValue({
      state: { status: 'success' }
    });

    await behaviour.getValues(req, res, next);
    expect(next.called).toBe(true);
    expect(res.redirect.calledWith('/new-renew/payment-problem')).toBe(false);
    expect(res.redirect.calledWith('/new-renew/payment-failed')).toBe(false);
    expect(res.redirect.calledWith('/new-renew/payment-cancelled')).toBe(false);
  });

  it('should redirect to service-problem - error from SendEmailConfirmation', async () => {
    req.sessionModel.get = mockFn();
    req.sessionModel.get.withArgs('random-id').mockReturnValue('random-id');
    req.sessionModel.get.withArgs('payment-id').mockReturnValue('payment-id');
    req.sessionModel.get.withArgs('applicationType').mockReturnValue('new');
    req.query.token = 'ABCD1234';
    generateHmacMock.mockReturnValue('ABCD1234');
    getPaymentDetailsMock.mockResolvedValue({
      state: { status: 'success' }
    });

    sendEmailMock.send.mockRejectedValue(new Error('Failed to send email'));

    await behaviour.getValues(req, res, next);

    expect(res.redirect.calledWith('/new-renew/service-problem')).toBe(true);
    expect(next.called).toBe(false);
  });
});
