import { expect, type Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test, type Pages } from '../fixture/fixtures';
import { EppScenarioData, getEppScenarioData } from '../utility-helper/epp-scenario-data';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export const { Given, When, Then } = createBdd(test);

let scenarioData: EppScenarioData;

Given('Test data has been created for {string} scenarios', async ({ }, product: string) => {
  if (product !== 'EPP') {
    throw new Error(`Unsupported product data setup: ${product}`);
  }
});

Given('I selected the data for scenario {string} - {string}', async ({ }, scenarioId: string, _description: string) => {
  scenarioData = getEppScenarioData(scenarioId);
});

When('I visit the EPP page and access application link', async ({ pages }) => {
  await pages.homePageEppPage.openEPPPage();
  const title = await pages.whatTypeOfApplicationPage.expectedPageTitle();
  await expect(pages.whatTypeOfApplicationPage.page).toHaveTitle(title + ' – GOV.UK');

  if (scenarioData.applicationType === 'Apply for a new licence') {
    await pages.whatTypeOfApplicationPage.clickApplyNewLicence();
    return;
  }

  if (scenarioData.applicationType === 'Amend a licence') {
    await pages.whatTypeOfApplicationPage.clickAmendLicence();
    return;
  }

  if (scenarioData.applicationType === 'Renew a licence') {
    await pages.whatTypeOfApplicationPage.clickRenewApplication();
    return;
  }

  await pages.whatTypeOfApplicationPage.clickReplaceApplication();
  await answerWhyDoYouNeedRepLicence(pages);
  await replaceCommonQuestions(pages);
});

When('I fill out my answers for new application form', async ({ pages }) => {
  await applyForNewLicenceRouteAnswer(pages);
});

When('I fill out my answers for new application form e2e', async ({ pages }) => {
  await applyForNewLicenceRouteAnswer(pages);
  await pages.newAppDeclarationEppNLPage.clickCheckBoxNewApp();
});

When('I complete new application form with all answers set to no and submit the form', async ({ pages }) => {
  await applyForNewLicenceRouteNoToAllQuestions(pages);
});

When('I complete renew application form with all answers set to no and submit the form', async ({ pages }) => {
  await renewMyApplicationAnswerNoToAllQuestionsRoute(pages);
});

Then('I see page that says you don\'t need to apply for new licence', async ({ pages }) => {
  const title = await pages.applicationSubmittedNewAppEppNLPage.expectedPageTitle();
  await expect(pages.applicationSubmittedNewAppEppNLPage.page).toHaveTitle(title + ' – GOV.UK');
});

Then('I see page that says you don\'t need to apply for renew licence', async ({ pages }) => {
  const title = await pages.youDoNotNeedToApplyForLicencePage.expectedPageTitle();
  await expect(pages.youDoNotNeedToApplyForLicencePage.page).toHaveTitle(title + ' – GOV.UK');
});

When('I fill out my answers for renew application form', async ({ pages }) => {
  await renewMyApplicationRoute(pages);
});

When('I fill out my answers for amend application form', async ({ pages }) => {
  await amendLicenceRoute(pages);
});

Then('I am able to see Amendment form submitted page', async ({ pages }) => {
  const title = await pages.amendmentSubmittedPage.expectedPageTitle();
  await expect(pages.amendmentSubmittedPage.page).toHaveTitle(title + ' – GOV.UK');
});

When('I fill out my answers for licence was stolen on replace application form', async ({ pages }) => {
  await licenceStolenReplaceRoute(pages);
});

When('I fill out the answer for licence is lost on replace application form', async ({ pages }) => {
  await licenceIsLostReplaceRoute(pages);
});

When('I fill out the answer for licence is damaged on replace application form', async ({ pages }) => {
  await licenceIsDamagedReplaceRoute(pages);
});

Then('I am navigated to {string} page', async ({ page }, pageName: string) => {
  await expect(page.locator('h1').first()).toContainText(pageName);
});

Then('I should see {string} page', async ({ page }, pageName: string) => {
  await expect(page.locator('h1').first()).toContainText(pageName);
});

async function applyForNewLicenceRouteNoToAllQuestions(pages: Pages) {
  await pages.namePageNLPage.answerNameDetails(c.TITLE_MR, c.APPLICANT_FIRST_NAME, c.APPLICANT_MIDDLE_NAME, c.APPLICANT_LAST_NAME);
  await answerAnyOtherNamesNL(pages);
  await answerYourDetailsSectionNL(pages);
  await answerAddressDetailsNL(pages);
  await pages.whatAreYourContactDetailsNLPage.whatAreYourContactDetailsEPP(c.CONTACT_PHONE_PRIMARY, c.CONTACT_EMAIL_PRIMARY);
  await chooseIdentityDocumentAndUploadEvidenceNL(pages);
  await answerOtherLicenceNL(pages);
  await answerCriminalRecordNL(pages);
  await answerMedicalQuestions(pages);
  await doesYourLicenceNeedCoverEPNL(pages);
  await doesYourLicenceNeedCoverRegulatedPoisonsNL(pages);
}

async function applyForNewLicenceRouteAnswer(pages: Pages) {
  await pages.namePageNLPage.answerNameDetails(c.TITLE_MR, c.APPLICANT_FIRST_NAME, c.APPLICANT_MIDDLE_NAME, c.APPLICANT_LAST_NAME);
  await answerAnyOtherNamesNL(pages);
  await answerYourDetailsSectionNL(pages);
  await answerAddressDetailsNL(pages);
  await pages.whatAreYourContactDetailsNLPage.whatAreYourContactDetailsEPP(c.CONTACT_PHONE_PRIMARY, c.CONTACT_EMAIL_PRIMARY);
  await chooseIdentityDocumentAndUploadEvidenceNL(pages);
  await answerOtherLicenceNL(pages);
  await answerCriminalRecordNL(pages);
  await answerMedicalQuestions(pages);
  await doesYourLicenceNeedCoverEPNL(pages);
  await doesYourLicenceNeedCoverRegulatedPoisonsNL(pages);
  await counterSignatoryDetailsNL(pages);
  await pages.checkYourAnswerNewAppEppNLPage.newAppSummaryPage();
}

