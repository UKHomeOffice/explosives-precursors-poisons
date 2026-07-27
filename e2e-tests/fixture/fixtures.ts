import { test as base } from 'playwright-bdd';
import { addCriminalRecordEntryEppNLPage } from '../pages/add-criminal-record-entry-epp-nl-page';
import { addRefusedRevokedLicenceEppNLPage } from '../pages/add-refused-revoked-licence-epp-nl-page';
import { amendEPOnLicenceRepPage } from '../pages/amend-epon-licence-rep-page';
import { amendLicenceDetailsPage } from '../pages/amend-licence-details-page';
import { amendLicenceDetailsRepPage } from '../pages/amend-licence-details-rep-page';
import { amendmentSubmittedPage } from '../pages/amendment-submitted-page';
import { ammoniumNitrateOrAbove16NitrogenNLPage } from '../pages/ammonium-nitrate-or-above16-nitrogen-nl-page';
import { applicationSubmittedNewAppEppNLPage } from '../pages/application-submitted-new-app-epp-nl-page';
import { changeInHomeAddressAmendLicencePage } from '../pages/change-in-home-address-amend-licence-page';
import { changeInHomeAddressRepPage } from '../pages/change-in-home-address-rep-page';
import { changeInSubstanceAmendLicencePage } from '../pages/change-in-substance-amend-licence-page';
import { changeInSubstancesRepPage } from '../pages/change-in-substances-rep-page';
import { checkYourAnswerAmendLicencePage } from '../pages/check-your-answer-amend-licence-page';
import { checkYourAnswerNewAppEppNLPage } from '../pages/check-your-answer-new-app-epp-nl-page';
import { checkYourAnswersRepPage } from '../pages/check-your-answers-rep-page';
import { counterDetailsAmendLicencePage } from '../pages/counter-details-amend-licence-page';
import { counterDetailsEppNLPage } from '../pages/counter-details-epp-nl-page';
import { counterSignatoryAddressAmendLicencePage } from '../pages/counter-signatory-address-amend-licence-page';
import { counterSignatoryAddressNLPage } from '../pages/counter-signatory-address-nl-page';
import { counterSignatoryAddressRepPage } from '../pages/counter-signatory-address-rep-page';
import { counterSignatoryContactDetailsAmendLicencePage } from '../pages/counter-signatory-contact-details-amend-licence-page';
import { counterSignatoryContactDetailsEppNLPage } from '../pages/counter-signatory-contact-details-epp-nl-page';
import { counterSignatoryContactDetailsRepPage } from '../pages/counter-signatory-contact-details-rep-page';
import { counterSignatoryDetailsRepPage } from '../pages/counter-signatory-details-rep-page';
import { counterSignatoryIdentityDocumentRepPage } from '../pages/counter-signatory-identity-document-rep-page';
import { counterSignatoryIdentityDocumentsAmendLicencePage } from '../pages/counter-signatory-identity-documents-amend-licence-page';
import { counterSignatoryIdentityDocumentsEppNLPage } from '../pages/counter-signatory-identity-documents-epp-nl-page';
import { crimeReportDetailsRepPage } from '../pages/crime-report-details-rep-page';
import { criminalRecordSummaryEppNLPage } from '../pages/criminal-record-summary-epp-nl-page';
import { criminalRecordWarningsEppNLPage } from '../pages/criminal-record-warnings-epp-nl-page';
import { dateOfBirthForLicencePage } from '../pages/date-of-birth-for-licence-page';
import { declarationAmendLicencePage } from '../pages/declaration-amend-licence-page';
import { declarationRepPage } from '../pages/declaration-rep-page';
import { dNPPoisonEppNLPage } from '../pages/dnppoison-epp-nl-page';
import { doctorContactDetailsEppNLPage } from '../pages/doctor-contact-details-epp-nl-page';
import { enterYourLicenceNumberRepPage } from '../pages/enter-your-licence-number-rep-page';
import { enterYourLicenceNumberRLPage } from '../pages/enter-your-licence-number-rl-page';
import { ePDetailsRepPage } from '../pages/epdetails-rep-page';
import { explosivesPrecursorsAmendLicencePage } from '../pages/explosives-precursors-amend-licence-page';
import { explosivesPrecursorsSummaryRepPage } from '../pages/explosives-precursors-summary-rep-page';
import { explosivesPrecursorSummaryAmendLicencePage } from '../pages/explosives-precursor-summary-amend-licence-page';
import { explosivesPrecursorSummaryNLPage } from '../pages/explosives-precursor-summary-nl-page';
import { haveAnyOfYourDetailsChangedRepPage } from '../pages/have-any-of-your-details-changed-rep-page';
import { haveYouReportedTheTheftRepPage } from '../pages/have-you-reported-the-theft-rep-page';
import { homePageEppPage } from '../pages/home-page-epp-page';
import { licenceNumberPage } from '../pages/licence-number-page';
import { medicalDeclarationEppNLPage } from '../pages/medical-declaration-epp-nl-page';
import { namePageNLPage } from '../pages/name-page-nl-page';
import { newAppDeclarationEppNLPage } from '../pages/new-app-declaration-epp-nl-page';
import { otherLicencesEppNLPage } from '../pages/other-licences-epp-nl-page';
import { otherNamesPageNLPage } from '../pages/other-names-page-nl-page';
import { otherNamesSummaryPageNLPage } from '../pages/other-names-summary-page-nl-page';
import { otherNationalitiesEppNLPage } from '../pages/other-nationalities-epp-nl-page';
import { poisonDetailsRepPage } from '../pages/poison-details-rep-page';
import { poisonLicenceSummaryRepPage } from '../pages/poison-licence-summary-rep-page';
import { poisonsAmendLicencePage } from '../pages/poisons-amend-licence-page';
import { poisonsOnLicenceSummaryNLPage } from '../pages/poisons-on-licence-summary-nl-page';
import { previousAddressPageNLPage } from '../pages/previous-address-page-nl-page';
import { refusedLicenceHistoryEppNLPage } from '../pages/refused-licence-history-epp-nl-page';
import { regulatedEpNLPage } from '../pages/regulated-ep-nl-page';
import { regulatedExplosivesPrecursorsPage } from '../pages/regulated-explosives-precursors-page';
import { regulatedPoisonsAmendLicencePage } from '../pages/regulated-poisons-amend-licence-page';
import { regulatedPoisonsEppNLPage } from '../pages/regulated-poisons-epp-nl-page';
import { regulatedPoisonsRepPage } from '../pages/regulated-poisons-rep-page';
import { summaryPreviousAddressLast5YearsEppNLPage } from '../pages/summary-previous-address-last5-years-epp-nl-page';
import { uploadBritishPassportEppNLPage } from '../pages/upload-british-passport-epp-nl-page';
import { uploadBritishPassportRepPage } from '../pages/upload-british-passport-rep-page';
import { uploadCertificateOfConductEppNLPage } from '../pages/upload-certificate-of-conduct-epp-nl-page';
import { uploadCertificateOfGoodConductRepPage } from '../pages/upload-certificate-of-good-conduct-rep-page';
import { uploadEUPassportEvidenceEppNLPage } from '../pages/upload-eupassport-evidence-epp-nl-page';
import { uploadMedicalFormEppNLPage } from '../pages/upload-medical-form-epp-nl-page';
import { uploadPassportRepPage } from '../pages/upload-passport-rep-page';
import { uploadProofOfAddressAmendLicencePage } from '../pages/upload-proof-of-address-amend-licence-page';
import { uploadProofOfAddressEppNLPage } from '../pages/upload-proof-of-address-epp-nl-page';
import { uploadProofOfAddressRepPage } from '../pages/upload-proof-of-address-rep-page';
import { uploadUKDrivingLicenceEvidenceEppNLPage } from '../pages/upload-ukdriving-licence-evidence-epp-nl-page';
import { uploadUKDrivingLicenceRepPage } from '../pages/upload-ukdriving-licence-rep-page';
import { whatAreYourContactDetailsAmendLicencePage } from '../pages/what-are-your-contact-details-amend-licence-page';
import { whatAreYourContactDetailsNLPage } from '../pages/what-are-your-contact-details-nl-page';
import { whatAreYourContactDetailsRepPage } from '../pages/what-are-your-contact-details-rep-page';
import { whatIsHomeAddressPageNLPage } from '../pages/what-is-home-address-page-nl-page';
import { whatIsNameOnLicencePage } from '../pages/what-is-name-on-licence-page';
import { whatIsYourDOBRepPage } from '../pages/what-is-your-dobrep-page';
import { whatIsYourHomeAddressAmendLicencePage } from '../pages/what-is-your-home-address-amend-licence-page';
import { whatIsYourHomeAddressRepPage } from '../pages/what-is-your-home-address-rep-page';
import { whatIsYourNameOnTheLicenceRepPage } from '../pages/what-is-your-name-on-the-licence-rep-page';
import { whatIsYourNewAddressAmendLicencePage } from '../pages/what-is-your-new-address-amend-licence-page';
import { whatIsYourNewAddressRepPage } from '../pages/what-is-your-new-address-rep-page';
import { whatIsYourNewNameAmendLicencePage } from '../pages/what-is-your-new-name-amend-licence-page';
import { whatIsYourNewNameRepPage } from '../pages/what-is-your-new-name-rep-page';
import { whatTypeOfApplicationPage } from '../pages/what-type-of-application-page';
import { whichIdentityDocumentDoYouUseRepPage } from '../pages/which-identity-document-do-you-use-rep-page';
import { whichIdentityDocUseEppNLPage } from '../pages/which-identity-doc-use-epp-nl-page';
import { whyDoYouNeedReplacementLicenceRepPage } from '../pages/why-do-you-need-replacement-licence-rep-page';
import { youDoNotNeedToApplyForLicencePage } from '../pages/you-do-not-need-to-apply-for-licence-page';
import { yourDetailsPageNLPage } from '../pages/your-details-page-nl-page';
import { yourMedicalHistoryEppNLPage } from '../pages/your-medical-history-epp-nl-page';

