'use strict';

module.exports = {
  'countersignatory-details': {
    steps: [
      {
        step: '/upload-british-passport',
        field: 'replace-british-passport',
        parse: (documents, req) => {
          if (
            req.sessionModel.get('steps').includes('/upload-british-passport') && documents?.length > 0) {
            return documents.map(file => file.name);
          }
          return null;
        }
      },
        {
            step: '/upload-passport',
            field: 'replace-eu-passport',
            parse: (documents, req) => {
                if (
                    req.sessionModel.get('steps').includes('/upload-passport') &&
                    documents?.length > 0
                ) {
                    return documents.map(file => file?.name)?.join('\n\n');
                }
                return null;
            }
        }
    ]
  }
};
