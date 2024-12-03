const hof = require('hof');
const summary = hof.components.summary;
const config = require('../../config');
// const caseworkerEmail = require('./behaviours/caseworker-email')(config.email);

module.exports = {
    name: 'HOF Skeleton',
    fields: 'apps/epp/fields',
    views: 'apps/epp/views',
    translations: 'apps/epp/translations',
    baseUrl: '/',
    steps: {
        '/start': {
            next: '/name',
        },
        '/name': {
            fields: ['name'],
            next: '/confirm',
        },
        '/confirm': {
            behaviours: ['complete', summary],
            next: '/complete'

        },
        '/complete': {
            backLink: false
        }
    }
}
