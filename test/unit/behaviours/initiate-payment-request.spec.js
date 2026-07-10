const Model = require('hof').model;
const reqres = require('hof').utils.reqres;

describe('get-payment-info tests', () => {
  let InitiatePaymentRequest;
  let Behaviour;
  let behaviour;
  let req;
  let res;
  let next;
  let initiatePaymentMock;
  let generateHmacMock;
  let generateRequestPayloadMock;

  class Base {}

  beforeEach(() => {
    req = reqres.req();
    res = {
      redirect: mockFn()
    };
    next = mockFn();
    initiatePaymentMock = mockFn();
    generateHmacMock = mockFn();
    generateRequestPayloadMock = mockFn();
    const generateRandomIdMock = mockFn().mockReturnValue('random-id');
    const getErrorTemplateBasePathMock = mockFn().mockReturnValue('/new-renew');

    req.sessionModel = new Model({});

    Base.prototype.saveValues = next;

    jest.resetModules();
    jest.doMock('../../../utilities/helpers/api', () => ({
      initiatePayment: initiatePaymentMock,
      generateRandomId: generateRandomIdMock,
      generateHmac: generateHmacMock,
      generateRequestPayload: generateRequestPayloadMock,
      getErrorTemplateBasePath: getErrorTemplateBasePathMock
    }));

    InitiatePaymentRequest = require('../../../apps/epp-common/behaviours/initiate-payment-request');

    Behaviour = InitiatePaymentRequest(Base);
    behaviour = new Behaviour();
  });

  it('should redirect existing payment url if available in session', async () => {
    req.sessionModel.get = mockFn();
    req.sessionModel.get.withArgs('applicationType').mockReturnValue('new');
    req.sessionModel.get
      .withArgs('payment-page-url')
      .mockReturnValue('https://existing-payment-url');

    await behaviour.saveValues(req, res, next);

    expect(res.redirect.calledWith('https://existing-payment-url')).toBe(true);
  });

  it('should redirect to payment-problem when response is incomplete', async () => {
    req.sessionModel.get = mockFn();
    req.sessionModel.get.withArgs('applicationType').mockReturnValue('new');
    req.sessionModel.get
      .withArgs('payment-page-url')
      .mockReturnValue(undefined);

    generateHmacMock.mockReturnValue('1234');
    generateRequestPayloadMock.mockReturnValue({});
    initiatePaymentMock.mockResolvedValue({
      payment_id: '1234',
      _links: {
        next_url: {
          href: null
        }
      }
    });

    await behaviour.saveValues(req, res, next);

    expect(res.redirect.calledWith('/new-renew/payment-problem')).toBe(true);
  });

  it('should catch the error redirect to payment-problem if we get an error from initiatePayment', async () => {
    req.sessionModel.get = mockFn();
    req.sessionModel.get.withArgs('applicationType').mockReturnValue('new');
    req.sessionModel.get
      .withArgs('payment-page-url')
      .mockReturnValue(undefined);
    generateHmacMock.mockReturnValue('1234');
    generateRequestPayloadMock.mockReturnValue({});
    initiatePaymentMock.mockRejectedValue(
      new Error('Error creating a payment request')
    );

    await behaviour.saveValues(req, res, next);

    expect(res.redirect.calledWith('/new-renew/payment-problem')).toBe(true);
  });

  it('should redirect to payment URL when api is successful', async () => {
    req.sessionModel.get = mockFn();
    req.sessionModel.get.withArgs('applicationType').mockReturnValue('new');
    req.sessionModel.get
      .withArgs('payment-page-url')
      .mockReturnValue(undefined);

    generateHmacMock.mockReturnValue('1234');
    generateRequestPayloadMock.mockReturnValue({});
    initiatePaymentMock.mockResolvedValue({
      payment_id: '1234',
      _links: {
        next_url: {
          href: 'https://payment-url'
        }
      }
    });

    await behaviour.saveValues(req, res, next);

    expect(res.redirect.calledWith('https://payment-url')).toBe(true);
  });
});
