'use strict';
// This behaviour is used to set the "Change" links on Summary pages
const _ = require('lodash');
const {
  PATH_NEW_RENEW,
  PATH_AMEND,
  PATH_REPLACE
} = require('../../../utilities/constants/string-constants');

const remapChangeLinks = (fields, mappings) => {
  _.forEach(fields, field => {
    const remap = mappings.find(mapping => mapping.field === field.field);
    if (remap) {
      field.changeLink = remap.changeLink;
    }
  });
  return fields;
};

const precursorsSummaryStep = '/precursors-summary';
const poisonsSummaryStep = '/poison-summary';

const getChangeLinkUrl = (req, path) => {
  const application = req.sessionModel.get('applicationType');
  const journeyAppUrlMap = {
    new: `${PATH_NEW_RENEW}${path}`,
    renew: `${PATH_NEW_RENEW}${path}`,
    amend: `${PATH_AMEND}${path}`,
    replace: `${PATH_REPLACE}${path}`
  };

  return journeyAppUrlMap[application];
};
module.exports = superclass =>
  class extends superclass {
    locals(req, res) {
      const locals = super.locals(req, res);
      // set change link for looping summary fields
      if (locals.route === 'confirm') {
        _.forEach(locals.rows, section => {
          const summaryMappings = [
            {
              field: 'display-precursor-title',
              changeLink: getChangeLinkUrl(req, precursorsSummaryStep)
            },
            {
              field: 'display-poison-title',
              changeLink: getChangeLinkUrl(req, poisonsSummaryStep)
            }
          ];
          section.fields = remapChangeLinks(section.fields, summaryMappings);
        });
      }
      return locals;
    }
  };
