'use strict';

// This behaviour removes a Section's aggregated values from the session if the user has
// changed the selection to 'no' in the Section start field.

module.exports = (aggregateToFields, sectionStartField) => superclass =>
  class extends superclass {
    saveValues(req, res, next) {
      if (Array.isArray(aggregateToFields) && aggregateToFields.length > 0) {
        aggregateToFields.forEach(aggregateToField => {
          if (req.sessionModel.get(aggregateToField) !== undefined) {
            if (
              req.form.values[sectionStartField] === 'no' &&
              req.sessionModel.get(aggregateToField).aggregatedValues.length > 0
            ) {
              req.sessionModel.unset(aggregateToField);
            }
          }
        });
      }

      return super.saveValues(req, res, next);
    }
  };
