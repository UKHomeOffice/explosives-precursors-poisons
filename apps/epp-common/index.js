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
          target: '/amend/licence-number',
          condition: {
            field: 'application-type',
            value: 'amend'
          }
        },
        {
          target: '/new-and-renew/licence-number',
          condition: {
            field: 'application-type',
            value: 'renew'
          }
        }
      ],
      next: '/replace-licence/section-one'
    }
  }
};
