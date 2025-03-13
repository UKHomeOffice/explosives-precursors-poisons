const {
  getFormattedDate,
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
      const dateFields = [
        'new-renew-other-name-start-date',
        'new-renew-other-name-stop-date',
        'new-renew-previous-home-address-moveto-date',
        'new-renew-other-name-stop-date',
        'new-renew-licence-refused-date'
      ];
      const locals = super.locals(req, res);
      locals.items = locals.items.map(item => {
        item.fields = item.fields.map(field => {
          if (dateFields.includes(field.field)) {
            if (field.value) {
              field.parsed = getFormattedDate(field.value);
            }
          }

          if (!field.value) {
            field.parsed = TEXT_NOT_PROVIDED;
          }
          field.field += '.summary-heading';
          return field;
        });
        return item;
      });
      return locals;
    }
  };
