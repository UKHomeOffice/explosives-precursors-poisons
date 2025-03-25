'use strict';
// This behaviour is used to set the "Change" links on Summary pages
const _ = require('lodash');

const remapChangeLinks = (fields, mappings) => {
  _.forEach(fields, field => {
    const remap = mappings.find(mapping => mapping.field === field.field);
    if (remap) {
      field.changeLink = remap.changeLink;
    }
  });
  return fields;
};

module.exports = superclass => class extends superclass {
  locals(req, res) {
    const locals = super.locals(req, res);
    // set change link for looping summary fields
    if (locals.route === 'confirm') {
      _.forEach(locals.rows, section => {
      // Fixup the "Change" link urls for the aggregate Title fields
      // so that the link jumps to the aggregate's summary page
        const application = req.sessionModel.get('applicationType');
        const journeyToUrlMap = {
          new: '/new-renew/precursors-summary',
          renew: '/new-renew/precursors-summary',
          amend: '/amend/precursors-summary',
          replace: '/replace/precursors-summary'
        };
        const summaryMappings = [
          { field: 'amend-display-precursor-title', changeLink: journeyToUrlMap[application] }
        ];
        section.fields = remapChangeLinks(section.fields, summaryMappings);
      });
    }
    return locals;
  }
};