async function answerAnyOtherNamesNL(pages: Pages) {
  if (scenarioData.otherNames === c.YES) {
    await pages.namePageNLPage.answerYesToOtherNameQuestion();
    await pages.otherNamesPageNLPage.answerOtherNameDetails(
      c.OTHER_NAME_TITLE,
      c.OTHER_NAME_FIRST_NAME,
      c.OTHER_NAME_MIDDLE_NAME,
      c.OTHER_NAME_LAST_NAME,
      c.OTHER_NAME_START_DATE_DAY,
      c.OTHER_NAME_START_DATE_MONTH,
      c.OTHER_NAME_START_DATE_YEAR,
    );
    await pages.otherNamesSummaryPageNLPage.answerOtherNamesSummary();
    return;
  }
  await pages.namePageNLPage.answerNoToOtherNameQuestion();
}

async function answerYourDetailsSectionNL(pages: Pages) {
  await pages.yourDetailsPageNLPage.answerYourDetails(
    c.DOB_DAY,
    c.DOB_MONTH,
    c.DOB_YEAR,
    c.APPLICANT_BIRTH_PLACE,
    c.COUNTRY_UK,
    c.COUNTRY_UK,
  );
  await chooseYesNoForNameFragment(pages.yourDetailsPageNLPage.page, 'more-nationalities', scenarioData.moreNationalities);
  await answerSexAndHeightQuestionNL(pages);
  if (scenarioData.moreNationalities === c.YES) {
    await pages.otherNationalitiesEppNLPage.answerOtherNationalitiesQuestions(c.NATIONALITY_FRANCE);
  }
}

async function answerSexAndHeightQuestionNL(pages: Pages) {
  if (scenarioData.sex === 'Male') {
    await pages.yourDetailsPageNLPage.answerSexMale();
  } else if (scenarioData.sex === 'Female') {
    await pages.yourDetailsPageNLPage.answerSexFemale();
  } else {
    await pages.yourDetailsPageNLPage.answerSexOther();
  }
  await pages.yourDetailsPageNLPage.answerHeightAndOccupation(c.APPLICANT_HEIGHT_CM, c.APPLICANT_OCCUPATION);
}

async function answerAddressDetailsNL(pages: Pages) {
  if (await pages.whatIsHomeAddressPageNLPage.line1Input.isVisible().catch(() => true)) {
    await pages.whatIsHomeAddressPageNLPage.answerHomeAddress(
      c.HOME_ADDRESS_LINE_1,
      c.HOME_ADDRESS_LINE_2,
      c.HOME_ADDRESS_CITY,
      c.HOME_ADDRESS_COUNTY,
      c.HOME_ADDRESS_POSTCODE,
      c.COUNTRY_UK,
      c.HOME_ADDRESS_DATE_DAY,
      c.HOME_ADDRESS_DATE_MONTH,
      c.HOME_ADDRESS_DATE_YEAR,
    );
  } else {
    await pages.previousAddressPageNLPage.answerPreviousHomeAddress(
      c.PREVIOUS_ADDRESS_LINE_1,
      c.PREVIOUS_ADDRESS_LINE_2,
      c.PREVIOUS_ADDRESS_CITY,
      c.PREVIOUS_ADDRESS_COUNTY,
      c.PREVIOUS_ADDRESS_POSTCODE,
      c.COUNTRY_UK,
      c.PREVIOUS_ADDRESS_DATE_DAY,
      c.PREVIOUS_ADDRESS_DATE_MONTH,
      c.PREVIOUS_ADDRESS_DATE_YEAR,
    );
  }
  await pages.summaryPreviousAddressLast5YearsEppNLPage.answerSummaryForPreviousAddress();
  await pages.uploadProofOfAddressEppNLPage.answerEPPAddressProofUpload(c.UPLOAD_EVIDENCE_FILE);
}

async function chooseIdentityDocumentAndUploadEvidenceNL(pages: Pages) {
  if (scenarioData.identityDocument === 'British passport') {
    await pages.whichIdentityDocUseEppNLPage.answerIdentityDocBritishPassport(c.IDENTITY_PASSPORT_UK_NUMBER);
    await pages.uploadBritishPassportEppNLPage.uploadBritishPassportEpp(c.UPLOAD_EVIDENCE_FILE);
    return;
  }

  if (scenarioData.identityDocument.includes('Passport from the EU')) {
    await pages.whichIdentityDocUseEppNLPage.answerIdentityDocEU(c.IDENTITY_PASSPORT_EU_NUMBER);
    await pages.uploadEUPassportEvidenceEppNLPage.uploadEUPassportEvidenceEpp(c.UPLOAD_EVIDENCE_FILE);
    await pages.uploadCertificateOfConductEppNLPage.uploadCertificateConductEpp(c.UPLOAD_EVIDENCE_FILE);
    return;
  }

  await pages.whichIdentityDocUseEppNLPage.answerIdentityUKDrivingLicence(c.IDENTITY_UK_DRIVING_LICENCE_NUMBER);
  await pages.uploadUKDrivingLicenceEvidenceEppNLPage.uploadUKDrivingLicenceEpp(c.UPLOAD_EVIDENCE_FILE);
}

