module.exports = superclass =>
  class extends superclass {
    getValues(req, res, next) {
      const selectedCountry = req.sessionModel.get(
        'new-renew-country-nationality'
      );

      if (
        selectedCountry &&
        req.form.options?.fields['new-renew-other-country-nationality']?.options
      ) {
        req.form.options.fields['new-renew-other-country-nationality'].options =
          req.form.options.fields[
            'new-renew-other-country-nationality'
          ].options.filter(country => country.label !== selectedCountry);
      }

      return super.getValues(req, res, next);
    }
  };
