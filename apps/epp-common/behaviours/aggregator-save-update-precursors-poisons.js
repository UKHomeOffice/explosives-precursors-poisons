const { DEFAULT_AGGREGATOR_LIMIT, getPrecursorsShortLabel } = require('../../../utilities/helpers');

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


      if (!isTitleField && itemTitle.length === 0) {
        itemTitle.push(getPrecursorsShortLabel(req.sessionModel.get('amend-precursor-field')));
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
    const parser = req.form.options.fieldsConfig[fieldName]?.parse;
    if (Array.isArray(value)) {
      if (fieldName === 'amend-where-to-store-precursor') {
        value = req.sessionModel.get('homeAddressInline')
          .concat('\n', req.sessionModel.get('store-precursors-other-address'));
      }
      if (fieldName === 'amend-where-to-use-precursor') {
        value = req.sessionModel.get('homeAddressInline')
          .concat('\n', req.sessionModel.get('precursors-use-other-address'));
      }
    } else {
      if (fieldName === 'amend-where-to-store-precursor' && valueVar === 'amend-store-precursors-home-address') {
        value = req.sessionModel.get('homeAddressInline');
      }
      if (fieldName === 'amend-where-to-use-precursor' && valueVar === 'amend-use-precursors-home-address') {
        value = req.sessionModel.get('homeAddressInline');
      }
      if (fieldName === 'amend-where-to-store-precursor' && valueVar === 'amend-store-precursors-other-address') {
        value = req.sessionModel.get('store-precursors-other-address');
      }
      if (fieldName === 'amend-where-to-use-precursor' && valueVar === 'amend-use-precursors-other-address') {
        value = req.sessionModel.get('precursors-use-other-address');
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