async function answerOtherLicenceNL(pages: Pages) {
  await pages.otherLicencesEppNLPage.selectOtherLicences('firearms', scenarioData.firearmsLicence);
  await pages.otherLicencesEppNLPage.selectOtherLicences('shotgun', scenarioData.shotgunLicence);
  await pages.otherLicencesEppNLPage.selectOtherLicences('refused', scenarioData.refusedRevoked);
  await clickContinueFromPage(pages.otherLicencesEppNLPage.page);

  if (scenarioData.refusedRevoked === c.YES) {
    await pages.addRefusedRevokedLicenceEppNLPage.reasonAndDateFirearmRefused(
      c.REFUSED_REASON,
      c.REFUSED_FIREARM_DATE_DAY,
      c.REFUSED_FIREARM_DATE_MONTH,
      c.REFUSED_FIREARM_DATE_YEAR,
    );
    await pages.refusedLicenceHistoryEppNLPage.addAnotherRefusal();
    await pages.addRefusedRevokedLicenceEppNLPage.reasonAndDateShotGunRefused(
      c.REFUSED_REASON,
      c.REFUSED_SHOTGUN_DATE_DAY,
      c.REFUSED_SHOTGUN_DATE_MONTH,
      c.REFUSED_SHOTGUN_DATE_YEAR,
    );
    await pages.refusedLicenceHistoryEppNLPage.revokedLicenceHistory();
  }
}

async function answerCriminalRecordNL(pages: Pages) {
  if (scenarioData.criminalRecord === c.YES) {
    await pages.criminalRecordWarningsEppNLPage.answerYesCriminalQuestions();
    await pages.addCriminalRecordEntryEppNLPage.answerCriminalRecordEntry(
      c.OFFENCE_NAME,
      c.COUNTRY_ITALY,
      c.CRIMINAL_DATE_DAY,
      c.CRIMINAL_DATE_MONTH,
      c.CRIMINAL_DATE_YEAR,
    );
    await pages.criminalRecordSummaryEppNLPage.addAnotherCriminalRecord();
    await pages.addCriminalRecordEntryEppNLPage.answerCriminalRecordEntry(
      c.OFFENCE_NAME,
      c.COUNTRY_ITALY,
      c.CRIMINAL_DATE_DAY,
      c.CRIMINAL_DATE_MONTH,
      c.CRIMINAL_DATE_YEAR,
    );
    await pages.criminalRecordSummaryEppNLPage.reviewSummaryContinue();
    return;
  }

  await pages.criminalRecordWarningsEppNLPage.answerNoCriminalQuestions();
}

async function answerMedicalQuestions(pages: Pages) {
  await pages.medicalDeclarationEppNLPage.MedicalDeclareEpp();
  await pages.yourMedicalHistoryEppNLPage.selectMedicalAdviceAndReceivedTreatment(
    'has-seen-doctor',
    scenarioData.seenDoctor,
  );
  await pages.yourMedicalHistoryEppNLPage.selectMedicalAdviceAndReceivedTreatment(
    'received-treatment',
    scenarioData.treatmentDrugAlcohol,
  );
  await clickContinueFromPage(pages.yourMedicalHistoryEppNLPage.page);
  if (scenarioData.treatmentDrugAlcohol === c.YES) {
    await pages.uploadMedicalFormEppNLPage.uploadMedicalFormEpp(c.UPLOAD_EVIDENCE_FILE);
  }
  await pages.doctorContactDetailsEppNLPage.answerDoctorContactDetails(
    c.DOCTOR_NAME,
    c.DOCTOR_ADDRESS_LINE_1,
    c.DOCTOR_ADDRESS_LINE_2,
    c.DOCTOR_CITY,
    c.DOCTOR_COUNTY,
    c.DOCTOR_POSTCODE,
    c.COUNTRY_UK,
  );
}

async function clickContinueFromPage(page: Page) {
  const button = page.getByRole('button', { name: 'Continue' }).first();
  if (await button.isVisible().catch(() => false)) {
    await button.click();
    return;
  }
  await page.locator("input[value='Continue']").first().click();
}

async function chooseYesNoForNameFragment(page: Page, nameFragment: string, value: string) {
  const yesNo = (value || '').toLowerCase() === c.YES.toLowerCase() ? c.YES.toLowerCase() : c.NO.toLowerCase();
  const radio = page.locator(`input[type="radio"][name*="${nameFragment}"][value="${yesNo}"]`).first();
  if (await radio.isVisible().catch(() => false)) {
    const alreadyChecked = await radio.isChecked().catch(() => false);
    if (!alreadyChecked) {
      await radio.click({ force: true });
    }
    return;
  }

  if (yesNo === c.YES.toLowerCase()) {
    await page.getByRole('radio', { name: /^yes$/i }).first().check();
    return;
  }

  await page.getByRole('radio', { name: /^no$/i }).first().check();
}

async function doesYourLicenceNeedCoverEPNL(pages: Pages) {
  await pages.regulatedEpNLPage.selectRegulatedEPRadioButton(scenarioData.coverExplosivesPrecursors);
  if (scenarioData.coverExplosivesPrecursors === c.YES) {
    await selectEPFromList(pages);
    await answerCoverLicenceDetailsExPreNL(pages);
  }
}

async function answerCoverLicenceDetailsExPreNL(pages: Pages) {
  await pages.ammoniumNitrateOrAbove16NitrogenNLPage.answerAmmoniumNitrate(
    c.PRECURSOR_REASON,
    c.PRECURSOR_AMOUNT,
    c.PRECURSOR_AMOUNT_UNIT,
    c.PRECURSOR_CONCENTRATION,
  );
  if (scenarioData.storeAmmonium === 'Home address') {
    await pages.ammoniumNitrateOrAbove16NitrogenNLPage.storeInUkAddress();
  } else {
    await pages.ammoniumNitrateOrAbove16NitrogenNLPage.storeInOtherAddress(c.PRECURSOR_STORE_OTHER_ADDRESS);
  }

  if (scenarioData.useAmmonium === 'Home address') {
    await pages.ammoniumNitrateOrAbove16NitrogenNLPage.useUkAddress();
  } else {
    await pages.ammoniumNitrateOrAbove16NitrogenNLPage.useOtherAddress(c.PRECURSOR_USE_OTHER_ADDRESS);
  }

  await pages.ammoniumNitrateOrAbove16NitrogenNLPage.clickContinueButton();
  await pages.explosivesPrecursorSummaryNLPage.explosiveAndPrecursorsSummary();
}

