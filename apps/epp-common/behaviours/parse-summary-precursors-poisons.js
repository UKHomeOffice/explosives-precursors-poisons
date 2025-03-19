const {
  TEXT_NOT_PROVIDED
} = require('../../../utilities/helpers');
module.exports = superclass =>
  class extends superclass {
    /**
     * Manipulate field and value details saved in session when rendering into summary page
     *
     * items.fields contains the aggregated array of field and value pairs
     * items.fields.field is the field name
     * items.fields.value is the field's saved value
     * items.fields.parsed will be preferred as the rendered value if it is truthy for an item
     *
     */
    locals(req, res) {
      // Update dateFields with every new date field that needs to be formatted

      const locals = super.locals(req, res);
      locals.items = locals.items.map(item => {
        item.fields = item.fields.map(field => {
          if (!field.value) {
            field.parsed = TEXT_NOT_PROVIDED;
          }
          if (field.field === 'precursors-use-other-address' || field.field === 'store-precursors-other-address') {
            field.showInSummary = false;
          }
          field.field += '.summary-heading';
          return field;
        });
        return item;
      });
      return locals;
    }
  };