export type Pages = {
  addCriminalRecordEntryEppNLPage: addCriminalRecordEntryEppNLPage;
  addRefusedRevokedLicenceEppNLPage: addRefusedRevokedLicenceEppNLPage;
  amendEPOnLicenceRepPage: amendEPOnLicenceRepPage;
  amendLicenceDetailsPage: amendLicenceDetailsPage;
  amendLicenceDetailsRepPage: amendLicenceDetailsRepPage;
  amendmentSubmittedPage: amendmentSubmittedPage;
  ammoniumNitrateOrAbove16NitrogenNLPage: ammoniumNitrateOrAbove16NitrogenNLPage;
  applicationSubmittedNewAppEppNLPage: applicationSubmittedNewAppEppNLPage;
  changeInHomeAddressAmendLicencePage: changeInHomeAddressAmendLicencePage;
  changeInHomeAddressRepPage: changeInHomeAddressRepPage;
  changeInSubstanceAmendLicencePage: changeInSubstanceAmendLicencePage;
  changeInSubstancesRepPage: changeInSubstancesRepPage;
  checkYourAnswerAmendLicencePage: checkYourAnswerAmendLicencePage;
  checkYourAnswerNewAppEppNLPage: checkYourAnswerNewAppEppNLPage;
  checkYourAnswersRepPage: checkYourAnswersRepPage;
  counterDetailsAmendLicencePage: counterDetailsAmendLicencePage;
  counterDetailsEppNLPage: counterDetailsEppNLPage;
  counterSignatoryAddressAmendLicencePage: counterSignatoryAddressAmendLicencePage;
  counterSignatoryAddressNLPage: counterSignatoryAddressNLPage;
  counterSignatoryAddressRepPage: counterSignatoryAddressRepPage;
  counterSignatoryContactDetailsAmendLicencePage: counterSignatoryContactDetailsAmendLicencePage;
  counterSignatoryContactDetailsEppNLPage: counterSignatoryContactDetailsEppNLPage;
  counterSignatoryContactDetailsRepPage: counterSignatoryContactDetailsRepPage;
  counterSignatoryDetailsRepPage: counterSignatoryDetailsRepPage;
  counterSignatoryIdentityDocumentRepPage: counterSignatoryIdentityDocumentRepPage;
  counterSignatoryIdentityDocumentsAmendLicencePage: counterSignatoryIdentityDocumentsAmendLicencePage;
  counterSignatoryIdentityDocumentsEppNLPage: counterSignatoryIdentityDocumentsEppNLPage;
  crimeReportDetailsRepPage: crimeReportDetailsRepPage;
  criminalRecordSummaryEppNLPage: criminalRecordSummaryEppNLPage;
  criminalRecordWarningsEppNLPage: criminalRecordWarningsEppNLPage;
  dateOfBirthForLicencePage: dateOfBirthForLicencePage;
  declarationAmendLicencePage: declarationAmendLicencePage;
  declarationRepPage: declarationRepPage;
  dNPPoisonEppNLPage: dNPPoisonEppNLPage;
  doctorContactDetailsEppNLPage: doctorContactDetailsEppNLPage;
  enterYourLicenceNumberRepPage: enterYourLicenceNumberRepPage;
  enterYourLicenceNumberRLPage: enterYourLicenceNumberRLPage;
  ePDetailsRepPage: ePDetailsRepPage;
  explosivesPrecursorsAmendLicencePage: explosivesPrecursorsAmendLicencePage;
  explosivesPrecursorsSummaryRepPage: explosivesPrecursorsSummaryRepPage;
  explosivesPrecursorSummaryAmendLicencePage: explosivesPrecursorSummaryAmendLicencePage;
  explosivesPrecursorSummaryNLPage: explosivesPrecursorSummaryNLPage;
  haveAnyOfYourDetailsChangedRepPage: haveAnyOfYourDetailsChangedRepPage;
  haveYouReportedTheTheftRepPage: haveYouReportedTheTheftRepPage;
  homePageEppPage: homePageEppPage;
  licenceNumberPage: licenceNumberPage;
  medicalDeclarationEppNLPage: medicalDeclarationEppNLPage;
  namePageNLPage: namePageNLPage;
  newAppDeclarationEppNLPage: newAppDeclarationEppNLPage;
  otherLicencesEppNLPage: otherLicencesEppNLPage;
  otherNamesPageNLPage: otherNamesPageNLPage;
  otherNamesSummaryPageNLPage: otherNamesSummaryPageNLPage;
  otherNationalitiesEppNLPage: otherNationalitiesEppNLPage;
  poisonDetailsRepPage: poisonDetailsRepPage;
  poisonLicenceSummaryRepPage: poisonLicenceSummaryRepPage;
  poisonsAmendLicencePage: poisonsAmendLicencePage;
  poisonsOnLicenceSummaryNLPage: poisonsOnLicenceSummaryNLPage;
  previousAddressPageNLPage: previousAddressPageNLPage;
  refusedLicenceHistoryEppNLPage: refusedLicenceHistoryEppNLPage;
  regulatedEpNLPage: regulatedEpNLPage;
  regulatedExplosivesPrecursorsPage: regulatedExplosivesPrecursorsPage;
  regulatedPoisonsAmendLicencePage: regulatedPoisonsAmendLicencePage;
  regulatedPoisonsEppNLPage: regulatedPoisonsEppNLPage;
  regulatedPoisonsRepPage: regulatedPoisonsRepPage;
  summaryPreviousAddressLast5YearsEppNLPage: summaryPreviousAddressLast5YearsEppNLPage;
  uploadBritishPassportEppNLPage: uploadBritishPassportEppNLPage;
  uploadBritishPassportRepPage: uploadBritishPassportRepPage;
  uploadCertificateOfConductEppNLPage: uploadCertificateOfConductEppNLPage;
  uploadCertificateOfGoodConductRepPage: uploadCertificateOfGoodConductRepPage;
  uploadEUPassportEvidenceEppNLPage: uploadEUPassportEvidenceEppNLPage;
  uploadMedicalFormEppNLPage: uploadMedicalFormEppNLPage;
  uploadPassportRepPage: uploadPassportRepPage;
  uploadProofOfAddressAmendLicencePage: uploadProofOfAddressAmendLicencePage;
  uploadProofOfAddressEppNLPage: uploadProofOfAddressEppNLPage;
  uploadProofOfAddressRepPage: uploadProofOfAddressRepPage;
  uploadUKDrivingLicenceEvidenceEppNLPage: uploadUKDrivingLicenceEvidenceEppNLPage;
  uploadUKDrivingLicenceRepPage: uploadUKDrivingLicenceRepPage;
  whatAreYourContactDetailsAmendLicencePage: whatAreYourContactDetailsAmendLicencePage;
  whatAreYourContactDetailsNLPage: whatAreYourContactDetailsNLPage;
  whatAreYourContactDetailsRepPage: whatAreYourContactDetailsRepPage;
  whatIsHomeAddressPageNLPage: whatIsHomeAddressPageNLPage;
  whatIsNameOnLicencePage: whatIsNameOnLicencePage;
  whatIsYourDOBRepPage: whatIsYourDOBRepPage;
  whatIsYourHomeAddressAmendLicencePage: whatIsYourHomeAddressAmendLicencePage;
  whatIsYourHomeAddressRepPage: whatIsYourHomeAddressRepPage;
  whatIsYourNameOnTheLicenceRepPage: whatIsYourNameOnTheLicenceRepPage;
  whatIsYourNewAddressAmendLicencePage: whatIsYourNewAddressAmendLicencePage;
  whatIsYourNewAddressRepPage: whatIsYourNewAddressRepPage;
  whatIsYourNewNameAmendLicencePage: whatIsYourNewNameAmendLicencePage;
  whatIsYourNewNameRepPage: whatIsYourNewNameRepPage;
  whatTypeOfApplicationPage: whatTypeOfApplicationPage;
  whichIdentityDocumentDoYouUseRepPage: whichIdentityDocumentDoYouUseRepPage;
  whichIdentityDocUseEppNLPage: whichIdentityDocUseEppNLPage;
  whyDoYouNeedReplacementLicenceRepPage: whyDoYouNeedReplacementLicenceRepPage;
  youDoNotNeedToApplyForLicencePage: youDoNotNeedToApplyForLicencePage;
  yourDetailsPageNLPage: yourDetailsPageNLPage;
  yourMedicalHistoryEppNLPage: yourMedicalHistoryEppNLPage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    await use({
      addCriminalRecordEntryEppNLPage: new addCriminalRecordEntryEppNLPage(page),
      addRefusedRevokedLicenceEppNLPage: new addRefusedRevokedLicenceEppNLPage(page),
      amendEPOnLicenceRepPage: new amendEPOnLicenceRepPage(page),
      amendLicenceDetailsPage: new amendLicenceDetailsPage(page),
      amendLicenceDetailsRepPage: new amendLicenceDetailsRepPage(page),
      amendmentSubmittedPage: new amendmentSubmittedPage(page),
      ammoniumNitrateOrAbove16NitrogenNLPage: new ammoniumNitrateOrAbove16NitrogenNLPage(page),
      applicationSubmittedNewAppEppNLPage: new applicationSubmittedNewAppEppNLPage(page),
      changeInHomeAddressAmendLicencePage: new changeInHomeAddressAmendLicencePage(page),
      changeInHomeAddressRepPage: new changeInHomeAddressRepPage(page),
      changeInSubstanceAmendLicencePage: new changeInSubstanceAmendLicencePage(page),
      changeInSubstancesRepPage: new changeInSubstancesRepPage(page),
      checkYourAnswerAmendLicencePage: new checkYourAnswerAmendLicencePage(page),
      checkYourAnswerNewAppEppNLPage: new checkYourAnswerNewAppEppNLPage(page),
      checkYourAnswersRepPage: new checkYourAnswersRepPage(page),
      counterDetailsAmendLicencePage: new counterDetailsAmendLicencePage(page),
      counterDetailsEppNLPage: new counterDetailsEppNLPage(page),
      counterSignatoryAddressAmendLicencePage: new counterSignatoryAddressAmendLicencePage(page),
      counterSignatoryAddressNLPage: new counterSignatoryAddressNLPage(page),
      counterSignatoryAddressRepPage: new counterSignatoryAddressRepPage(page),
      counterSignatoryContactDetailsAmendLicencePage: new counterSignatoryContactDetailsAmendLicencePage(page),
      counterSignatoryContactDetailsEppNLPage: new counterSignatoryContactDetailsEppNLPage(page),
      counterSignatoryContactDetailsRepPage: new counterSignatoryContactDetailsRepPage(page),
      counterSignatoryDetailsRepPage: new counterSignatoryDetailsRepPage(page),
      counterSignatoryIdentityDocumentRepPage: new counterSignatoryIdentityDocumentRepPage(page),
      counterSignatoryIdentityDocumentsAmendLicencePage: new counterSignatoryIdentityDocumentsAmendLicencePage(page),
      counterSignatoryIdentityDocumentsEppNLPage: new counterSignatoryIdentityDocumentsEppNLPage(page),
      crimeReportDetailsRepPage: new crimeReportDetailsRepPage(page),
      criminalRecordSummaryEppNLPage: new criminalRecordSummaryEppNLPage(page),
      criminalRecordWarningsEppNLPage: new criminalRecordWarningsEppNLPage(page),
      dateOfBirthForLicencePage: new dateOfBirthForLicencePage(page),
      declarationAmendLicencePage: new declarationAmendLicencePage(page),
      declarationRepPage: new declarationRepPage(page),
      dNPPoisonEppNLPage: new dNPPoisonEppNLPage(page),
      doctorContactDetailsEppNLPage: new doctorContactDetailsEppNLPage(page),
      enterYourLicenceNumberRepPage: new enterYourLicenceNumberRepPage(page),
      enterYourLicenceNumberRLPage: new enterYourLicenceNumberRLPage(page),
      ePDetailsRepPage: new ePDetailsRepPage(page),
      explosivesPrecursorsAmendLicencePage: new explosivesPrecursorsAmendLicencePage(page),
      explosivesPrecursorsSummaryRepPage: new explosivesPrecursorsSummaryRepPage(page),
      explosivesPrecursorSummaryAmendLicencePage: new explosivesPrecursorSummaryAmendLicencePage(page),
      explosivesPrecursorSummaryNLPage: new explosivesPrecursorSummaryNLPage(page),
      haveAnyOfYourDetailsChangedRepPage: new haveAnyOfYourDetailsChangedRepPage(page),
      haveYouReportedTheTheftRepPage: new haveYouReportedTheTheftRepPage(page),
      homePageEppPage: new homePageEppPage(page),
      licenceNumberPage: new licenceNumberPage(page),
      medicalDeclarationEppNLPage: new medicalDeclarationEppNLPage(page),
      namePageNLPage: new namePageNLPage(page),
      newAppDeclarationEppNLPage: new newAppDeclarationEppNLPage(page),
      otherLicencesEppNLPage: new otherLicencesEppNLPage(page),
      otherNamesPageNLPage: new otherNamesPageNLPage(page),
      otherNamesSummaryPageNLPage: new otherNamesSummaryPageNLPage(page),
      otherNationalitiesEppNLPage: new otherNationalitiesEppNLPage(page),
      poisonDetailsRepPage: new poisonDetailsRepPage(page),
      poisonLicenceSummaryRepPage: new poisonLicenceSummaryRepPage(page),
      poisonsAmendLicencePage: new poisonsAmendLicencePage(page),
      poisonsOnLicenceSummaryNLPage: new poisonsOnLicenceSummaryNLPage(page),
      previousAddressPageNLPage: new previousAddressPageNLPage(page),
      refusedLicenceHistoryEppNLPage: new refusedLicenceHistoryEppNLPage(page),
      regulatedEpNLPage: new regulatedEpNLPage(page),
      regulatedExplosivesPrecursorsPage: new regulatedExplosivesPrecursorsPage(page),
      regulatedPoisonsAmendLicencePage: new regulatedPoisonsAmendLicencePage(page),
      regulatedPoisonsEppNLPage: new regulatedPoisonsEppNLPage(page),
      regulatedPoisonsRepPage: new regulatedPoisonsRepPage(page),
      summaryPreviousAddressLast5YearsEppNLPage: new summaryPreviousAddressLast5YearsEppNLPage(page),
      uploadBritishPassportEppNLPage: new uploadBritishPassportEppNLPage(page),
      uploadBritishPassportRepPage: new uploadBritishPassportRepPage(page),
      uploadCertificateOfConductEppNLPage: new uploadCertificateOfConductEppNLPage(page),
      uploadCertificateOfGoodConductRepPage: new uploadCertificateOfGoodConductRepPage(page),
      uploadEUPassportEvidenceEppNLPage: new uploadEUPassportEvidenceEppNLPage(page),
      uploadMedicalFormEppNLPage: new uploadMedicalFormEppNLPage(page),
      uploadPassportRepPage: new uploadPassportRepPage(page),
      uploadProofOfAddressAmendLicencePage: new uploadProofOfAddressAmendLicencePage(page),
      uploadProofOfAddressEppNLPage: new uploadProofOfAddressEppNLPage(page),
      uploadProofOfAddressRepPage: new uploadProofOfAddressRepPage(page),
      uploadUKDrivingLicenceEvidenceEppNLPage: new uploadUKDrivingLicenceEvidenceEppNLPage(page),
      uploadUKDrivingLicenceRepPage: new uploadUKDrivingLicenceRepPage(page),
      whatAreYourContactDetailsAmendLicencePage: new whatAreYourContactDetailsAmendLicencePage(page),
      whatAreYourContactDetailsNLPage: new whatAreYourContactDetailsNLPage(page),
      whatAreYourContactDetailsRepPage: new whatAreYourContactDetailsRepPage(page),
      whatIsHomeAddressPageNLPage: new whatIsHomeAddressPageNLPage(page),
      whatIsNameOnLicencePage: new whatIsNameOnLicencePage(page),
      whatIsYourDOBRepPage: new whatIsYourDOBRepPage(page),
      whatIsYourHomeAddressAmendLicencePage: new whatIsYourHomeAddressAmendLicencePage(page),
      whatIsYourHomeAddressRepPage: new whatIsYourHomeAddressRepPage(page),
      whatIsYourNameOnTheLicenceRepPage: new whatIsYourNameOnTheLicenceRepPage(page),
      whatIsYourNewAddressAmendLicencePage: new whatIsYourNewAddressAmendLicencePage(page),
      whatIsYourNewAddressRepPage: new whatIsYourNewAddressRepPage(page),
      whatIsYourNewNameAmendLicencePage: new whatIsYourNewNameAmendLicencePage(page),
      whatIsYourNewNameRepPage: new whatIsYourNewNameRepPage(page),
      whatTypeOfApplicationPage: new whatTypeOfApplicationPage(page),
      whichIdentityDocumentDoYouUseRepPage: new whichIdentityDocumentDoYouUseRepPage(page),
      whichIdentityDocUseEppNLPage: new whichIdentityDocUseEppNLPage(page),
      whyDoYouNeedReplacementLicenceRepPage: new whyDoYouNeedReplacementLicenceRepPage(page),
      youDoNotNeedToApplyForLicencePage: new youDoNotNeedToApplyForLicencePage(page),
      yourDetailsPageNLPage: new yourDetailsPageNLPage(page),
      yourMedicalHistoryEppNLPage: new yourMedicalHistoryEppNLPage(page),
    });
  },
});

export const expect = test.expect;
