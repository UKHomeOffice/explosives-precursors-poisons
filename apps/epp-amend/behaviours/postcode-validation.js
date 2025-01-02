
const hof = require('hof');

module.exports = SuperClass =>
    class extends SuperClass {
      locals(req, res) {
       const selectedCountry = req.form.values?.['amend-country'];
        if (selectedCountry === 'United Kingdom') {
        req.form.options.fields['amend-postcode'].validate.push('required');
         console.log(req.form.options.fields['amend-postcode']);
         const setPostcodeError = {'amend-postcode': { key: 'amend-postcode', type: 'required', arguments: [], 
          errorLinkId: 'amend-postcode', options: {}, message: 'Enter a UK postcode'}};
         setErrors(setPostcodeError, req);
        }else{
            console.log("req: didn't go in") ;
        }
        return super.locals(req, res);
      }
    };

    function setErrors(err, req) {
        if(req.form){
            req.form.errors['amend-postcode'] = err['amend-postcode'];
            req.form.values.errors['amend-postcode'] = err['amend-postcode'];
            req.sessionModel.set('errorValues', req.form.values);
        }
        req.sessionModel.set('errors', err);
      }
  