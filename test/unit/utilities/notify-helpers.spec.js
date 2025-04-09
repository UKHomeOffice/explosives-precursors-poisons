const {
  getPdfTitle,
  formatSectionSummaryItems,
  parseDocumentList,
  getLabel,
  getTemplateId,
  getUserEmail,
  getIdentityAttachment,
  checkYesNo,
  hasValue,
  hasCountersignatoryDetails,
  STR_YES,
  STR_NO,
  getSessionValueOrDefault,
  formatFieldsNewLine,
  getReplacePersonalisation,
  getAmendPersonalisation,
  getNewRenewPersonalisation
} = require('../../../utilities/helpers/notify-helpers');

const {
  APP_TYPE_AMEND,
  APP_TYPE_REPLACE
} = require('../../../utilities/constants/string-constants');

const { govukNotify } = require('../../../config');

const replaceExpectedKeys = [
  'why_need_replacement',
  'has_licence_stolen',
  'reported_to_police',
  'police_force',
  'crime_number',
  'name_on_licence',
  'date_of_birth',
  'current_address',
  'phone_number',
  'email_address',
  'has_amended_name',
  'new_name',
  'identity_document',
  'identity_document_number',
  'identity_document_attachment',
  'has_certificate_conduct',
  'certificate_conduct_attachment',
  'has_amended_address',
  'new_address',
  'date_moved_to',
  'address_proof_attachments',
  'has_amended_substances',
  'has_amended_precursor',
  'explosive_precursor',
  'has_amended_poisons',
  'poison_list',
  'has_countersignatory_details',
  'countersignatory_title',
  'countersignatory_first_name',
  'has_countersignatory_middle_name',
  'countersignatory_middle_name',
  'countersignatory_last_name',
  'countersignatory_address',
  'countersignatory_phone',
  'countersignatory_email',
  'countersignatory_id_type',
  'countersignatory_id',
  'has_birth_certificate',
  'birth_certificate_attachment'
];

const amendExpectedKeys = [
  'licence_number',
  'title',
  'first_name',
  'has_middle_name',
  'middle_name',
  'last_name',
  'date_of_birth',
  'current_address',
  'phone_number',
  'email_address',
  'has_amended_name',
  'new_name',
  'identity_document',
  'identity_document_number',
  'identity_document_attachment',
  'has_certificate_conduct',
  'certificate_conduct_attachment',
  'has_amended_address',
  'new_address',
  'date_moved_to',
  'address_proof_attachments',
  'has_amended_substances',
  'has_amended_precursor',
  'explosive_precursor',
  'has_amended_poisons',
  'poison_list',
  'has_countersignatory_details',
  'countersignatory_title',
  'countersignatory_first_name',
  'has_countersignatory_middle_name',
  'countersignatory_middle_name',
  'countersignatory_last_name',
  'countersignatory_address',
  'countersignatory_phone',
  'countersignatory_email',
  'countersignatory_id_type',
  'countersignatory_id',
  'has_birth_certificate',
  'birth_certificate_attachment'
];

const newRenewExpectedKeys = [
  'licence_number',
  'title',
  'first_name',
  'has_middle_name',
  'middle_name',
  'last_name',
  'has_other_names',
  'other_names',
  'date_of_birth',
  'place_of_birth',
  'country_of_birth',
  'country_of_nationality',
  'has_other_nationality',
  'sex',
  'height',
  'occupation',
  'other_nationality',
  'current_address',
  'moved_date',
  'proof_of_address',
  'has_previous_address',
  'previous_addresses',
  'phone_number',
  'email_address',
  'identity_document',
  'identity_document_number',
  'identity_document_attachment',
  'has_certificate_conduct',
  'certificate_conduct_attachment',
  'firearms_licence',
  'shotgun_licence',
  'licence_refused',
  'has_criminal_record',
  'criminal_record',
  'criminal_offences',
  'treatment_health_problem',
  'treatment_drug_alcohol',
  'doctor_details',
  'has_medical_form',
  'medical_form_attachment',
  'has_explosive_precursor',
  'explosive_precursor',
  'has_poisons',
  'poisons',
  'countersignatory_title',
  'countersignatory_first_name',
  'has_countersignatory_middle_name',
  'countersignatory_middle_name',
  'countersignatory_last_name',
  'countersignatory_address',
  'countersignatory_phone',
  'countersignatory_email',
  'countersignatory_id_type',
  'countersignatory_id',
  'has_birth_certificate',
  'birth_certificate_attachment'
];

