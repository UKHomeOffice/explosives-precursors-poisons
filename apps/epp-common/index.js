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
<<<<<<< HEAD
          target: '/amend/licence-number',
=======
          target: '/amend-license/amend-licence-number',
>>>>>>> 20c28c3 (EPP 56 Enter Licence Number Page)
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
      next: '/replace-license/section-one'
    }
  }
};