async function doesYourLicenceNeedCoverRegulatedPoisonsNL(pages: Pages) {
  await pages.regulatedPoisonsEppNLPage.selectRegulatedPoisonRadioButton(scenarioData.coverPoisons);
  if (scenarioData.coverPoisons === c.YES) {
    await selectPoisonFromList(pages);
    await answerCoverLicenceDetailsForPoisonNL(pages);
  }
}

async function answerCoverLicenceDetailsForPoisonNL(pages: Pages) {
  await pages.dNPPoisonEppNLPage.answerDNP(
    c.POISON_REASON,
    c.POISON_AMOUNT,
    c.POISON_AMOUNT_UNIT,
    c.POISON_COMPOUND_OR_SALT,
    c.POISON_CONCENTRATION,
  );

  if (scenarioData.storeDnp === 'Home address') {
    await pages.dNPPoisonEppNLPage.storePoisonInUkAddress();
  } else {
    await pages.dNPPoisonEppNLPage.storePoisonInOtherAddress(c.POISON_STORE_OTHER_ADDRESS);
  }

  if (scenarioData.useDnp === 'Home address') {
    await pages.dNPPoisonEppNLPage.usePoisonUkAddress();
  } else {
    await pages.dNPPoisonEppNLPage.usePoisonOtherAddress(c.POISON_USE_OTHER_ADDRESS);
  }

  await pages.dNPPoisonEppNLPage.clickContinueButton();
  await pages.poisonsOnLicenceSummaryNLPage.PoisonOnLicenceSummary();
}

async function counterSignatoryDetailsNL(pages: Pages) {
  await pages.counterDetailsEppNLPage.answerCounterSignatoryDetails(
    c.TITLE_MR,
    c.COUNTERSIGNATORY_FIRST_NAME,
    c.COUNTERSIGNATORY_MIDDLE_NAME,
    c.COUNTERSIGNATORY_LAST_NAME,
    c.COUNTERSIGNATORY_KNOWN_FOR,
    c.COUNTERSIGNATORY_KNOWN_HOW,
    c.COUNTERSIGNATORY_OCCUPATION,
  );
  await pages.counterSignatoryAddressNLPage.answerCounterSignatoryAddress(
    c.COUNTERSIGNATORY_ADDRESS_LINE_1,
    c.COUNTERSIGNATORY_ADDRESS_LINE_2,
    c.COUNTERSIGNATORY_CITY,
    c.COUNTERSIGNATORY_POSTCODE,
  );
  await pages.counterSignatoryContactDetailsEppNLPage.answerCounterSignatoryContactDetails(
    c.CONTACT_PHONE_SECONDARY,
    c.CONTACT_EMAIL_COUNTERSIGNATORY,
  );

  if (scenarioData.countersignatoryIdentityDocument === 'British passport') {
    await pages.counterSignatoryIdentityDocumentsEppNLPage.britishPassportCounterSignatoryIdentityDocuments(c.IDENTITY_PASSPORT_UK_NUMBER);
  } else if (scenarioData.countersignatoryIdentityDocument.includes('Passport from the EU')) {
    await pages.counterSignatoryIdentityDocumentsEppNLPage.EEAPassportCounterSignatoryIdentityDocuments(c.IDENTITY_PASSPORT_EU_NUMBER);
  } else {
    await pages.counterSignatoryIdentityDocumentsEppNLPage.UKDrivingLicenceCounterSignatoryIdentityDocuments(c.IDENTITY_UK_DRIVING_LICENCE_NUMBER);
  }
}

async function amendLicenceRoute(pages: Pages) {
  await pages.licenceNumberPage.enterLicenceNumberToAmend(c.LICENCE_NUMBER);
  await pages.whatIsNameOnLicencePage.answerNameOnLicence(c.TITLE_MR, c.APPLICANT_FIRST_NAME, c.APPLICANT_MIDDLE_NAME, c.APPLICANT_LAST_NAME);
  await pages.dateOfBirthForLicencePage.answerDobLicence(c.DOB_DAY, c.DOB_MONTH, c.DOB_YEAR);
  await pages.whatIsYourHomeAddressAmendLicencePage.homeAddressAmendLicence(
    c.HOME_ADDRESS_LINE_1,
    c.HOME_ADDRESS_LINE_2,
    c.HOME_ADDRESS_CITY,
    c.HOME_ADDRESS_COUNTY,
    c.HOME_ADDRESS_POSTCODE,
    c.COUNTRY_UK,
  );
  await pages.whatAreYourContactDetailsAmendLicencePage.whatAreYourContactDetailsAmend(c.CONTACT_PHONE_SECONDARY, c.CONTACT_EMAIL_SECONDARY);
  await doYouNeedToAmendNameOnLicence(pages);
  await doYouNeedToAmendHomeAddressOnLicence(pages);
  await highLevelChangeInSubstanceAmendLicence(pages);
  await counterSignatoryDetailsAmendLicence(pages);
  await pages.checkYourAnswerAmendLicencePage.checkYourAnswers();
  await pages.declarationAmendLicencePage.answerDeclarationAmendLicence();
}

async function highLevelChangeInSubstanceAmendLicence(pages: Pages) {
  if (scenarioData.amendSubstance === c.YES) {
    await doYouNeedToAmendSubstanceOnLicence(pages);
    await doYouNeedToAmendRegulatedEPOnLicence(pages);
    await doYouNeedToAmendPoisonsOnLicence(pages);
  } else {
    await pages.changeInSubstanceAmendLicencePage.answerNoAmendSubstance(c.NO);
  }
}

