const { DEFAULT_AGGREGATOR_LIMIT } = require('../../../utilities/helpers');

module.exports = superclass => class extends superclass {
  constructor(options) {
    if (!options.aggregateTo) {
      throw new Error('options.aggregateTo is required for loops');
    }
    if (!options.aggregateFrom) {
      throw new Error('options.aggregateFrom is required for loops');
    }
    super(options);
  }

  deleteItem(req, res) {
    const id = req.params.id;
    let items = '';

    if (id) {
      items = this.getAggregateArray(req).filter((element, index) => index !== parseInt(id, 10));
      this.setAggregateArray(req, items);
    }

    res.redirect(`${req.baseUrl}${req.form.options.route}`);
  }

  updateItem(req, res) {
    const id = req.params.id;
    const items = this.getAggregateArray(req);

    if (items[id]) {
      req.sessionModel.set('aggregator-edit-id', id);
      req.sessionModel.set('isUpdate', true);
      req.sessionModel.set('updatingIndex', id);

      items[id].fields.forEach(obj => {
        req.sessionModel.set(obj.field, obj.value);
      });

      items.splice(id, 1);
      this.setAggregateArray(req, items);
    }

    return this.redirectToAddStep(req, res);
  }

  addItem(req, res) {
    const items = this.getAggregateArray(req);
    const fields = [];
    const itemTitle = [];
    const aggregateLimit = req.form.options.aggregateLimit || DEFAULT_AGGREGATOR_LIMIT;

    req.form.options.aggregateFrom.forEach(aggregateFromElement => {
      const aggregateFromField = aggregateFromElement.field || aggregateFromElement;
      const isTitleField = req.form.options.titleField.includes(aggregateFromField);
      const value = req.sessionModel.get(aggregateFromField);


      if (isTitleField) {
        itemTitle.push(value);
      }

      fields.push({
        field: aggregateFromField,
        parsed: this.parseField(aggregateFromField, value, req),
        value,
        showInSummary: true,
        changeField: aggregateFromElement.changeField
      });

      this.setAggregateArray(req, items);
      req.sessionModel.unset(aggregateFromField);
    });

    const joinTitle = itemTitle.join(' ');
    const newItem = { joinTitle, fields };
    const isUpdate = req.sessionModel.get('isUpdate');
    const updatingIndex = req.sessionModel.get('updatingIndex');

    if (isUpdate) {
      items.splice(updatingIndex, 0, newItem);
    } else {
      if (aggregateLimit) {
        if (items.length < aggregateLimit) {
          items.push(newItem);
        }
      } else {
        items.push(newItem);
      }
    }


    req.sessionModel.unset('isUpdate');
    req.sessionModel.unset('updatingIndex');
    this.setAggregateArray(req, items);
    res.redirect(`${req.baseUrl}${req.form.options.route}`);
  }
  getAggregateArray(req) {
    const aggregateToField = req.sessionModel.get(req.form.options.aggregateTo) || { aggregatedValues: [] };
    return aggregateToField.aggregatedValues;
  }

  setAggregateArray(req, value) {
    req.sessionModel.set(req.form.options.aggregateTo, { aggregatedValues: value });
  }

  newFieldsProvided(req) {
    let fieldsProvided = false;

    req.form.options.aggregateFrom.forEach(aggregateFromField => {
      if (req.sessionModel.get(aggregateFromField)) {
        fieldsProvided = true;
      }
    });

    return fieldsProvided;
  }

  redirectToAddStep(req, res) {
    return res.redirect(`${req.baseUrl}/${req.form.options.addStep}`);
  }

  getAction(req) {
    const noItemsPresent = this.getAggregateArray(req).length === 0;
    let action;

    if (this.newFieldsProvided(req)) {
      action = 'addItem';
    } else if (noItemsPresent) {
      action = 'redirectToAddStep';
    }

    return action || 'showItems';
  }

  getValues(req, res, next) {
    const action = req.params.action || this.getAction(req, res, next);
    this.handleAction(req, res, next, action);
  }
  handleAction(req, res, next, action) {
    switch (action) {
      case 'delete':
        this.deleteItem(req, res);
        break;
      case 'edit':
        this.updateItem(req, res);
        break;
      case 'addItem':
        this.addItem(req, res);
        break;
      case 'redirectToAddStep':
        this.redirectToAddStep(req, res);
        break;
      case 'showItems':
      default:
        return Object.assign({}, super.getValues(req, res, next), { redirected: false });
    }
    return { redirected: true };
  }

  parseField(field, value, req) {
    const fieldName = field.field || field;
    const valueVar = field.value || value;
    let newValue = '';
    const parser = req.form.options.fieldsConfig[fieldName].parse; // what is supposed to do it's always undefined
    if (Array.isArray(value)) {
      if (fieldName === 'amend-where-to-store-precursor') {
        newValue = req.sessionModel.get('homeAddressInline')
          .concat('\n', req.sessionModel.get('store-precursors-other-address'));
        value = newValue;
      }
      if (fieldName === 'amend-where-to-use-precursor') {
        newValue = req.sessionModel.get('homeAddressInline')
          .concat('\n', req.sessionModel.get('precursors-use-other-address'));
        value = newValue;
      }
    } else {
      if (fieldName === 'amend-where-to-store-precursor' && valueVar === 'amend-store-precursors-home-address') {
        newValue = req.sessionModel.get('homeAddressInline');
        value = newValue;
      }
      if (fieldName === 'amend-where-to-use-precursor' && valueVar === 'amend-use-precursors-home-address') {
        newValue = req.sessionModel.get('homeAddressInline');
        value = newValue;
      }
      if (fieldName === 'amend-where-to-store-precursor' && valueVar === 'amend-store-precursors-other-address') {
        newValue = req.sessionModel.get('precursors-use-other-address');
        value = newValue;
      }
      if (fieldName === 'amend-where-to-use-precursor' && valueVar === 'amend-use-precursors-other-address') {
        newValue = req.sessionModel.get('store-precursors-other-address');
        value = newValue;
      }
    }
    return parser ? parser(value) : value;
  }

  locals(req, res) {
    const items = this.getAggregateArray(req);

    items.forEach((element, index) => {
      element.index = index;
    });

    return Object.assign({}, super.locals(req, res), {
      items,
      hasItems: items.length > 0,
      addStep: req.form.options.addStep,
      field: req.form.options.aggregateTo,
      addAnotherLinkText: req.form.options.addAnotherLinkText
    });
  }
};
// function concatTwoFields(fieldNames, value, req){
//   let newValue = '';
//   if (fieldNames === 'amend-where-to-store-precursor') {
//     newValue = req.sessionModel.get('homeAddressInline')
//       .concat('\n', req.sessionModel.get('store-precursors-other-address'));
//    value = newValue;
//   }
//   else if (fieldNames === 'amend-where-to-use-precursor') {
//     newValue = req.sessionModel.get('homeAddressInline')
//       .concat('\n', req.sessionModel.get('precursors-use-other-address'));
//     value = newValue;
//   }
//   return value
// };

// function DisplayInOnlyOneRow(fieldNames, valueVar, req){
//   const isStoreHomeAdd = fieldNames === 'amend-where-to-store-precursor' && valueVar === "amend-store-precursors-home-address";
//   const isUseHomeAdd = fieldNames === 'amend-where-to-store-precursor' &&  valueVar === "amend-use-precursors-home-address";
//   const isStoreOtherAdd = fieldNames === 'amend-where-to-store-precursor' &&  valueVar === "amend-store-precursors-other-address";
//   const isUseOtherAdd = fieldNames === 'amend-where-to-store-precursor' && valueVar === "amend-store-precursors-other-address";
 
//   switch(fieldNames){

//     case isStoreHomeAdd:
//       return req.sessionModel.get('homeAddressInline');
      
//     case isUseHomeAdd:
//       return req.sessionModel.get('homeAddressInline');
      
//     case isStoreOtherAdd:
//       return req.sessionModel.get('precursors-use-other-address');
      
//     case isUseOtherAdd:
//       return req.sessionModel.get('store-precursors-other-address');
      
//     default : 
//      return 'no match'
//   }
// }
 