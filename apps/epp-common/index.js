
module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-common/fields',
  views: 'apps/epp-common/views',
  translations: 'apps/epp-common/translations',
  baseUrl: '/',
  steps: {
    '/application-type': {
      field:['application-type'],
      next: '/your-name'
    }
  }
}