async function chooseIdentityDocumentAndUploadEvidenceAmendLicence(pages: Pages) {
  if (scenarioData.identityDocument === 'British passport') {
    await pages.whichIdentityDocUseEppNLPage.answerIdentityDocBritishPassport(c.IDENTITY_PASSPORT_UK_NUMBER);
    await pages.uploadBritishPassportEppNLPage.uploadBritishPassportEpp(c.UPLOAD_EVIDENCE_FILE);
    return;
  }

  if (scenarioData.identityDocument.includes('Passport from the EU')) {
    await pages.whichIdentityDocUseEppNLPage.answerIdentityDocEU(c.IDENTITY_PASSPORT_EU_NUMBER);
    await pages.uploadEUPassportEvidenceEppNLPage.uploadEUPassportEvidenceEpp(c.UPLOAD_EVIDENCE_FILE);
    await pages.uploadCertificateOfConductEppNLPage.uploadCertificateConductEpp(c.UPLOAD_EVIDENCE_FILE);
    return;
  }

  await pages.whichIdentityDocUseEppNLPage.answerIdentityUKDrivingLicence(c.IDENTITY_UK_DRIVING_LICENCE_NUMBER);
  await pages.uploadUKDrivingLicenceEvidenceEppNLPage.uploadUKDrivingLicenceEpp(c.UPLOAD_EVIDENCE_FILE);
}

async function counterSignatoryDetailsAmendLicence(pages: Pages) {
  await pages.counterDetailsAmendLicencePage.answerCounterSignatoryDetailsAmendLicence(
    c.TITLE_MR,
    c.COUNTERSIGNATORY_FIRST_NAME,
    c.COUNTERSIGNATORY_MIDDLE_NAME,
    c.COUNTERSIGNATORY_LAST_NAME,
    c.COUNTERSIGNATORY_KNOWN_FOR,
    c.COUNTERSIGNATORY_KNOWN_HOW,
    c.COUNTERSIGNATORY_OCCUPATION,
  );
  await pages.counterSignatoryAddressAmendLicencePage.answerCounterSignatoryAddressAmendLicence(
    c.COUNTERSIGNATORY_ADDRESS_LINE_1,
    c.COUNTERSIGNATORY_ADDRESS_LINE_2,
    c.COUNTERSIGNATORY_CITY,
    c.COUNTERSIGNATORY_POSTCODE,
  );
  await pages.counterSignatoryContactDetailsAmendLicencePage.answerCounterSignatoryContactDetailsAmendLicence(
    c.CONTACT_PHONE_SECONDARY,
    c.CONTACT_EMAIL_COUNTERSIGNATORY,
  );
  if (scenarioData.countersignatoryIdentityDocument === 'British passport') {
    await pages.counterSignatoryIdentityDocumentsAmendLicencePage.britishPassportCounterSignatoryIdentityDocumentsAmendLicence(
      c.IDENTITY_PASSPORT_UK_NUMBER,
    );
  } else if (scenarioData.countersignatoryIdentityDocument.includes('Passport from the EU')) {
    await pages.counterSignatoryIdentityDocumentsAmendLicencePage.EEAPassportCounterSignatoryIdentityDocumentsAmendLicence(
      c.IDENTITY_PASSPORT_EU_NUMBER,
    );
  } else {
    await pages.counterSignatoryIdentityDocumentsAmendLicencePage.UKDrivingLicenceCounterSignatoryIdentityDocumentsAmendLicence(
      c.IDENTITY_UK_DRIVING_LICENCE_NUMBER,
    );
  }
}

async function doYouNeedToAmendNameOnLicence(pages: Pages) {
  if (scenarioData.amendName === c.YES) {
    await pages.amendLicenceDetailsPage.answerYesAmendLicenceDetails(c.YES);
    await pages.whatIsYourNewNameAmendLicencePage.answerYourNewName(
      c.TITLE_MR,
      c.APPLICANT_FIRST_NAME,
      c.APPLICANT_MIDDLE_NAME,
      c.APPLICANT_LAST_NAME,
      c.NEW_NAME_DATE_DAY,
      c.NEW_NAME_DATE_MONTH,
      c.NEW_NAME_DATE_YEAR,
    );
    await chooseIdentityDocumentAndUploadEvidenceAmendLicence(pages);
    return;
  }
  await pages.amendLicenceDetailsPage.answerNoAmendLicenceDetails(c.NO);
}

async function doYouNeedToAmendHomeAddressOnLicence(pages: Pages) {
  if (scenarioData.amendHomeAddress === c.YES) {
    await pages.changeInHomeAddressAmendLicencePage.answerYesAmendHomeAddressOnLicence(c.YES);
    await pages.whatIsYourNewAddressAmendLicencePage.answerNewAddress(
      c.NEW_ADDRESS_LINE_1,
      c.NEW_ADDRESS_LINE_2,
      c.NEW_ADDRESS_CITY,
      c.NEW_ADDRESS_COUNTY,
      c.NEW_ADDRESS_POSTCODE,
      c.COUNTRY_UK,
      c.NEW_ADDRESS_DATE_DAY,
      c.NEW_ADDRESS_DATE_MONTH,
      c.NEW_ADDRESS_DATE_YEAR,
    );
    await pages.uploadProofOfAddressAmendLicencePage.answerEPPAddressProofUpload(c.UPLOAD_EVIDENCE_FILE);
    return;
  }
  await pages.changeInHomeAddressAmendLicencePage.answerNoAmendHomeAddressOnLicence(c.NO);
}

async function doYouNeedToAmendSubstanceOnLicence(pages: Pages) {
  if (scenarioData.amendSubstance === c.YES) {
    await pages.changeInSubstanceAmendLicencePage.answerYesAmendSubstance(c.YES);
  } else {
    await pages.changeInSubstanceAmendLicencePage.answerNoAmendSubstance(c.NO);
  }
}

async function doYouNeedToAmendRegulatedEPOnLicence(pages: Pages) {
  if (scenarioData.amendExplosivesPrecursors === c.YES) {
    await pages.regulatedExplosivesPrecursorsPage.answerYesAmendExplosivePrecursorsOnLicence(c.YES);
    await selectEPFromList(pages);
    await answerCoverLicenceDetailsExPreNL(pages);
    //  await pages.explosivesPrecursorSummaryAmendLicencePage.explosiveAndPrecursorsSummaryAmendLicence();
    return;
  }
  await pages.regulatedExplosivesPrecursorsPage.answerNoAmendExplosivePrecursorsOnLicence(c.NO);
}

