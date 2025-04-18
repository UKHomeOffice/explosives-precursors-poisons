const { SUBSTANCES } = require('../../../utilities/constants/string-constants');
const { DEFAULT_AGGREGATOR_LIMIT, getSubstanceShortLabel } = require('../../../utilities/helpers');

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


      if(!isTitleField && itemTitle.length === 0 && req.originalUrl.includes('/precursors-summary')) {
        itemTitle.push(getSubstanceShortLabel(req.sessionModel.get('precursor-field'), SUBSTANCES.PRECURSOR));
      }
      if(!isTitleField && itemTitle.length === 0 && req.originalUrl.includes('/poison-summary')) {
        itemTitle.push(getSubstanceShortLabel(req.sessionModel.get('poison-field'), SUBSTANCES.POISON));
      }

      fields.push({
        field: aggregateFromField,
        parsed: req.originalUrl.includes('/poison-summary') ?
          this.parsePoisonField(aggregateFromField, value, req) :
          this.parsePrecursorField(aggregateFromField, value, req),
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

  parsePrecursorField(field, value, req) {
    const fieldName = field.field || field;
    const valueVar = field.value || value;
    let newValue = value;
    const parser = req.form.options.fieldsConfig[fieldName]?.parse;
    const homeAddress = req.sessionModel.get('homeAddressInline');
    const storePrecursorsOtherAddress = req.sessionModel.get('store-precursors-other-address');
    const precursorsUseOtherAddress = req.sessionModel.get('precursors-use-other-address');
    if (Array.isArray(value)) {
      if (fieldName === 'where-to-store-precursor') {
        newValue = homeAddress?.concat('\n\n', storePrecursorsOtherAddress);
      }
      if (fieldName === 'where-to-use-precursor') {
        newValue = homeAddress?.concat('\n\n', precursorsUseOtherAddress);
      }
    } else {
      switch (fieldName) {
        case 'where-to-store-precursor':
          if (valueVar === 'store-precursors-home-address-value') {
            newValue = homeAddress;
          } else if (valueVar === 'store-precursors-other-address-value') {
            newValue = storePrecursorsOtherAddress;
          }
          break;
        case 'where-to-use-precursor':
          if (valueVar === 'use-precursors-home-address-value') {
            newValue = homeAddress;
          } else if (valueVar === 'use-precursors-other-address-value') {
            newValue = precursorsUseOtherAddress;
          }
          break;
        default:
          break;
      }
    }
    return parser ? parser(newValue) : newValue;
  }
  parsePoisonField(field, value, req) {
    const fieldName = field.field || field;
    const valueVar = field.value || value;
    let newValue = value;
    const parser = req.form.options.fieldsConfig[fieldName]?.parse;
    const homeAddress = req.sessionModel.get('homeAddressInline');
    const storePoisonOtherAddress = req.sessionModel.get('store-poison-other-address');
    const poisonUseOtherAddress = req.sessionModel.get('poison-use-other-address');
    if (Array.isArray(value)) {
      if (fieldName === 'where-to-store-poison') {
        newValue = homeAddress?.concat('\n\n', storePoisonOtherAddress);
      }
      if (fieldName === 'where-to-use-poison') {
        newValue = homeAddress?.concat('\n\n', poisonUseOtherAddress);
      }
    } else {
      switch (fieldName) {
        case 'where-to-store-poison':
          if (valueVar === 'store-poison-home-address-value') {
            newValue = homeAddress;
          } else if (valueVar === 'store-poison-other-address-value') {
            newValue = storePoisonOtherAddress;
          }
          break;
        case 'where-to-use-poison':
          if (valueVar === 'use-poison-home-address') {
            newValue = homeAddress;
          } else if (valueVar === 'use-poison-other-address-value') {
            newValue = poisonUseOtherAddress;
          }
          break;
        default:
          break;
      }
    }
    return parser ? parser(newValue) : newValue;
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
