const Controller = require('hof').controller;
const Behaviour = require('../../../apps/epp-new/behaviours/check-back-link');
const reqres = require('hof').utils.reqres;

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
    const locals = controller.locals(req, res);
    expect(locals).toHaveProperty('backLink');
    expect(locals.backLink).toBe('/new-renew/licence-number');
  });

  it('renew edit journey - should update backLink to licence-number/edit page', () => {
    req.form.options.route = '/your-name';
    res.locals.backLink = '/new-renew/licence-number/edit';

    req.sessionModel.set('isRenewJourney', true);
    const locals = controller.locals(req, res);
    expect(locals).toHaveProperty('backLink');
    expect(locals.backLink).toBe('/new-renew/licence-number/edit');
  });

  it('edit non renew journey - should not update the backLink', () => {
    req.form.options.route = '/your-name';
    expect(controller.locals(req, res)).toHaveProperty('backLink');
    res.locals.backLink = 'base/original-backlink';
    expect(controller.locals(req, res).backLink).toBe(
      '/base/original-backlink'
    );
  });
});