async function selectEPFromList(pages: Pages) {
  const map: Record<string, () => Promise<void>> = {
    'Ammonium nitrate at or above 16% nitrogen': () => pages.explosivesPrecursorsAmendLicencePage.selectAmmonium(),
    'Hexamine': () => pages.explosivesPrecursorsAmendLicencePage.selectHexamine(),
    'Hydrochloric acid above 10% (weight by weight)': () => pages.explosivesPrecursorsAmendLicencePage.selectHydrochloricAcid(),
    'Hydrogen peroxide above 12% (weight by weight)': () => pages.explosivesPrecursorsAmendLicencePage.selectHydrogenPeroxide(),
    'Nitric acid above 3% (weight by weight)': () => pages.explosivesPrecursorsAmendLicencePage.selectNitricAcid(),
    'Nitromethane above 30% (weight by weight)': () => pages.explosivesPrecursorsAmendLicencePage.selectNitromethane(),
    'Phosphoric acid above 30% (weight by weight)': () => pages.explosivesPrecursorsAmendLicencePage.selectPhosphoricAcid(),
    'Potassium chlorate above 40% (weight by weight)': () => pages.explosivesPrecursorsAmendLicencePage.selectPotassiumChlorate(),
    'Potassium perchlorate above 40% (weight by weight)': () => pages.explosivesPrecursorsAmendLicencePage.selectPotassiumPerchlorate(),
    'Sodium chlorate above 40% (weight by weight)': () => pages.explosivesPrecursorsAmendLicencePage.selectSodiumChlorate(),
    'Sodium perchlorate above 40% (weight by weight)': () => pages.explosivesPrecursorsAmendLicencePage.selectSodiumPerchlorate(),
    'Sulfuric acid above 15% (weight by weight)': () => pages.explosivesPrecursorsAmendLicencePage.selectSulfuricAcid(),
  };
  const key = scenarioData.explosivePrecursor;
  if (map[key]) {
    await map[key]();
  }
}

async function selectPoisonFromList(pages: Pages) {
  const map: Record<string, () => Promise<void>> = {
    '2,4- Dinitrophenol and derivatives including sodium dinitrophenolate': () => pages.poisonsAmendLicencePage.select24Dinitrophenol(),
    '2,4-dinitrophenol and its compounds including dinitrophenolate': () => pages.poisonsAmendLicencePage.select24Dinitrophenol(),
    'Aluminium phosphide': () => pages.poisonsAmendLicencePage.selectAluminiumPhosphide(),
    'Aluminium sulfide': () => pages.poisonsAmendLicencePage.selectAluminiumSulfide(),
    'Arsenic and its compounds': () => pages.poisonsAmendLicencePage.selectArsenicCompounds(),
    'Barium salts': () => pages.poisonsAmendLicencePage.selectBariumSalts(),
    'Bromomethane': () => pages.poisonsAmendLicencePage.selectBromomethane(),
    'Calcium sulfide': () => pages.poisonsAmendLicencePage.selectCalciumSulfide(),
    'Calcium phosphide': () => pages.poisonsAmendLicencePage.selectCalciumPhosphide(),
    'Chloropicrin': () => pages.poisonsAmendLicencePage.selectChloropicrin(),
    'Fluoroacetic acid and its salts; fluoracetamide': () => pages.poisonsAmendLicencePage.selectFluoroaceticAcid(),
    'Hydrogen cyanide and metal cyanides': () => pages.poisonsAmendLicencePage.selectHydrogenCyanide(),
    'Lead acetates; compound of lead with acids from fixed oils': () => pages.poisonsAmendLicencePage.selectLeadAcetates(),
    'Magnesium phosphide': () => pages.poisonsAmendLicencePage.selectMagnesiumPhosphide(),
    'Magnesium sulfide': () => pages.poisonsAmendLicencePage.selectMagnesiumSulfide(),
    'Mercury and its compounds': () => pages.poisonsAmendLicencePage.selectMercuryCompounds(),
    'Oxalic acid above 10% (weight by weight)': () => pages.poisonsAmendLicencePage.selectOxalicAcid(),
    'Phenols above 60% w/w and their compounds': () => pages.poisonsAmendLicencePage.selectPhenols(),
    'Phosphorus yellow': () => pages.poisonsAmendLicencePage.selectPhosphorusYellow(),
    'Sodium sulfide': () => pages.poisonsAmendLicencePage.selectSodiumSulfide(),
    'Strychnine, its salts and quaternary compounds': () => pages.poisonsAmendLicencePage.selectStrychnine(),
    'Thallium and its salts': () => pages.poisonsAmendLicencePage.selectThalliumSalts(),
    'Zinc phosphide': () => pages.poisonsAmendLicencePage.selectZincPhosphide(),
  };
  if (map[scenarioData.poison]) {
    await map[scenarioData.poison]();
  }
}

async function doYouNeedToAmendPoisonsOnLicence(pages: Pages) {
  if (scenarioData.amendPoisons === c.YES) {
    await pages.regulatedPoisonsAmendLicencePage.yesNeedToAmendPoison(c.YES);
    await selectPoisonFromList(pages);
    await answerCoverLicenceDetailsForPoisonNL(pages);
    return;
  }
  await pages.regulatedPoisonsAmendLicencePage.noNeedToAmendPoison(c.NO);
}

async function renewMyApplicationRoute(pages: Pages) {
  await pages.enterYourLicenceNumberRLPage.enterLicenceNumber(c.LICENCE_NUMBER);
  await applyForNewLicenceRouteAnswer(pages);
}

async function renewMyApplicationAnswerNoToAllQuestionsRoute(pages: Pages) {
  await pages.enterYourLicenceNumberRLPage.enterLicenceNumber(c.LICENCE_NUMBER);
  await applyForNewLicenceRouteNoToAllQuestions(pages);
}

