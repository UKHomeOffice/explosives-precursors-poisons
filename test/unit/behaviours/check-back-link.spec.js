const Behaviour = require('../../../apps/epp-new/behaviours/check-back-link');
const Controller = require('hof').controller;

describe('check-back-link behaviour tests', () => {
  let req;
  let res;
  let controller;

  beforeEach(done => {
    req = reqres.req();
    res = reqres.res();

    const CheckBackLink = Behaviour(Controller);
    controller = new CheckBackLink({
      template: 'index',
      route: '/index'
    });
    controller._configure(req, res, done);
  });

  it('renew journey - should update backLink to licence-number page', () => {
    req.form.options.route = '/your-name';
    req.sessionModel.set('isRenewJourney', true);
    controller.locals(req, res).should.have.property('backLink');
    controller
      .locals(req, res)
      .should.have.property('backLink')
      .that.equals('/new-and-renew/licence-number');
  });

  it('renew edit journey - should update backLink to licence-number/edit page', () => {
    req.form.options.route = '/your-name';
    res.locals.backLink = '/new-and-renew/licence-number/edit';

    req.sessionModel.set('isRenewJourney', true);
    controller.locals(req, res).should.have.property('backLink');
    controller
      .locals(req, res)
      .should.have.property('backLink')
      .that.equals('/new-and-renew/licence-number/edit');
  });
});
