const moment = require('moment');
module.exports = superclass => class extends superclass {
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
    const dateFields = ['new-renew-other-name-start-date', 'new-renew-other-name-stop-date'];
    const locals = super.locals(req, res);
    locals.items = locals.items.map(item => {
      item.fields = item.fields.map(field => {
        // Process a value to parse and reformat it before render
        if (dateFields.includes(field.field)) {
          if (field.value !== undefined) {
            field.parsed = moment(field.value).format('DD MMMM YYYY');
          }
        }
        return field;
      });
      return item;
    });
    return locals;
  }
};