async function replaceCommonQuestions(pages: Pages) {
  await pages.enterYourLicenceNumberRepPage.answerLicenceNumber(c.LICENCE_NUMBER);
  await pages.whatIsYourNameOnTheLicenceRepPage.answerNameOnLicence(
    c.TITLE_MR,
    c.APPLICANT_FIRST_NAME,
    c.APPLICANT_MIDDLE_NAME,
    c.APPLICANT_LAST_NAME,
  );
  await pages.whatIsYourDOBRepPage.answerDOB(c.DOB_DAY, c.DOB_MONTH, c.DOB_YEAR);
  await pages.whatIsYourHomeAddressRepPage.answerHomeAddress(
    c.HOME_ADDRESS_LINE_1,
    c.HOME_ADDRESS_LINE_2,
    c.HOME_ADDRESS_CITY,
    c.HOME_ADDRESS_COUNTY,
    c.HOME_ADDRESS_POSTCODE,
    c.COUNTRY_UK,
  );
  await pages.whatAreYourContactDetailsRepPage.answerContactDetails(c.CONTACT_PHONE_PRIMARY, c.CONTACT_EMAIL_PRIMARY);
  await answerDetailsChangedSinceIssued(pages);
}

async function licenceStolenReplaceRoute(pages: Pages) {
  await answerChangeInHomeAddress(pages);
  await answerChangeInSubstances(pages);
  await answerRegulatedEP(pages);
  await answerRegulatedPoison(pages);
  await replaceCounterSignatoryDetails(pages);
  await checkAndDeclareReplace(pages);
}

async function licenceIsLostReplaceRoute(pages: Pages) {
  await checkAndDeclareReplace(pages);
}

async function licenceIsDamagedReplaceRoute(pages: Pages) {
  await answerChangeInHomeAddress(pages);
  await answerChangeInSubstances(pages);
  await replaceCounterSignatoryDetails(pages);
  await checkAndDeclareReplace(pages);
}

async function replaceCounterSignatoryDetails(pages: Pages) {
  await pages.counterSignatoryDetailsRepPage.answerCounterSignatoryDetails(
    c.TITLE_MR,
    c.COUNTERSIGNATORY_FIRST_NAME,
    c.COUNTERSIGNATORY_MIDDLE_NAME,
    c.COUNTERSIGNATORY_LAST_NAME,
    c.COUNTERSIGNATORY_KNOWN_FOR,
    c.COUNTERSIGNATORY_KNOWN_HOW,
    c.COUNTERSIGNATORY_OCCUPATION,
  );
  await pages.counterSignatoryAddressRepPage.answerCounterSignatoryAddress(
    c.COUNTERSIGNATORY_ADDRESS_LINE_1,
    c.COUNTERSIGNATORY_ADDRESS_LINE_2,
    c.COUNTERSIGNATORY_CITY,
    c.COUNTERSIGNATORY_POSTCODE,
  );
  await pages.counterSignatoryContactDetailsRepPage.answerCounterSignatoryContactDetails(
    c.CONTACT_PHONE_SECONDARY,
    c.CONTACT_EMAIL_COUNTERSIGNATORY,
  );
  await answerCounterSignatoryIdentityDocument(pages);
}

async function checkAndDeclareReplace(pages: Pages) {
  await pages.checkYourAnswersRepPage.replaceCheckYouAnswers();
}

async function answerWhyDoYouNeedRepLicence(pages: Pages) {
  if (scenarioData.replacementReason === 'Licence was stolen') {
    await pages.whyDoYouNeedReplacementLicenceRepPage.licenceWasStolen();
    await answerHaveYouReportedTheTheft(pages);
  } else if (scenarioData.replacementReason === 'Licence is lost') {
    await pages.whyDoYouNeedReplacementLicenceRepPage.licenceIsLost();
  } else if (scenarioData.replacementReason === 'Licence is damaged') {
    await pages.whyDoYouNeedReplacementLicenceRepPage.licenceIsDamaged();
  } else {
    await pages.whyDoYouNeedReplacementLicenceRepPage.licenceIsDestroyed();
  }
}

async function answerHaveYouReportedTheTheft(pages: Pages) {
  if (scenarioData.theftReported === c.YES) {
    await pages.haveYouReportedTheTheftRepPage.answerYesReportedTheft(c.YES);
    await pages.crimeReportDetailsRepPage.answerCrimeDetails(c.CRIME_POLICE_FORCE, c.CRIME_NUMBER);
    return;
  }
  await pages.haveYouReportedTheTheftRepPage.answerNoReportedTheft(c.NO);
}

async function answerDetailsChangedSinceIssued(pages: Pages) {
  if (scenarioData.detailsChanged === c.YES) {
    await pages.haveAnyOfYourDetailsChangedRepPage.answerYesHaveDetailsChanged(c.YES);
    await answerAmendLicenceDetails(pages);
    return;
  }
  await pages.haveAnyOfYourDetailsChangedRepPage.answerNoHaveDetailsChanged(c.NO);
}

async function answerAmendLicenceDetails(pages: Pages) {
  if (scenarioData.amendName === c.YES) {
    await pages.amendLicenceDetailsRepPage.answerYesLicenceDetails(c.YES);
    await pages.whatIsYourNewNameRepPage.answerNameOnLicence(
      c.TITLE_MR,
      c.APPLICANT_FIRST_NAME,
      c.APPLICANT_MIDDLE_NAME,
      c.APPLICANT_LAST_NAME,
      c.NEW_NAME_DATE_DAY,
      c.NEW_NAME_DATE_MONTH,
      c.NEW_NAME_DATE_YEAR,
    );
    await answerIdentityDocumentRep(pages);
    return;
  }
  await pages.amendLicenceDetailsRepPage.answerNoLicenceDetails(c.NO);
}

