const saveApplicationSelection = require('./behaviours/save-application-selection');


module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-common/fields',
  views: 'apps/epp-common/views',
  translations: 'apps/epp-common/translations',
  baseUrl: '/',
  steps: {
    '/application-type': {
      behaviours: [saveApplicationSelection],
      fields: ['application-type'],
      forks: [
        {
          target: '/new-and-renew/your-name',
          condition: {
            field: 'application-type',
            value: 'new'
          }
        },
        {
          target: '/amend-license/section-one',
          condition: {
            field: 'application-type',
            value: 'amend'
          }
        },
        {
          target: '/new-and-renew/enter-license-number',
          condition: {
            field: 'application-type',
            value: 'renew'
          }
        }
      ],
      next: '/replace-license/start'
    }
  }
};
