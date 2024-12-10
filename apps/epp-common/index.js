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
          target: '/your-name',
          condition: {
            field: 'application-type',
            value: 'new'
          }
        },
        {
          target: '/amend/start',
          condition: {
            field: 'application-type',
            value: 'amend'
          }
        },
        {
          target: '/enter-license-number',
          condition: {
            field: 'application-type',
            value: 'renew'
          }
        }
      ],
      next: '/replace/start'
    }
  }
};