async function answerIdentityDocumentRep(pages: Pages) {
  if (scenarioData.identityDocument === 'British passport') {
    await pages.whichIdentityDocumentDoYouUseRepPage.answerIdentityDocBritishPassport(c.IDENTITY_PASSPORT_UK_NUMBER);
    await pages.uploadBritishPassportRepPage.answerBritishPassport(c.UPLOAD_EVIDENCE_FILE);
    return;
  }

  if (scenarioData.identityDocument.includes('Passport from the EU')) {
    await pages.whichIdentityDocumentDoYouUseRepPage.answerIdentityDocEU(c.IDENTITY_PASSPORT_EU_NUMBER);
    await pages.uploadPassportRepPage.answerEUPassport(c.UPLOAD_EVIDENCE_FILE);
    await pages.uploadCertificateOfGoodConductRepPage.answerCertificateOfGoodConduct(c.UPLOAD_EVIDENCE_FILE);
    return;
  }

  await pages.whichIdentityDocumentDoYouUseRepPage.answerIdentityUKDrivingLicence(c.IDENTITY_UK_DRIVING_LICENCE_NUMBER);
  await pages.uploadUKDrivingLicenceRepPage.answerUKDrivingLicence(c.UPLOAD_EVIDENCE_FILE);
}

async function answerChangeInHomeAddress(pages: Pages) {
  if (scenarioData.amendHomeAddress === c.YES) {
    await pages.changeInHomeAddressRepPage.answerYesChangeInHomeAddress(c.YES);
    await pages.whatIsYourNewAddressRepPage.answerNewAddress(
      c.NEW_ADDRESS_LINE_1,
      c.NEW_ADDRESS_LINE_2,
      c.NEW_ADDRESS_CITY,
      c.NEW_ADDRESS_COUNTY,
      c.NEW_ADDRESS_POSTCODE,
      c.COUNTRY_UK,
      c.NEW_ADDRESS_DATE_DAY,
      c.NEW_ADDRESS_DATE_MONTH,
      c.NEW_ADDRESS_DATE_YEAR,
    );
    await pages.uploadProofOfAddressRepPage.answerProofOfAddress(c.UPLOAD_EVIDENCE_FILE);
    return;
  }
  await pages.changeInHomeAddressRepPage.answerNoChangeInHomeAddress(c.NO);
}

async function answerChangeInSubstances(pages: Pages) {
  if (scenarioData.amendSubstance === c.YES) {
    await pages.changeInSubstancesRepPage.answerYesChangeInSubstances(c.YES);
    return;
  }
  await pages.changeInSubstancesRepPage.answerNoChangeInSubstances(c.NO);
}

async function answerRegulatedEP(pages: Pages) {
  if (scenarioData.amendExplosivesPrecursors === c.YES) {
    await pages.amendEPOnLicenceRepPage.answerYesAmendEPRep(c.YES);
    await selectEPFromList(pages);
    await explosivePrecursorDetailsRep(pages);
    return;
  }
  await pages.amendEPOnLicenceRepPage.answerNoAmendEPRep(c.NO);
}

async function explosivePrecursorDetailsRep(pages: Pages) {
  await pages.ePDetailsRepPage.answerAmmoniumNitrate(
    c.PRECURSOR_REASON,
    c.PRECURSOR_AMOUNT,
    c.PRECURSOR_AMOUNT_UNIT,
    c.PRECURSOR_CONCENTRATION,
  );
  if (scenarioData.storeAmmonium === 'Home address') {
    await pages.ePDetailsRepPage.storeInUkAddress();
  } else {
    await pages.ePDetailsRepPage.storeInOtherAddress(c.PRECURSOR_STORE_OTHER_ADDRESS);
  }

  if (scenarioData.useAmmonium === 'Home address') {
    await pages.ePDetailsRepPage.useUkAddress();
  } else {
    await pages.ePDetailsRepPage.useOtherAddress(c.PRECURSOR_USE_OTHER_ADDRESS);
  }

  await pages.explosivesPrecursorsSummaryRepPage.explosiveAndPrecursorsSummaryRep();
  await clickContinueFromPage(pages.explosivesPrecursorsSummaryRepPage.page);
}

async function answerRegulatedPoison(pages: Pages) {
  if (scenarioData.amendPoisons === c.YES) {
    await pages.regulatedPoisonsRepPage.answerYesRegulatedPoison(c.YES);
    await selectPoisonFromList(pages);
    await poisonDetailsReplace(pages);
    return;
  }
  await pages.regulatedPoisonsRepPage.answerNoRegulatedPoison(c.NO);
}

async function poisonDetailsReplace(pages: Pages) {
  await pages.poisonDetailsRepPage.answerDNP(
    c.POISON_REASON,
    c.POISON_AMOUNT,
    c.POISON_AMOUNT_UNIT,
    c.POISON_COMPOUND_OR_SALT,
    c.POISON_CONCENTRATION,
  );

  if (scenarioData.storeDnp === 'Home address') {
    await pages.poisonDetailsRepPage.storeInUkAddress();
  } else {
    await pages.poisonDetailsRepPage.storeInOtherAddress(c.POISON_STORE_OTHER_ADDRESS);
  }

  if (scenarioData.useDnp === 'Home address') {
    await pages.poisonDetailsRepPage.useUkAddress();
  } else {
    await pages.poisonDetailsRepPage.useOtherAddress(c.POISON_USE_OTHER_ADDRESS);
  }

  await pages.poisonLicenceSummaryRepPage.PoisonOnLicenceSummaryRep();
  await clickContinueFromPage(pages.poisonLicenceSummaryRepPage.page);
}

async function answerCounterSignatoryIdentityDocument(pages: Pages) {
  if (scenarioData.countersignatoryIdentityDocument === 'British passport') {
    await pages.counterSignatoryIdentityDocumentRepPage.answerCounterSignatoryDocBritishPassport(c.IDENTITY_PASSPORT_UK_NUMBER);
  } else if (scenarioData.countersignatoryIdentityDocument.includes('Passport from the EU')) {
    await pages.counterSignatoryIdentityDocumentRepPage.answerCounterSignatoryDocEU(c.IDENTITY_PASSPORT_EU_NUMBER);
  } else {
    await pages.counterSignatoryIdentityDocumentRepPage.answerCounterSignatoryDocUKDrivingLicence(c.IDENTITY_UK_DRIVING_LICENCE_NUMBER);
  }
}
