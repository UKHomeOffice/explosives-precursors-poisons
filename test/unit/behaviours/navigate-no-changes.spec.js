const { expect } = require('chai');
const sinon = require('sinon');
const Behaviour = require('../../../apps/epp-replace/behaviours/navigate-no-changes');

describe('redirect-behaviour', () => {
  const fields = [
    'replace-home-address-options',
    'replace-replace-type',
    'replace-change-substances'
  ];

  class Base {
    successHandler() {}
  }

  let req;
  let res;
  let instance;
  const next = sinon.spy();

  const mockSessionModel = (overrides = {}) => {
    const getStub = sinon.stub();
    fields.forEach(field => {
      getStub.withArgs(field).returns(overrides[field] || 'no');
    });
    return { get: getStub };
  };

  const setupInstance = currentField => {
    instance = new (Behaviour(currentField)(Base))();
    req.baseUrl = '/base';
  };

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    sinon.stub(Base.prototype, 'successHandler').returns();
  });

  afterEach(() => {
    sinon.restore();
  });
  // eslint-disable-next-line max-len
  it('redirects to /no-precursors-or-poisons if all answers are "no" and currentField is "replace-poisons-option"', () => {
    req.sessionModel = mockSessionModel();
    setupInstance('replace-poisons-option');

    instance.successHandler(req, res, next);

    expect(res.redirect).to.have.been.calledOnceWithExactly('/base/no-precursors-or-poisons');
  });
  // eslint-disable-next-line max-len
  it('redirects to /no-precursors-or-poisons if all answers are "no" and currentField is "replace-regulated-explosives-precursors"', () => {
    req.sessionModel = mockSessionModel();
    setupInstance('replace-regulated-explosives-precursors');

    instance.successHandler(req, res, next);

    expect(res.redirect).to.have.been.calledOnceWithExactly('/base/no-precursors-or-poisons');
  });

  it('redirects to /confirm if all answers are "no" and currentField is anything else', () => {
    req.sessionModel = mockSessionModel();
    setupInstance('some-other-field');

    instance.successHandler(req, res, next);

    expect(res.redirect).to.have.been.calledOnceWithExactly('/base/confirm');
  });

  it('calls super.successHandler if any field is not "no"', () => {
    req.sessionModel = mockSessionModel({
      'replace-home-address-options': 'yes'
    });
    setupInstance('replace-poisons-option');

    instance.successHandler(req, res, next);

    expect(Base.prototype.successHandler).to.have.been.calledOnceWithExactly(req, res, next);
    expect(res.redirect.called).to.be.false;
  });
});
