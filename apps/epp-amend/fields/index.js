const dateComponent = require('hof').components.date;

module.exports = {
  'amend-date-of-birth': dateComponent('amend-date-of-birth', {
    mixin: 'input-date',
    legend: { className: 'bold' },
    validate: ['required', 'date', 'before']
  })
};
