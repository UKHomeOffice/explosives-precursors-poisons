const hof = require('hof');
const summary = hof.components.summary;
const config = require('../../config');
const caseworkerEmail = require('./behaviours/caseworker-email')(config.email);

module.exports = {
    name: 'HOF Skeleton',
    fields: 'apps/boilerplate/fields',
    views: 'apps/boilerplate/views',
    translations: 'apps/boilerplate/translations',
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
            behaviours: ['complete', summary, caseworkerEmail],
            next: '/complete'

        },
        '/complete': {
            backLink: false
        }
    }
}