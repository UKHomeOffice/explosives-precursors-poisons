'use strict';


module.exports = {
  'amend-licence-number': {
    steps: [
      {
        steps: '/licence-number',
        field: 'amend-licence-number'
      }
    ]
  },
  'amend-address-on-licence': {
    steps: [
      {
        step: '/home-address',
        field: 'amend-address-1'
      },
      {
        step: '/home-address',
        field: 'amend-address-2'
      },
      {
        step: '/home-address',
        field: 'amend-town-or-city'
      },
      {
        step: '/home-address',
        field: 'amend-county'
      },
      {
        step: '/home-address',
        field: 'amend-postcode'
      },
      {
        step: '/home-address',
        field: 'amend-country'
      }
    ]
  }
};
