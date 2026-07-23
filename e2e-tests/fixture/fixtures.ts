import { test as base } from 'playwright-bdd';
import { AddCriminalRecordEntryEppNLPage } from '../pages/add-criminal-record-entry-epp-nl';
import { AddRefusedRevokedLicenceEppNLPage } from '../pages/add-refused-revoked-licence-epp-nl';
import { AmendEPOnLicenceRepPage } from '../pages/amend-epon-licence-rep';
import { AmendLicenceDetailsPage } from '../pages/amend-licence-details';
import { AmendLicenceDetailsRepPage } from '../pages/amend-licence-details-rep';
import { AmendmentSubmittedPage } from '../pages/amendment-submitted';
import { AmmoniumNitrateOrAbove16NitrogenNLPage } from '../pages/ammonium-nitrate-or-above16-nitrogen-nl';
import { ApplicationSubmittedNewAppEppNLPage } from '../pages/application-submitted-new-app-epp-nl';
import { ChangeInHomeAddressAmendLicencePage } from '../pages/change-in-home-address-amend-licence';
import { ChangeInHomeAddressRepPage } from '../pages/change-in-home-address-rep';
import { ChangeInSubstanceAmendLicencePage } from '../pages/change-in-substance-amend-licence';
import { ChangeInSubstancesRepPage } from '../pages/change-in-substances-rep';
import { CheckYourAnswerAmendLicencePage } from '../pages/check-your-answer-amend-licence';
import { CheckYourAnswerNewAppEppNLPage } from '../pages/check-your-answer-new-app-epp-nl';
import { CheckYourAnswersRepPage } from '../pages/check-your-answers-rep';
import { CounterDetailsAmendLicencePage } from '../pages/counter-details-amend-licence';
import { CounterDetailsEppNLPage } from '../pages/counter-details-epp-nl';
import { CounterSignatoryAddressAmendLicencePage } from '../pages/counter-signatory-address-amend-licence';
import { CounterSignatoryAddressNLPage } from '../pages/counter-signatory-address-nl';
import { CounterSignatoryAddressRepPage } from '../pages/counter-signatory-address-rep';
import { CounterSignatoryContactDetailsAmendLicencePage } from '../pages/counter-signatory-contact-details-amend-licence';
import { CounterSignatoryContactDetailsEppNLPage } from '../pages/counter-signatory-contact-details-epp-nl';
import { CounterSignatoryContactDetailsRepPage } from '../pages/counter-signatory-contact-details-rep';
import { CounterSignatoryDetailsRepPage } from '../pages/counter-signatory-details-rep';
import { CounterSignatoryIdentityDocumentRepPage } from '../pages/counter-signatory-identity-document-rep';
import { CounterSignatoryIdentityDocumentsAmendLicencePage } from '../pages/counter-signatory-identity-documents-amend-licence';
import { CounterSignatoryIdentityDocumentsEppNLPage } from '../pages/counter-signatory-identity-documents-epp-nl';
import { CrimeReportDetailsRepPage } from '../pages/crime-report-details-rep';
import { CriminalRecordSummaryEppNLPage } from '../pages/criminal-record-summary-epp-nl';
import { CriminalRecordWarningsEppNLPage } from '../pages/criminal-record-warnings-epp-nl';
import { DateOfBirthForLicencePage } from '../pages/date-of-birth-for-licence';
import { DeclarationAmendLicencePage } from '../pages/declaration-amend-licence';
import { DeclarationRepPage } from '../pages/declaration-rep';
import { DNPPoisonEppNLPage } from '../pages/dnppoison-epp-nl';
import { DoctorContactDetailsEppNLPage } from '../pages/doctor-contact-details-epp-nl';
import { EnterYourLicenceNumberRepPage } from '../pages/enter-your-licence-number-rep';
import { EnterYourLicenceNumberRLPage } from '../pages/enter-your-licence-number-rl';
import { EPDetailsRepPage } from '../pages/epdetails-rep';
import { ExplosivesPrecursorsAmendLicencePage } from '../pages/explosives-precursors-amend-licence';
import { ExplosivesPrecursorsSummaryRepPage } from '../pages/explosives-precursors-summary-rep';
import { ExplosivesPrecursorSummaryAmendLicencePage } from '../pages/explosives-precursor-summary-amend-licence';
import { ExplosivesPrecursorSummaryNLPage } from '../pages/explosives-precursor-summary-nl';
import { HaveAnyOfYourDetailsChangedRepPage } from '../pages/have-any-of-your-details-changed-rep';
import { HaveYouReportedTheTheftRepPage } from '../pages/have-you-reported-the-theft-rep';
import { HomePageEppPage } from '../pages/home-page-epp';
import { LicenceNumberPage } from '../pages/licence-number';
import { MedicalDeclarationEppNLPage } from '../pages/medical-declaration-epp-nl';
import { NamePageNLPage } from '../pages/name-page-nl';
import { NewAppDeclarationEppNLPage } from '../pages/new-app-declaration-epp-nl';
import { OtherLicencesEppNLPage } from '../pages/other-licences-epp-nl';
import { OtherNamesPageNLPage } from '../pages/other-names-page-nl';
import { OtherNamesSummaryPageNLPage } from '../pages/other-names-summary-page-nl';
import { OtherNationalitiesEppNLPage } from '../pages/other-nationalities-epp-nl';
import { PoisonDetailsRepPage } from '../pages/poison-details-rep';
import { PoisonLicenceSummaryRepPage } from '../pages/poison-licence-summary-rep';
import { PoisonsAmendLicencePage } from '../pages/poisons-amend-licence';
import { PoisonsOnLicenceSummaryNLPage } from '../pages/poisons-on-licence-summary-nl';
import { PreviousAddressPageNLPage } from '../pages/previous-address-page-nl';
import { RefusedLicenceHistoryEppNLPage } from '../pages/refused-licence-history-epp-nl';
import { RegulatedEpNLPage } from '../pages/regulated-ep-nl';
import { RegulatedExplosivesPrecursorsPage } from '../pages/regulated-explosives-precursors';
import { RegulatedPoisonsAmendLicencePage } from '../pages/regulated-poisons-amend-licence';
import { RegulatedPoisonsEppNLPage } from '../pages/regulated-poisons-epp-nl';
import { RegulatedPoisonsRepPage } from '../pages/regulated-poisons-rep';
import { SummaryPreviousAddressLast5YearsEppNLPage } from '../pages/summary-previous-address-last5-years-epp-nl';
import { UploadBritishPassportEppNLPage } from '../pages/upload-british-passport-epp-nl';
import { UploadBritishPassportRepPage } from '../pages/upload-british-passport-rep';
import { UploadCertificateOfConductEppNLPage } from '../pages/upload-certificate-of-conduct-epp-nl';
import { UploadCertificateOfGoodConductRepPage } from '../pages/upload-certificate-of-good-conduct-rep';
import { UploadEUPassportEvidenceEppNLPage } from '../pages/upload-eupassport-evidence-epp-nl';
import { UploadMedicalFormEppNLPage } from '../pages/upload-medical-form-epp-nl';
import { UploadPassportRepPage } from '../pages/upload-passport-rep';
import { UploadProofOfAddressAmendLicencePage } from '../pages/upload-proof-of-address-amend-licence';
import { UploadProofOfAddressEppNLPage } from '../pages/upload-proof-of-address-epp-nl';
import { UploadProofOfAddressRepPage } from '../pages/upload-proof-of-address-rep';
import { UploadUKDrivingLicenceEvidenceEppNLPage } from '../pages/upload-ukdriving-licence-evidence-epp-nl';
import { UploadUKDrivingLicenceRepPage } from '../pages/upload-ukdriving-licence-rep';
import { WhatAreYourContactDetailsAmendLicencePage } from '../pages/what-are-your-contact-details-amend-licence';
import { WhatAreYourContactDetailsNLPage } from '../pages/what-are-your-contact-details-nl';
import { WhatAreYourContactDetailsRepPage } from '../pages/what-are-your-contact-details-rep';
import { WhatIsHomeAddressPageNLPage } from '../pages/what-is-home-address-page-nl';
import { WhatIsNameOnLicencePage } from '../pages/what-is-name-on-licence';
import { WhatIsYourDOBRepPage } from '../pages/what-is-your-dobrep';
import { WhatIsYourHomeAddressAmendLicencePage } from '../pages/what-is-your-home-address-amend-licence';
import { WhatIsYourHomeAddressRepPage } from '../pages/what-is-your-home-address-rep';
import { WhatIsYourNameOnTheLicenceRepPage } from '../pages/what-is-your-name-on-the-licence-rep';
import { WhatIsYourNewAddressAmendLicencePage } from '../pages/what-is-your-new-address-amend-licence';
import { WhatIsYourNewAddressRepPage } from '../pages/what-is-your-new-address-rep';
import { WhatIsYourNewNameAmendLicencePage } from '../pages/what-is-your-new-name-amend-licence';
import { WhatIsYourNewNameRepPage } from '../pages/what-is-your-new-name-rep';
import { WhatTypeOfApplicationPage } from '../pages/what-type-of-application';
import { WhichIdentityDocumentDoYouUseRepPage } from '../pages/which-identity-document-do-you-use-rep';
import { WhichIdentityDocUseEppNLPage } from '../pages/which-identity-doc-use-epp-nl';
import { WhyDoYouNeedReplacementLicenceRepPage } from '../pages/why-do-you-need-replacement-licence-rep';
import { YouDoNotNeedToApplyForLicencePage } from '../pages/you-do-not-need-to-apply-for-licence';
import { YourDetailsPageNLPage } from '../pages/your-details-page-nl';
import { YourMedicalHistoryEppNLPage } from '../pages/your-medical-history-epp-nl';

