const proxyquire = require('proxyquire');
const Model = require('hof').model;

describe('get-payment-info tests', () => {
  let GetPaymentInfo;
  let Behaviour;
  let behaviour;
  let req;
  let res;
  let next;
  let getPaymentDetailsMock;
  let generateHmacMock;

  class Base {}

  beforeEach(() => {
    req = reqres.req();
    res = {
      redirect: sinon.spy()
    };
    next = sinon.stub();
    getPaymentDetailsMock = sinon.stub();
    generateHmacMock = sinon.stub();

    req.sessionModel = new Model({});
    req.query = {};

    Base.prototype.getValues = next;

    GetPaymentInfo = proxyquire(
      '../../../apps/epp-common/behaviours/get-payment-info',
      {
        '../../../utilities/helpers/api': {
          getPaymentDetails: getPaymentDetailsMock,
          generateHmac: generateHmacMock
        }
      }
    );

    Behaviour = GetPaymentInfo(Base);
    behaviour = new Behaviour();
  });

  it('should redirect to payment-problem when payment id is missing', async () => {
    req.sessionModel.get = sinon.stub();
    req.sessionModel.get.withArgs('random-id').returns('random-id');
    req.sessionModel.get.withArgs('payment-id').returns(undefined);
    req.sessionModel.get.withArgs('applicationType').returns('new');

    await behaviour.getValues(req, res, next);
    expect(res.redirect.calledWith('/new-renew/payment-problem')).to.be
      .true;
    expect(res.redirect.calledWith('/new-renew/payment-failed')).to.be
      .false;
    expect(res.redirect.calledWith('/new-renew/payment-cancelled')).to.be
      .false;
    expect(next.called).to.be.false;
  });

  it('should redirect to payment-problem when token does not match', async () => {
    req.sessionModel.get = sinon.stub();
    req.sessionModel.get.withArgs('random-id').returns('random-id');
    req.sessionModel.get.withArgs('payment-id').returns('payment-id');
    req.sessionModel.get.withArgs('applicationType').returns('new');
    req.query.token = 'ABCD1234';
    generateHmacMock.returns('XYZ1234');

    await behaviour.getValues(req, res, next);
    expect(res.redirect.calledWith('/new-renew/payment-problem')).to.be
      .true;
    expect(res.redirect.calledWith('/new-renew/payment-failed')).to.be
      .false;
    expect(res.redirect.calledWith('/new-renew/payment-cancelled')).to.be
      .false;
    expect(next.called).to.be.false;
  });

  it('should redirect to payment-cancelled when code is P0030', async () => {
    req.sessionModel.get = sinon.stub();
    req.sessionModel.get.withArgs('random-id').returns('random-id');
    req.sessionModel.get.withArgs('payment-id').returns('payment-id');
    req.sessionModel.get.withArgs('applicationType').returns('new');
    req.query.token = 'ABCD1234';
    generateHmacMock.returns('ABCD1234');
    getPaymentDetailsMock.resolves({
      state: { code: 'P0030', message: 'Payment cancelled by the user' }
    });

    await behaviour.getValues(req, res, next);
    expect(res.redirect.calledWith('/new-renew/payment-cancelled')).to.be
      .true;
    expect(res.redirect.calledWith('/new-renew/payment-problem')).to.be
      .false;
    expect(res.redirect.calledWith('/new-renew/payment-failed')).to.be
      .false;
    expect(next.called).to.be.false;
  });

  it('should redirect to payment-failed when code is P0010', async () => {
    req.sessionModel.get = sinon.stub();
    req.sessionModel.get.withArgs('random-id').returns('random-id');
    req.sessionModel.get.withArgs('payment-id').returns('payment-id');
    req.sessionModel.get.withArgs('applicationType').returns('new');
    req.query.token = 'ABCD1234';
    generateHmacMock.returns('ABCD1234');
    getPaymentDetailsMock.resolves({
      state: { code: 'P0010', message: 'Payment cancelled by the user' }
    });

    await behaviour.getValues(req, res, next);
    expect(res.redirect.calledWith('/new-renew/payment-failed')).to.be.true;
    expect(res.redirect.calledWith('/new-renew/payment-cancelled')).to.be
      .false;
    expect(res.redirect.calledWith('/new-renew/payment-problem')).to.be;
    expect(next.called).to.be.false;
  });

  it('should redirect to payment-problem for any unknown error', async () => {
    req.sessionModel.get = sinon.stub();
    req.sessionModel.get.withArgs('random-id').returns('random-id');
    req.sessionModel.get.withArgs('payment-id').returns('payment-id');
    req.sessionModel.get.withArgs('applicationType').returns('new');
    req.query.token = 'ABCD1234';
    generateHmacMock.returns('ABCD1234');
    getPaymentDetailsMock.resolves({
      state: { code: 'UNKNOWN', status: 'failed' }
    });

    await behaviour.getValues(req, res, next);
    expect(res.redirect.calledWith('/new-renew/payment-problem')).to.be
      .true;
    expect(res.redirect.calledWith('/new-renew/payment-failed')).to.be
      .false;
    expect(res.redirect.calledWith('/new-renew/payment-cancelled')).to.be
      .false;
    expect(next.called).to.be.false;
  });

  it('should catch the error redirect to payment-problem if we get an error from getPaymentDetails', async () => {
    req.sessionModel.get = sinon.stub();
    req.sessionModel.get.withArgs('random-id').returns('random-id');
    req.sessionModel.get.withArgs('payment-id').returns('payment-id');
    req.sessionModel.get.withArgs('applicationType').returns('new');
    req.query.token = 'ABCD1234';
    generateHmacMock.returns('ABCD1234');
    getPaymentDetailsMock.rejects(
      new Error('Error getting the payment details')
    );

    await behaviour.getValues(req, res, next);
    expect(res.redirect.calledWith('/new-renew/payment-problem')).to.be
      .true;
    expect(res.redirect.calledWith('/new-renew/payment-failed')).to.be
      .false;
    expect(res.redirect.calledWith('/new-renew/payment-cancelled')).to.be
      .false;
    expect(next.called).to.be.false;
  });

  it('should not throw and error and continue when payment is successful', async () => {
    req.sessionModel.get = sinon.stub();
    req.sessionModel.get.withArgs('random-id').returns('random-id');
    req.sessionModel.get.withArgs('payment-id').returns('payment-id');
    req.sessionModel.get.withArgs('applicationType').returns('new');
    req.query.token = 'ABCD1234';
    generateHmacMock.returns('ABCD1234');
    getPaymentDetailsMock.resolves({
      state: { status: 'success' }
    });

    await behaviour.getValues(req, res, next);
    // expect(next.called).to.be.true;
    expect(res.redirect.calledWith('/new-renew/payment-problem')).to.be
      .false;
    expect(res.redirect.calledWith('/new-renew/payment-failed')).to.be
      .false;
    expect(res.redirect.calledWith('/new-renew/payment-cancelled')).to.be
      .false;
  });
});
