module.exports = superclass =>
  class extends superclass {
    /**
     * Executes parse any functions potentially defined in the fieldConfigs (/fields/index.js)
     * for the set of fields in locals (the fields on the page).
     * If there is a parse function, the field's value is passed to the function and
     * the output of the function is assigned to the field's "parsed" property
     * (which becomes the field's display value if truthy)
     *
     */
    locals(req, res) {
      const locals = super.locals(req, res);
      const fieldConfigs = req?.form?.options?.fieldsConfig;
      locals.items = locals.items.map(item => {
        item.fields = item.fields.map(field => {
          let parsedValue;
          let fieldName = field?.field;

          if (fieldName && field.value && fieldConfigs) {
            if (fieldConfigs[fieldName]?.parse) {
              parsedValue = fieldConfigs[fieldName].parse(field.value);
            } else if (!parsedValue && fieldName.split('.').length >= 2) {
              fieldName = fieldName.substring(0, fieldName.lastIndexOf('.'));
              parsedValue = fieldConfigs[fieldName]?.parse
                ? fieldConfigs[fieldName]?.parse(field.value)
                : parsedValue;
            }
          }

          field.parsed = parsedValue ?? field.parsed ?? field.value;
          return field;
        });
        return item;
      });
      return locals;
    }
  };
