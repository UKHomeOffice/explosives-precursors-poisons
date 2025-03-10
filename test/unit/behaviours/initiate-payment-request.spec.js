const proxyquire = require('proxyquire');
const Model = require('hof').model;

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
      redirect: sinon.spy()
    };
    next = sinon.stub();
    initiatePaymentMock = sinon.stub();
    generateHmacMock = sinon.stub();
    generateRequestPayloadMock = sinon.stub();

    req.sessionModel = new Model({});

    Base.prototype.saveValues = next;

    InitiatePaymentRequest = proxyquire(
      '../../../apps/epp-common/behaviours/initiate-payment-request',
      {
        '../../../utilities/helpers/api': {
          initiatePayment: initiatePaymentMock,
          generateHmac: generateHmacMock,
          generateRequestPayload: generateRequestPayloadMock
        }
      }
    );

    Behaviour = InitiatePaymentRequest(Base);
    behaviour = new Behaviour();
  });

  it('should redirect existing payment url if available in session', async () => {
    req.sessionModel.get = sinon.stub();
    req.sessionModel.get.withArgs('applicationType').returns('new');
    req.sessionModel.get
      .withArgs('payment-page-url')
      .returns('https://existing-payment-url');

    await behaviour.saveValues(req, res, next);

    expect(res.redirect.calledWith('https://existing-payment-url')).to.be.true;
  });

  it('should redirect to payment-problem when response is incomplete', async () => {
    req.sessionModel.get = sinon.stub();
    req.sessionModel.get.withArgs('applicationType').returns('new');
    req.sessionModel.get.withArgs('payment-page-url').returns(undefined);

    generateHmacMock.returns('1234');
    generateRequestPayloadMock.returns({});
    initiatePaymentMock.resolves({
      payment_id: '1234',
      _links: {
        next_url: {
          href: null
        }
      }
    });

    await behaviour.saveValues(req, res, next);

    expect(res.redirect.calledWith('/new-renew/payment-problem')).to.be
      .true;
  });

  it('should catch the error redirect to payment-problem if we get an error from initiatePayment', async () => {
    req.sessionModel.get = sinon.stub();
    req.sessionModel.get.withArgs('applicationType').returns('new');
    req.sessionModel.get.withArgs('payment-page-url').returns(undefined);
    generateHmacMock.returns('1234');
    generateRequestPayloadMock.returns({});
    initiatePaymentMock.rejects(new Error('Error creating a payment request'));

    await behaviour.saveValues(req, res, next);

    expect(res.redirect.calledWith('/new-renew/payment-problem')).to.be
      .true;
  });

  it('should redirect to payment URL when api is successful', async () => {
    req.sessionModel.get = sinon.stub();
    req.sessionModel.get.withArgs('applicationType').returns('new');
    req.sessionModel.get.withArgs('payment-page-url').returns(undefined);

    generateHmacMock.returns('1234');
    generateRequestPayloadMock.returns({});
    initiatePaymentMock.resolves({
      payment_id: '1234',
      _links: {
        next_url: {
          href: 'https://payment-url'
        }
      }
    });

    await behaviour.saveValues(req, res, next);

    expect(res.redirect.calledWith('https://payment-url')).to.be.true;
  });
});
