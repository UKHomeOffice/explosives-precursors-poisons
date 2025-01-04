module.exports = SuperClass =>
    class extends SuperClass {
      //  locals(req, res) {
      //    setErrors(setPostcodeError, req);
      //   return super.locals(req, res);
      // };

      validateField(key, req,){
      const setPostcodeError = {'amend-postcode': { key: 'amend-postcode', type: 'required', arguments: [], 
          errorLinkId: 'amend-postcode', options: {}, message: 'Enter a UK postcode'}};
      const validationErrorFunc = (key, type) => new this.ValidationError(key, { type: type});
      try {
        const selectedCountry = req.form.values?.['amend-country'];
        if (selectedCountry === 'United Kingdom' && !req.form.values['amend-postcode']){
          this.setErrors(setPostcodeError, req);
            return validationErrorFunc('amend-postcode', 'required');
        }
      } catch (error) {
        console.log("error: ", error, "@@@ error Message: ", error.message);
        throw error
      }
      return super.validateField(key, req);
    }
  };
    
  // function setErrors(err, req) {
  //   if (req.form) {
  //     req.sessionModel.set('errorValues', req.form.values);
  //   }
  //   req.sessionModel.set('errors', err);
  // };

    // function setErrors(err, req) {
    //     // if(req.form){
    //     try{
    //        req.form.errors['amend-postcode'] = err['amend-postcode'];
    //        console.log("req.form.errors: ",  req.form.errors);
    //        err['amend-postcode'] = { key: 'amend-postcode', type: 'required', arguments: []};
    //        console.log("req.form.values.errors: ",  req.form.values.errors);
    //        req.form.values.errors['amend-postcode'] = err['amend-postcode'];
    //        console.log("req.form.values.errors AFTER: ",  req.form.values.errors);
    //        req.sessionModel.set('errorValues', req.form.values);
    //     }catch(e){
    //       console.log("Postcode setError", e.message , "@@@@@@@@ ERROR: @@@@@", e)
    //       throw e;
    //     }
           
    //     // }
    //     // err['amend-postcode'] = {'amend-postcode': { key: 'amend-postcode', type: 'required', arguments: []}};
    //     // console.log("err['amend-postcode']: ", err['amend-postcode'])
    //     req.sessionModel.set('errors', err['amend-postcode']);
    //     console.log('sessionModelErrorValues.Errors', req.sessionModel.attributes.errorValues.errors);
    //   }
  