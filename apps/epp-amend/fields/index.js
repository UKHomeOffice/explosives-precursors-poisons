module.exports = {

    'amend-name-title': {
        mixin: 'select',
        validate: '',
        className: ['typeahead', 'js-hidden'],
        options: [{
            value: 'select',
            value: 'none_selected'
            //add logic to call utilities/constants/titles.js and .concat(_.sortBy(titles, o => o.label))
        }]
    },
    'amend-firstname': {
        validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
        className: ['govuk-input', 'govuk-!-width-two-thirds']
    },
    'amend-middlename': {
        validate: ['required','noUrl', {type: 'maxlength', arguments: [250] }],
        className: ['govuk-input', 'govuk-!-width-two-thirds']
    },
    'amend-lastname': {
        validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
        className: ['govuk-input', 'govuk-!-width-two-thirds']
    }
};
