'use strict';

const hof = require('hof');
const Notify = hof.components.notify;
const path = require('path');

const parse = (model, translate) => {
    return {
        contactDetails: [
            {
                label: 'name',
                value: model['name']
            }
        ]
    }
}

module.exports = config => {
    return Notify(Object.assign({}, config, {
        recipient: config.caseWorker,
        subject: (model, translate) => 'HOF boilerplate form',
        template: path.resolve(__dirname, '../views/emails/caseworker.html'),
        parse
    }));
};