export type Pages = {
  addCriminalRecordEntryEppNLPage: AddCriminalRecordEntryEppNLPage;
  addRefusedRevokedLicenceEppNLPage: AddRefusedRevokedLicenceEppNLPage;
  amendEPOnLicenceRepPage: AmendEPOnLicenceRepPage;
  amendLicenceDetailsPage: AmendLicenceDetailsPage;
  amendLicenceDetailsRepPage: AmendLicenceDetailsRepPage;
  amendmentSubmittedPage: AmendmentSubmittedPage;
  ammoniumNitrateOrAbove16NitrogenNLPage: AmmoniumNitrateOrAbove16NitrogenNLPage;
  applicationSubmittedNewAppEppNLPage: ApplicationSubmittedNewAppEppNLPage;
  changeInHomeAddressAmendLicencePage: ChangeInHomeAddressAmendLicencePage;
  changeInHomeAddressRepPage: ChangeInHomeAddressRepPage;
  changeInSubstanceAmendLicencePage: ChangeInSubstanceAmendLicencePage;
  changeInSubstancesRepPage: ChangeInSubstancesRepPage;
  checkYourAnswerAmendLicencePage: CheckYourAnswerAmendLicencePage;
  checkYourAnswerNewAppEppNLPage: CheckYourAnswerNewAppEppNLPage;
  checkYourAnswersRepPage: CheckYourAnswersRepPage;
  counterDetailsAmendLicencePage: CounterDetailsAmendLicencePage;
  counterDetailsEppNLPage: CounterDetailsEppNLPage;
  counterSignatoryAddressAmendLicencePage: CounterSignatoryAddressAmendLicencePage;
  counterSignatoryAddressNLPage: CounterSignatoryAddressNLPage;
  counterSignatoryAddressRepPage: CounterSignatoryAddressRepPage;
  counterSignatoryContactDetailsAmendLicencePage: CounterSignatoryContactDetailsAmendLicencePage;
  counterSignatoryContactDetailsEppNLPage: CounterSignatoryContactDetailsEppNLPage;
  counterSignatoryContactDetailsRepPage: CounterSignatoryContactDetailsRepPage;
  counterSignatoryDetailsRepPage: CounterSignatoryDetailsRepPage;
  counterSignatoryIdentityDocumentRepPage: CounterSignatoryIdentityDocumentRepPage;
  counterSignatoryIdentityDocumentsAmendLicencePage: CounterSignatoryIdentityDocumentsAmendLicencePage;
  counterSignatoryIdentityDocumentsEppNLPage: CounterSignatoryIdentityDocumentsEppNLPage;
  crimeReportDetailsRepPage: CrimeReportDetailsRepPage;
  criminalRecordSummaryEppNLPage: CriminalRecordSummaryEppNLPage;
  criminalRecordWarningsEppNLPage: CriminalRecordWarningsEppNLPage;
  dateOfBirthForLicencePage: DateOfBirthForLicencePage;
  declarationAmendLicencePage: DeclarationAmendLicencePage;
  declarationRepPage: DeclarationRepPage;
  dNPPoisonEppNLPage: DNPPoisonEppNLPage;
  doctorContactDetailsEppNLPage: DoctorContactDetailsEppNLPage;
  enterYourLicenceNumberRepPage: EnterYourLicenceNumberRepPage;
  enterYourLicenceNumberRLPage: EnterYourLicenceNumberRLPage;
  ePDetailsRepPage: EPDetailsRepPage;
  explosivesPrecursorsAmendLicencePage: ExplosivesPrecursorsAmendLicencePage;
  explosivesPrecursorsSummaryRepPage: ExplosivesPrecursorsSummaryRepPage;
  explosivesPrecursorSummaryAmendLicencePage: ExplosivesPrecursorSummaryAmendLicencePage;
  explosivesPrecursorSummaryNLPage: ExplosivesPrecursorSummaryNLPage;
  haveAnyOfYourDetailsChangedRepPage: HaveAnyOfYourDetailsChangedRepPage;
  haveYouReportedTheTheftRepPage: HaveYouReportedTheTheftRepPage;
  homePageEppPage: HomePageEppPage;
  licenceNumberPage: LicenceNumberPage;
  medicalDeclarationEppNLPage: MedicalDeclarationEppNLPage;
  namePageNLPage: NamePageNLPage;
  newAppDeclarationEppNLPage: NewAppDeclarationEppNLPage;
  otherLicencesEppNLPage: OtherLicencesEppNLPage;
  otherNamesPageNLPage: OtherNamesPageNLPage;
  otherNamesSummaryPageNLPage: OtherNamesSummaryPageNLPage;
  otherNationalitiesEppNLPage: OtherNationalitiesEppNLPage;
  poisonDetailsRepPage: PoisonDetailsRepPage;
  poisonLicenceSummaryRepPage: PoisonLicenceSummaryRepPage;
  poisonsAmendLicencePage: PoisonsAmendLicencePage;
  poisonsOnLicenceSummaryNLPage: PoisonsOnLicenceSummaryNLPage;
  previousAddressPageNLPage: PreviousAddressPageNLPage;
  refusedLicenceHistoryEppNLPage: RefusedLicenceHistoryEppNLPage;
  regulatedEpNLPage: RegulatedEpNLPage;
  regulatedExplosivesPrecursorsPage: RegulatedExplosivesPrecursorsPage;
  regulatedPoisonsAmendLicencePage: RegulatedPoisonsAmendLicencePage;
  regulatedPoisonsEppNLPage: RegulatedPoisonsEppNLPage;
  regulatedPoisonsRepPage: RegulatedPoisonsRepPage;
  summaryPreviousAddressLast5YearsEppNLPage: SummaryPreviousAddressLast5YearsEppNLPage;
  uploadBritishPassportEppNLPage: UploadBritishPassportEppNLPage;
  uploadBritishPassportRepPage: UploadBritishPassportRepPage;
  uploadCertificateOfConductEppNLPage: UploadCertificateOfConductEppNLPage;
  uploadCertificateOfGoodConductRepPage: UploadCertificateOfGoodConductRepPage;
  uploadEUPassportEvidenceEppNLPage: UploadEUPassportEvidenceEppNLPage;
  uploadMedicalFormEppNLPage: UploadMedicalFormEppNLPage;
  uploadPassportRepPage: UploadPassportRepPage;
  uploadProofOfAddressAmendLicencePage: UploadProofOfAddressAmendLicencePage;
  uploadProofOfAddressEppNLPage: UploadProofOfAddressEppNLPage;
  uploadProofOfAddressRepPage: UploadProofOfAddressRepPage;
  uploadUKDrivingLicenceEvidenceEppNLPage: UploadUKDrivingLicenceEvidenceEppNLPage;
  uploadUKDrivingLicenceRepPage: UploadUKDrivingLicenceRepPage;
  whatAreYourContactDetailsAmendLicencePage: WhatAreYourContactDetailsAmendLicencePage;
  whatAreYourContactDetailsNLPage: WhatAreYourContactDetailsNLPage;
  whatAreYourContactDetailsRepPage: WhatAreYourContactDetailsRepPage;
  whatIsHomeAddressPageNLPage: WhatIsHomeAddressPageNLPage;
  whatIsNameOnLicencePage: WhatIsNameOnLicencePage;
  whatIsYourDOBRepPage: WhatIsYourDOBRepPage;
  whatIsYourHomeAddressAmendLicencePage: WhatIsYourHomeAddressAmendLicencePage;
  whatIsYourHomeAddressRepPage: WhatIsYourHomeAddressRepPage;
  whatIsYourNameOnTheLicenceRepPage: WhatIsYourNameOnTheLicenceRepPage;
  whatIsYourNewAddressAmendLicencePage: WhatIsYourNewAddressAmendLicencePage;
  whatIsYourNewAddressRepPage: WhatIsYourNewAddressRepPage;
  whatIsYourNewNameAmendLicencePage: WhatIsYourNewNameAmendLicencePage;
  whatIsYourNewNameRepPage: WhatIsYourNewNameRepPage;
  whatTypeOfApplicationPage: WhatTypeOfApplicationPage;
  whichIdentityDocumentDoYouUseRepPage: WhichIdentityDocumentDoYouUseRepPage;
  whichIdentityDocUseEppNLPage: WhichIdentityDocUseEppNLPage;
  whyDoYouNeedReplacementLicenceRepPage: WhyDoYouNeedReplacementLicenceRepPage;
  youDoNotNeedToApplyForLicencePage: YouDoNotNeedToApplyForLicencePage;
  yourDetailsPageNLPage: YourDetailsPageNLPage;
  yourMedicalHistoryEppNLPage: YourMedicalHistoryEppNLPage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    await use({
      addCriminalRecordEntryEppNLPage: new AddCriminalRecordEntryEppNLPage(page),
      addRefusedRevokedLicenceEppNLPage: new AddRefusedRevokedLicenceEppNLPage(page),
      amendEPOnLicenceRepPage: new AmendEPOnLicenceRepPage(page),
      amendLicenceDetailsPage: new AmendLicenceDetailsPage(page),
      amendLicenceDetailsRepPage: new AmendLicenceDetailsRepPage(page),
      amendmentSubmittedPage: new AmendmentSubmittedPage(page),
      ammoniumNitrateOrAbove16NitrogenNLPage: new AmmoniumNitrateOrAbove16NitrogenNLPage(page),
      applicationSubmittedNewAppEppNLPage: new ApplicationSubmittedNewAppEppNLPage(page),
      changeInHomeAddressAmendLicencePage: new ChangeInHomeAddressAmendLicencePage(page),
      changeInHomeAddressRepPage: new ChangeInHomeAddressRepPage(page),
      changeInSubstanceAmendLicencePage: new ChangeInSubstanceAmendLicencePage(page),
      changeInSubstancesRepPage: new ChangeInSubstancesRepPage(page),
      checkYourAnswerAmendLicencePage: new CheckYourAnswerAmendLicencePage(page),
      checkYourAnswerNewAppEppNLPage: new CheckYourAnswerNewAppEppNLPage(page),
      checkYourAnswersRepPage: new CheckYourAnswersRepPage(page),
      counterDetailsAmendLicencePage: new CounterDetailsAmendLicencePage(page),
      counterDetailsEppNLPage: new CounterDetailsEppNLPage(page),
      counterSignatoryAddressAmendLicencePage: new CounterSignatoryAddressAmendLicencePage(page),
      counterSignatoryAddressNLPage: new CounterSignatoryAddressNLPage(page),
      counterSignatoryAddressRepPage: new CounterSignatoryAddressRepPage(page),
      counterSignatoryContactDetailsAmendLicencePage: new CounterSignatoryContactDetailsAmendLicencePage(page),
      counterSignatoryContactDetailsEppNLPage: new CounterSignatoryContactDetailsEppNLPage(page),
      counterSignatoryContactDetailsRepPage: new CounterSignatoryContactDetailsRepPage(page),
      counterSignatoryDetailsRepPage: new CounterSignatoryDetailsRepPage(page),
      counterSignatoryIdentityDocumentRepPage: new CounterSignatoryIdentityDocumentRepPage(page),
      counterSignatoryIdentityDocumentsAmendLicencePage: new CounterSignatoryIdentityDocumentsAmendLicencePage(page),
      counterSignatoryIdentityDocumentsEppNLPage: new CounterSignatoryIdentityDocumentsEppNLPage(page),
      crimeReportDetailsRepPage: new CrimeReportDetailsRepPage(page),
      criminalRecordSummaryEppNLPage: new CriminalRecordSummaryEppNLPage(page),
      criminalRecordWarningsEppNLPage: new CriminalRecordWarningsEppNLPage(page),
      dateOfBirthForLicencePage: new DateOfBirthForLicencePage(page),
      declarationAmendLicencePage: new DeclarationAmendLicencePage(page),
      declarationRepPage: new DeclarationRepPage(page),
      dNPPoisonEppNLPage: new DNPPoisonEppNLPage(page),
      doctorContactDetailsEppNLPage: new DoctorContactDetailsEppNLPage(page),
      enterYourLicenceNumberRepPage: new EnterYourLicenceNumberRepPage(page),
      enterYourLicenceNumberRLPage: new EnterYourLicenceNumberRLPage(page),
      ePDetailsRepPage: new EPDetailsRepPage(page),
      explosivesPrecursorsAmendLicencePage: new ExplosivesPrecursorsAmendLicencePage(page),
      explosivesPrecursorsSummaryRepPage: new ExplosivesPrecursorsSummaryRepPage(page),
      explosivesPrecursorSummaryAmendLicencePage: new ExplosivesPrecursorSummaryAmendLicencePage(page),
      explosivesPrecursorSummaryNLPage: new ExplosivesPrecursorSummaryNLPage(page),
      haveAnyOfYourDetailsChangedRepPage: new HaveAnyOfYourDetailsChangedRepPage(page),
      haveYouReportedTheTheftRepPage: new HaveYouReportedTheTheftRepPage(page),
      homePageEppPage: new HomePageEppPage(page),
      licenceNumberPage: new LicenceNumberPage(page),
      medicalDeclarationEppNLPage: new MedicalDeclarationEppNLPage(page),
      namePageNLPage: new NamePageNLPage(page),
      newAppDeclarationEppNLPage: new NewAppDeclarationEppNLPage(page),
      otherLicencesEppNLPage: new OtherLicencesEppNLPage(page),
      otherNamesPageNLPage: new OtherNamesPageNLPage(page),
      otherNamesSummaryPageNLPage: new OtherNamesSummaryPageNLPage(page),
      otherNationalitiesEppNLPage: new OtherNationalitiesEppNLPage(page),
      poisonDetailsRepPage: new PoisonDetailsRepPage(page),
      poisonLicenceSummaryRepPage: new PoisonLicenceSummaryRepPage(page),
      poisonsAmendLicencePage: new PoisonsAmendLicencePage(page),
      poisonsOnLicenceSummaryNLPage: new PoisonsOnLicenceSummaryNLPage(page),
      previousAddressPageNLPage: new PreviousAddressPageNLPage(page),
      refusedLicenceHistoryEppNLPage: new RefusedLicenceHistoryEppNLPage(page),
      regulatedEpNLPage: new RegulatedEpNLPage(page),
      regulatedExplosivesPrecursorsPage: new RegulatedExplosivesPrecursorsPage(page),
      regulatedPoisonsAmendLicencePage: new RegulatedPoisonsAmendLicencePage(page),
      regulatedPoisonsEppNLPage: new RegulatedPoisonsEppNLPage(page),
      regulatedPoisonsRepPage: new RegulatedPoisonsRepPage(page),
      summaryPreviousAddressLast5YearsEppNLPage: new SummaryPreviousAddressLast5YearsEppNLPage(page),
      uploadBritishPassportEppNLPage: new UploadBritishPassportEppNLPage(page),
      uploadBritishPassportRepPage: new UploadBritishPassportRepPage(page),
      uploadCertificateOfConductEppNLPage: new UploadCertificateOfConductEppNLPage(page),
      uploadCertificateOfGoodConductRepPage: new UploadCertificateOfGoodConductRepPage(page),
      uploadEUPassportEvidenceEppNLPage: new UploadEUPassportEvidenceEppNLPage(page),
      uploadMedicalFormEppNLPage: new UploadMedicalFormEppNLPage(page),
      uploadPassportRepPage: new UploadPassportRepPage(page),
      uploadProofOfAddressAmendLicencePage: new UploadProofOfAddressAmendLicencePage(page),
      uploadProofOfAddressEppNLPage: new UploadProofOfAddressEppNLPage(page),
      uploadProofOfAddressRepPage: new UploadProofOfAddressRepPage(page),
      uploadUKDrivingLicenceEvidenceEppNLPage: new UploadUKDrivingLicenceEvidenceEppNLPage(page),
      uploadUKDrivingLicenceRepPage: new UploadUKDrivingLicenceRepPage(page),
      whatAreYourContactDetailsAmendLicencePage: new WhatAreYourContactDetailsAmendLicencePage(page),
      whatAreYourContactDetailsNLPage: new WhatAreYourContactDetailsNLPage(page),
      whatAreYourContactDetailsRepPage: new WhatAreYourContactDetailsRepPage(page),
      whatIsHomeAddressPageNLPage: new WhatIsHomeAddressPageNLPage(page),
      whatIsNameOnLicencePage: new WhatIsNameOnLicencePage(page),
      whatIsYourDOBRepPage: new WhatIsYourDOBRepPage(page),
      whatIsYourHomeAddressAmendLicencePage: new WhatIsYourHomeAddressAmendLicencePage(page),
      whatIsYourHomeAddressRepPage: new WhatIsYourHomeAddressRepPage(page),
      whatIsYourNameOnTheLicenceRepPage: new WhatIsYourNameOnTheLicenceRepPage(page),
      whatIsYourNewAddressAmendLicencePage: new WhatIsYourNewAddressAmendLicencePage(page),
      whatIsYourNewAddressRepPage: new WhatIsYourNewAddressRepPage(page),
      whatIsYourNewNameAmendLicencePage: new WhatIsYourNewNameAmendLicencePage(page),
      whatIsYourNewNameRepPage: new WhatIsYourNewNameRepPage(page),
      whatTypeOfApplicationPage: new WhatTypeOfApplicationPage(page),
      whichIdentityDocumentDoYouUseRepPage: new WhichIdentityDocumentDoYouUseRepPage(page),
      whichIdentityDocUseEppNLPage: new WhichIdentityDocUseEppNLPage(page),
      whyDoYouNeedReplacementLicenceRepPage: new WhyDoYouNeedReplacementLicenceRepPage(page),
      youDoNotNeedToApplyForLicencePage: new YouDoNotNeedToApplyForLicencePage(page),
      yourDetailsPageNLPage: new YourDetailsPageNLPage(page),
      yourMedicalHistoryEppNLPage: new YourMedicalHistoryEppNLPage(page),
    });
  },
});

export const expect = test.expect;

