const { expect } = require('chai');
const PrecursorRoutingBehaviour = require('../../../apps/epp-replace/behaviours/precursor-routing-behaviour');

class MockSuperclass {
  successHandler(req, res, next) {
    next();
  }
}

describe('shouldGoToUploadPage', () => {
  let precursorRoutingBehaviour;

  beforeEach(() => {
    precursorRoutingBehaviour = new (PrecursorRoutingBehaviour(MockSuperclass))();
  });

  it('returns true when on the "declaration" page and uploadProofOfHome is true', () => {
    const session = {
      application: {
        uploadProofOfHome: true
      }
    };
    const result = precursorRoutingBehaviour.shouldGoToUploadPage('declaration', session);
    expect(result).to.be.true;
  });

  it('returns false when pageName is not "declaration"', () => {
    const session = {
      application: {
        uploadProofOfHome: true
      }
    };
    const result = precursorRoutingBehaviour.shouldGoToUploadPage('summary', session);
    expect(result).to.be.false;
  });

  it('returns false when uploadProofOfHome is not true', () => {
    const session = {
      application: {
        uploadProofOfHome: false
      }
    };
    const result = precursorRoutingBehaviour.shouldGoToUploadPage('declaration', session);
    expect(result).to.be.false;
  });

  it('returns false when session is undefined', () => {
    const result = precursorRoutingBehaviour.shouldGoToUploadPage('declaration', undefined);
    expect(result).to.be.false;
  });

  it('returns false when application is missing from session', () => {
    const session = {};
    const result = precursorRoutingBehaviour.shouldGoToUploadPage('declaration', session);
    expect(result).to.be.false;
  });
});