describe('notify-helpers tests', () => {
  let req;

  beforeEach(() => {
    req = {
      sessionModel: {
        get: sinon.stub()
      },
      translate: sinon.stub()
    };
  });
  describe('getPdfTitle tests', () => {
    it('should return the correct title for new application type', () => {
      req.sessionModel.get.returns('new');
      req.translate.returns('New Explosives Precursors and Poisons Licence');

      const result = getPdfTitle(req);
      expect(result).to.equal('New Explosives Precursors and Poisons Licence');
      expect(req.sessionModel.get.calledWith('applicationType')).to.be.true;
      expect(req.translate.calledWith('journey.serviceNameNew')).to.be.true;
    });

    it('should return the correct title for renew application type', () => {
      req.sessionModel.get.returns('renew');
      req.translate.returns('Renew Explosives Precursors and Poisons Licence');

      const result = getPdfTitle(req);
      expect(result).to.equal(
        'Renew Explosives Precursors and Poisons Licence'
      );
      expect(req.sessionModel.get.calledWith('applicationType')).to.be.true;
      expect(req.translate.calledWith('journey.serviceNameRenew')).to.be.true;
    });

    it('should return the correct title for amend application type', () => {
      req.sessionModel.get.returns('amend');
      req.translate.returns('Explosives Precursors and Poisons Licence');

      const result = getPdfTitle(req);
      expect(result).to.equal('Explosives Precursors and Poisons Licence');
      expect(req.sessionModel.get.calledWith('applicationType')).to.be.true;
      expect(req.translate.calledWith('journey.serviceName')).to.be.true;
    });

    it('should return the correct title for replace application type', () => {
      req.sessionModel.get.returns('replace');
      req.translate.returns('Explosives Precursors and Poisons Licence');

      const result = getPdfTitle(req);
      expect(result).to.equal('Explosives Precursors and Poisons Licence');
      expect(req.sessionModel.get.calledWith('applicationType')).to.be.true;
      expect(req.translate.calledWith('journey.serviceName')).to.be.true;
    });

    it('should throw an error for unknown application type', () => {
      req.sessionModel.get.returns('unknown');

      expect(() => getPdfTitle(req)).to.throw(
        'Unknown application type: unknown'
      );
      expect(req.sessionModel.get.calledWith('applicationType')).to.be.true;
    });
  });

  describe('formatSectionSummaryItems tests', () => {
    it('should return formatted summary items when items are provided', () => {
      const items = {
        aggregatedValues: [
          { fields: [{ parsed: 'field1' }, { parsed: 'field2' }] },
          { fields: [{ parsed: 'field3' }, { parsed: 'field4' }] }
        ]
      };
      const expectedOutput = 'field1\nfield2\n\n ---\n^field3\nfield4';
      const result = formatSectionSummaryItems(items);
      expect(result).to.equal(expectedOutput);
    });

    it('should return an empty string when items are not provided', () => {
      const result = formatSectionSummaryItems(null);
      expect(result).to.equal('');
    });

    it('should return an empty string when aggregatedValues is an empty array', () => {
      const items = { aggregatedValues: [] };
      const result = formatSectionSummaryItems(items);
      expect(result).to.equal('');
    });

    it('should handle single field correctly', () => {
      const items = {
        aggregatedValues: [{ fields: [{ parsed: 'singleField' }] }]
      };
      const expectedOutput = 'singleField';
      const result = formatSectionSummaryItems(items);
      expect(result).to.equal(expectedOutput);
    });

    it('should join multiple fields with newline', () => {
      const items = {
        aggregatedValues: [
          { fields: [{ parsed: 'field1' }, { parsed: 'field2' }] }
        ]
      };
      const expectedOutput = 'field1\nfield2';
      const result = formatSectionSummaryItems(items);
      expect(result).to.equal(expectedOutput);
    });

    it('should join multiple aggregated values with separator', () => {
      const items = {
        aggregatedValues: [
          { fields: [{ parsed: 'field1' }, { parsed: 'field2' }] },
          { fields: [{ parsed: 'field3' }, { parsed: 'field4' }] }
        ]
      };
      const expectedOutput = 'field1\nfield2\n\n ---\n^field3\nfield4';
      const result = formatSectionSummaryItems(items);
      expect(result).to.equal(expectedOutput);
    });

    it('should return the formatted date for date field', () => {
      const items = {
        aggregatedValues: [
          {
            fields: [
              { field: 'new-renew-other-name-start-date', parsed: '2000-01-01' }
            ]
          }
        ]
      };
      const result = formatSectionSummaryItems(items);
      expect(result).to.equal('01 January 2000');
    });
  });

  describe('parseDocumentList tests', () => {
    it('should return formatted document list when documents are provided', () => {
      const documents = [
        { name: 'Document1', url: 'http://example.com/doc1' },
        { name: 'Document2', url: 'http://example.com/doc2' }
      ];
      const expectedOutput =
        '\n[Document1](http://example.com/doc1)\n[Document2](http://example.com/doc2)';
      const result = parseDocumentList(documents);
      expect(result).to.equal(expectedOutput);
    });

    it('should return an empty string when documents are not provided', () => {
      const result = parseDocumentList(null);
      expect(result).to.equal('');
    });

    it('should return an empty string when documents array is empty', () => {
      const result = parseDocumentList([]);
      expect(result).to.equal('');
    });

    it('should handle a single document correctly', () => {
      const documents = [{ name: 'Document1', url: 'http://example.com/doc1' }];
      const expectedOutput = '\n[Document1](http://example.com/doc1)';
      const result = parseDocumentList(documents);
      expect(result).to.equal(expectedOutput);
    });

    it('should join multiple documents with newline', () => {
      const documents = [
        { name: 'Document1', url: 'http://example.com/doc1' },
        { name: 'Document2', url: 'http://example.com/doc2' }
      ];
      const expectedOutput =
        '\n[Document1](http://example.com/doc1)\n[Document2](http://example.com/doc2)';
      const result = parseDocumentList(documents);
      expect(result).to.equal(expectedOutput);
    });
  });

  describe('getLabel tests', () => {
    const translation = {
      field1: {
        options: {
          option1: { label: 'Option 1' },
          option2: { label: 'Option 2' },
          option3: { label: 'Option 3' }
        }
      },
      field2: {
        options: {
          optionA: { label: 'Option A' },
          optionB: { label: 'Option B' }
        }
      }
    };

    it('should return the label for a single field value', () => {
      const fieldKey = 'field1';
      const fieldValue = 'option1';
      const result = getLabel(fieldKey, fieldValue, translation);
      expect(result).to.equal('Option 1');
    });

    it('should return comma-separated labels for an array of field values', () => {
      const fieldKey = 'field1';
      const fieldValue = ['option1', 'option2', 'option3'];
      const result = getLabel(fieldKey, fieldValue, translation);
      expect(result).to.equal('Option 1, Option 2, Option 3');
    });

    it('should return undefined for a non-existent field value', () => {
      const fieldKey = 'field1';
      const fieldValue = 'nonExistentOption';
      const result = getLabel(fieldKey, fieldValue, translation);
      expect(result).to.be.undefined;
    });

    it('should return undefined for a non-existent field key', () => {
      const fieldKey = 'nonExistentField';
      const fieldValue = 'option1';
      const result = getLabel(fieldKey, fieldValue, translation);
      expect(result).to.be.undefined;
    });

    it('should return comma-separated labels for an array of field values with some non-existent options', () => {
      const fieldKey = 'field1';
      const fieldValue = ['option1', 'nonExistentOption', 'option3'];
      const result = getLabel(fieldKey, fieldValue, translation);
      expect(result).to.equal('Option 1, , Option 3');
    });

    it('should handle empty array of field values', () => {
      const fieldKey = 'field1';
      const fieldValue = [];
      const result = getLabel(fieldKey, fieldValue, translation);
      expect(result).to.equal('');
    });

    it('should handle empty translation object', () => {
      const fieldKey = 'field1';
      const fieldValue = 'option1';
      const result = getLabel(fieldKey, fieldValue, {});
      expect(result).to.be.undefined;
    });
  });

  describe('getTemplateId tests', () => {
    const USER = 'user';
    const BUSINESS = 'business';
    const APP_TYPE_NEW = 'new';
    const APP_TYPE_RENEW = 'renew';
    it('should return the correct template ID for new user application', () => {
      const applicationType = APP_TYPE_NEW;
      const recipientType = USER;
      const expectedTemplateId = govukNotify.newApplicationUserTemplateId;
      const result = getTemplateId(req, applicationType, recipientType);
      expect(result).to.equal(expectedTemplateId);
    });

    it('should return the correct template ID for renew user application', () => {
      const applicationType = APP_TYPE_RENEW;
      const recipientType = USER;
      const expectedTemplateId = govukNotify.renewApplicationUserTemplateId;
      const result = getTemplateId(req, applicationType, recipientType);
      expect(result).to.equal(expectedTemplateId);
    });

    it('should return the correct template ID for amend user application', () => {
      const applicationType = APP_TYPE_AMEND;
      const recipientType = USER;
      const expectedTemplateId = govukNotify.amendApplicationUserTemplateId;
      const result = getTemplateId(req, applicationType, recipientType);
      expect(result).to.equal(expectedTemplateId);
    });

    it('should return the correct template ID for replace user application when reason is not damaged', () => {
      const applicationType = APP_TYPE_REPLACE;
      const recipientType = USER;
      req.sessionModel.get
        .withArgs('replace-replacement-reason')
        .returns('lost');
      const expectedTemplateId = govukNotify.replaceApplicationUserTemplateId;
      const result = getTemplateId(req, applicationType, recipientType);
      expect(result).to.equal(expectedTemplateId);
    });

    it('should return the correct template ID for replace user application when reason is damaged', () => {
      const applicationType = APP_TYPE_REPLACE;
      const recipientType = USER;
      req.sessionModel.get
        .withArgs('replace-replacement-reason')
        .returns('damaged');
      const expectedTemplateId =
        govukNotify.replaceDamagedApplicationUserTemplateId;
      const result = getTemplateId(req, applicationType, recipientType);
      expect(result).to.equal(expectedTemplateId);
    });

    it('should return the correct template ID for new business application', () => {
      const applicationType = APP_TYPE_NEW;
      const recipientType = BUSINESS;
      const expectedTemplateId = govukNotify.newApplicationBusinessTemplateId;
      const result = getTemplateId(req, applicationType, recipientType);
      expect(result).to.equal(expectedTemplateId);
    });

    it('should return the correct template ID for renew business application', () => {
      const applicationType = APP_TYPE_RENEW;
      const recipientType = BUSINESS;
      const expectedTemplateId = govukNotify.renewApplicationBusinessTemplateId;
      const result = getTemplateId(req, applicationType, recipientType);
      expect(result).to.equal(expectedTemplateId);
    });

    it('should return the correct template ID for amend business application', () => {
      const applicationType = APP_TYPE_AMEND;
      const recipientType = BUSINESS;
      const expectedTemplateId = govukNotify.amendApplicationBusinessTemplateId;
      const result = getTemplateId(req, applicationType, recipientType);
      expect(result).to.equal(expectedTemplateId);
    });

    it('should return the correct template ID for replace business application', () => {
      const applicationType = APP_TYPE_REPLACE;
      const recipientType = BUSINESS;
      const expectedTemplateId =
        govukNotify.replaceApplicationBusinessTemplateId;
      const result = getTemplateId(req, applicationType, recipientType);
      expect(result).to.equal(expectedTemplateId);
    });

    it('should return an empty string for unknown recipient type', () => {
      const applicationType = APP_TYPE_NEW;
      const recipientType = 'unknown';
      const result = getTemplateId(req, applicationType, recipientType);
      expect(result).to.equal('');
    });
  });

  describe('getUserEmail tests', () => {
    it('should return the correct email field key for new application type', () => {
      const applicationType = 'new';
      const expectedEmailFieldKey = 'new-renew-email';
      const result = getUserEmail(applicationType);
      expect(result).to.equal(expectedEmailFieldKey);
    });

    it('should return the correct email field key for renew application type', () => {
      const applicationType = 'renew';
      const expectedEmailFieldKey = 'new-renew-email';
      const result = getUserEmail(applicationType);
      expect(result).to.equal(expectedEmailFieldKey);
    });

    it('should return the correct email field key for amend application type', () => {
      const applicationType = 'amend';
      const expectedEmailFieldKey = 'amend-email';
      const result = getUserEmail(applicationType);
      expect(result).to.equal(expectedEmailFieldKey);
    });

    it('should return the correct email field key for replace application type', () => {
      const applicationType = 'replace';
      const expectedEmailFieldKey = 'replace-email';
      const result = getUserEmail(applicationType);
      expect(result).to.equal(expectedEmailFieldKey);
    });

    it('should return undefined for an unknown application type', () => {
      const applicationType = 'unknown';
      const result = getUserEmail(applicationType);
      expect(result).to.be.undefined;
    });
  });

  describe('getIdentityAttachment tests', () => {
    it('should return the correct attachment list for new-renew-UK-passport-number', () => {
      const idFields = ['new-renew-UK-passport-number'];
      req.sessionModel.get
        .withArgs('new-renew-UK-passport-number')
        .returns('some-passport-number');
      req.sessionModel.get
        .withArgs('new-renew-british-passport')
        .returns([{ name: 'Passport1', url: 'http://example.com/passport1' }]);

      const expectedOutput = '\n[Passport1](http://example.com/passport1)';
      const result = getIdentityAttachment(req, idFields);
      expect(result).to.equal(expectedOutput);
    });

    it('should return the correct attachment list for amend-EU-passport-number', () => {
      const idFields = ['amend-EU-passport-number'];
      req.sessionModel.get
        .withArgs('amend-EU-passport-number')
        .returns('some-passport-number');
      req.sessionModel.get
        .withArgs('amend-eu-passport')
        .returns([
          { name: 'EU Passport', url: 'http://example.com/eu-passport' }
        ]);

      const expectedOutput = '\n[EU Passport](http://example.com/eu-passport)';
      const result = getIdentityAttachment(req, idFields);
      expect(result).to.equal(expectedOutput);
    });

    it('should return the correct attachment list for replace-Uk-driving-licence-number', () => {
      const idFields = ['replace-Uk-driving-licence-number'];
      req.sessionModel.get
        .withArgs('replace-Uk-driving-licence-number')
        .returns('some-driving-licence-number');
      req.sessionModel.get
        .withArgs('replace-upload-driving-licence')
        .returns([
          { name: 'Driving Licence', url: 'http://example.com/driving-licence' }
        ]);

      const expectedOutput =
        '\n[Driving Licence](http://example.com/driving-licence)';
      const result = getIdentityAttachment(req, idFields);
      expect(result).to.equal(expectedOutput);
    });

    it('should return an empty string if no matching document is found', () => {
      const idFields = ['new-renew-UK-passport-number'];
      req.sessionModel.get
        .withArgs('new-renew-UK-passport-number')
        .returns(null);

      const result = getIdentityAttachment(req, idFields);
      expect(result).to.equal('');
    });

    it('should return an empty string if idFields is empty', () => {
      const idFields = [];

      const result = getIdentityAttachment(req, idFields);
      expect(result).to.equal('');
    });

    it('should return an empty string if idFields is not an array', () => {
      const idFields = null;

      const result = getIdentityAttachment(req, idFields);
      expect(result).to.equal('');
    });
  });

  describe('checkYesNo tests', () => {
    it('should return STR_YES if the value is STR_YES', () => {
      const value = STR_YES;
      const result = checkYesNo(value);
      expect(result).to.equal(STR_YES);
    });

    it('should return STR_NO if the value is not STR_YES', () => {
      const value = 'no';
      const result = checkYesNo(value);
      expect(result).to.equal(STR_NO);
    });

    it('should return STR_NO if the value is an empty string', () => {
      const value = '';
      const result = checkYesNo(value);
      expect(result).to.equal(STR_NO);
    });

    it('should return STR_NO if the value is undefined', () => {
      const value = undefined;
      const result = checkYesNo(value);
      expect(result).to.equal(STR_NO);
    });

    it('should return STR_NO if the value is null', () => {
      const value = null;
      const result = checkYesNo(value);
      expect(result).to.equal(STR_NO);
    });
  });

  describe('hasValue tests', () => {
    it('should return STR_YES if the value is truthy', () => {
      const value = 'some value';
      const result = hasValue(value);
      expect(result).to.equal(STR_YES);
    });

    it('should return STR_NO if the value is falsy', () => {
      const value = '';
      const result = hasValue(value);
      expect(result).to.equal(STR_NO);
    });

    it('should return STR_NO if the value is null', () => {
      const value = null;
      const result = hasValue(value);
      expect(result).to.equal(STR_NO);
    });

    it('should return STR_NO if the value is undefined', () => {
      const value = undefined;
      const result = hasValue(value);
      expect(result).to.equal(STR_NO);
    });

    it('should return STR_NO if the value is 0', () => {
      const value = 0;
      const result = hasValue(value);
      expect(result).to.equal(STR_NO);
    });

    it('should return STR_YES if the value is a non-zero number', () => {
      const value = 123;
      const result = hasValue(value);
      expect(result).to.equal(STR_YES);
    });

    it('should return STR_YES if the value is true', () => {
      const value = true;
      const result = hasValue(value);
      expect(result).to.equal(STR_YES);
    });

    it('should return STR_NO if the value is false', () => {
      const value = false;
      const result = hasValue(value);
      expect(result).to.equal(STR_NO);
    });
  });

  describe('hasCountersignatoryDetails tests', () => {
    it('should return true if application type is APP_TYPE_AMEND and amend-name-options is STR_YES', () => {
      const applicationType = APP_TYPE_AMEND;
      req.sessionModel.get.withArgs('amend-name-options').returns(STR_YES);
      req.sessionModel.get
        .withArgs('amend-home-address-options')
        .returns(STR_NO);

      const result = hasCountersignatoryDetails(req, applicationType);
      expect(result).to.be.true;
    });

    it('should return true if application type is APP_TYPE_AMEND and amend-home-address-options is STR_YES', () => {
      const applicationType = APP_TYPE_AMEND;
      req.sessionModel.get.withArgs('amend-name-options').returns(STR_NO);
      req.sessionModel.get
        .withArgs('amend-home-address-options')
        .returns(STR_YES);

      const result = hasCountersignatoryDetails(req, applicationType);
      expect(result).to.be.true;
    });

    it(
      'should return false if application type is APP_TYPE_AMEND and both amend-name-options ' +
        'and amend-home-address-options are STR_NO',
      () => {
        const applicationType = APP_TYPE_AMEND;
        req.sessionModel.get.withArgs('amend-name-options').returns(STR_NO);
        req.sessionModel.get
          .withArgs('amend-home-address-options')
          .returns(STR_NO);

        const result = hasCountersignatoryDetails(req, applicationType);
        expect(result).to.be.false;
      }
    );

    it('should return true if application type is APP_TYPE_REPLACE and replace-name-options is STR_YES', () => {
      const applicationType = APP_TYPE_REPLACE;
      req.sessionModel.get.withArgs('replace-name-options').returns(STR_YES);
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .returns(STR_NO);

      const result = hasCountersignatoryDetails(req, applicationType);
      expect(result).to.be.true;
    });

    it('should return true if application type is APP_TYPE_REPLACE and replace-home-address-options is STR_YES', () => {
      const applicationType = APP_TYPE_REPLACE;
      req.sessionModel.get.withArgs('replace-name-options').returns(STR_NO);
      req.sessionModel.get
        .withArgs('replace-home-address-options')
        .returns(STR_YES);

      const result = hasCountersignatoryDetails(req, applicationType);
      expect(result).to.be.true;
    });

    it(
      'should return false if application type is APP_TYPE_REPLACE and both ' +
        'replace-name-options and replace-home-address-options are STR_NO',
      () => {
        const applicationType = APP_TYPE_REPLACE;
        req.sessionModel.get.withArgs('replace-name-options').returns(STR_NO);
        req.sessionModel.get
          .withArgs('replace-home-address-options')
          .returns(STR_NO);

        const result = hasCountersignatoryDetails(req, applicationType);
        expect(result).to.be.false;
      }
    );

    it('should return false if application type is unknown', () => {
      const applicationType = 'unknown';
      const result = hasCountersignatoryDetails(req, applicationType);
      expect(result).to.be.false;
    });
  });

  describe('getSessionValueOrDefault tests', () => {
    it('should return the value if it is defined and truthy', () => {
      const value = 'some value';
      const result = getSessionValueOrDefault(value);
      expect(result).to.equal(value);
    });

    it('should return an empty string if the value is undefined', () => {
      const value = undefined;
      const result = getSessionValueOrDefault(value);
      expect(result).to.equal('');
    });

    it('should return an empty string if the value is null', () => {
      const value = null;
      const result = getSessionValueOrDefault(value);
      expect(result).to.equal('');
    });

    it('should return an empty string if the value is an empty string', () => {
      const value = '';
      const result = getSessionValueOrDefault(value);
      expect(result).to.equal('');
    });

    it('should return the value if it is a non-zero number', () => {
      const value = 123;
      const result = getSessionValueOrDefault(value);
      expect(result).to.equal(value);
    });

    it('should return the value if it is a boolean true', () => {
      const value = true;
      const result = getSessionValueOrDefault(value);
      expect(result).to.equal(value);
    });

    it('should return an empty string if the value is a boolean false', () => {
      const value = false;
      const result = getSessionValueOrDefault(value);
      expect(result).to.equal('');
    });
  });

  describe('formatFieldsNewLine tests', () => {
    it('should return joined values with new lines for valid fields', () => {
      req.sessionModel.get.withArgs('field1').returns('value1');
      req.sessionModel.get.withArgs('field2').returns('value2');
      req.sessionModel.get.withArgs('field3').returns('value3');

      const result = formatFieldsNewLine(req, ['field1', 'field2', 'field3']);
      expect(result).to.equal('value1\nvalue2\nvalue3');
    });

    it('should ignore fields with no value', () => {
      req.sessionModel.get.withArgs('field1').returns('value1');
      req.sessionModel.get.withArgs('field2').returns(null);
      req.sessionModel.get.withArgs('field3').returns('value3');

      const result = formatFieldsNewLine(req, ['field1', 'field2', 'field3']);
      expect(result).to.equal('value1\nvalue3');
    });

    it('should return an empty string if req is null', () => {
      const result = formatFieldsNewLine(null, ['field1', 'field2', 'field3']);
      expect(result).to.equal('');
    });

    it('should return an empty string if fields is not an array', () => {
      const result = formatFieldsNewLine(req, 'notAnArray');
      expect(result).to.equal('');
    });

    it('should return an empty string if fields is an empty array', () => {
      const result = formatFieldsNewLine(req, []);
      expect(result).to.equal('');
    });
  });
  describe('getReplacePersonalisation', () => {
    it('should return expected personalisation object', () => {
      const result = getReplacePersonalisation({
        sessionModel: {
          get: () => {}
        }
      });
      expect(Object.keys(result)).to.deep.equal(replaceExpectedKeys);
    });
  });

  describe('getAmendPersonalisation', () => {
    it('should return expected personalisation object', () => {
      const result = getAmendPersonalisation({
        sessionModel: {
          get: () => {}
        }
      });
      expect(Object.keys(result)).to.deep.equal(amendExpectedKeys);
    });
  });

  describe('getNewRenewPersonalisation', () => {
    it('should return expected personalisation object', () => {
      const result = getNewRenewPersonalisation({
        sessionModel: {
          get: () => {}
        }
      });
      expect(Object.keys(result)).to.deep.equal(newRenewExpectedKeys);
    });
  });
});
