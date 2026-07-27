import { createBdd } from 'playwright-bdd';
import { test, type Pages } from '../fixture/fixtures';
import { EppScenarioData, getEppScenarioData } from '../utility-helper/epp-scenario-data';

export const { Given, When, Then } = createBdd(test);

let scenarioData: EppScenarioData;

async function answerWhyDoYouNeedRepLicence(pages: Pages, data: EppScenarioData) {
    const answer = data.whyDoYouNeedAReplacementLicence;
    if (answer === 'Licence was stolen') {
        await pages.whyDoYouNeedReplacementLicenceRepPage.licenceWasStolen();
        if (data.haveYouReportedTheTheftToPolice === 'Yes') {
            await pages.haveYouReportedTheTheftRepPage.answerYesReportedTheft();
            await pages.crimeReportDetailsRepPage.answerCrimeDetails();
        } else {
            await pages.haveYouReportedTheTheftRepPage.answerNoReportedTheft();
        }
    } else if (answer === 'Licence is lost') {
        await pages.whyDoYouNeedReplacementLicenceRepPage.licenceIsLost();
    } else if (answer === 'Licence is damaged') {
        await pages.whyDoYouNeedReplacementLicenceRepPage.licenceIsDamaged();
    }
}

async function selectEPFromList(pages: Pages, selection: string) {
    switch (selection) {
        case 'Hexamine':
            await pages.explosivesPrecursorsAmendLicencePage.selectHexamine();
            return;
        case 'Hydrochloric acid above 10% (weight by weight)':
            await pages.explosivesPrecursorsAmendLicencePage.selectHydrochloricAcid();
            return;
        case 'Hydrogen peroxide above 12% (weight by weight)':
            await pages.explosivesPrecursorsAmendLicencePage.selectHydrogenPeroxide();
            return;
        case 'Nitric acid above 3% (weight by weight)':
            await pages.explosivesPrecursorsAmendLicencePage.selectNitricAcid();
            return;
        case 'Nitromethane above 30% (weight by weight)':
            await pages.explosivesPrecursorsAmendLicencePage.selectNitromethane();
            return;
        case 'Phosphoric acid above 30% (weight by weight)':
            await pages.explosivesPrecursorsAmendLicencePage.selectPhosphoricAcid();
            return;
        case 'Potassium chlorate above 40% (weight by weight)':
            await pages.explosivesPrecursorsAmendLicencePage.selectPotassiumChlorate();
            return;
        case 'Potassium perchlorate above 40% (weight by weight)':
            await pages.explosivesPrecursorsAmendLicencePage.selectPotassiumPerchlorate();
            return;
        case 'Sodium chlorate above 40% (weight by weight)':
            await pages.explosivesPrecursorsAmendLicencePage.selectSodiumChlorate();
            return;
        case 'Sodium perchlorate above 40% (weight by weight)':
            await pages.explosivesPrecursorsAmendLicencePage.selectSodiumPerchlorate();
            return;
        case 'Sulfuric acid above 15% (weight by weight)':
            await pages.explosivesPrecursorsAmendLicencePage.selectSulfuricAcid();
            return;
        case 'Ammonium nitrate at or above 16% nitrogen':
        default:
            await pages.explosivesPrecursorsAmendLicencePage.selectAmmonium();
            return;
    }
}

async function selectPoisonFromList(pages: Pages, selection: string) {
    switch (selection) {
        case 'Aluminium phosphide':
            await pages.poisonsAmendLicencePage.selectAluminiumPhosphide();
            return;
        case 'Aluminium sulfide':
            await pages.poisonsAmendLicencePage.selectAluminiumSulfide();
            return;
        case 'Arsenic and its compounds':
            await pages.poisonsAmendLicencePage.selectArsenicCompounds();
            return;
        case 'Barium salts':
            await pages.poisonsAmendLicencePage.selectBariumSalts();
            return;
        case 'Bromomethane':
            await pages.poisonsAmendLicencePage.selectBromomethane();
            return;
        case 'Calcium sulfide':
            await pages.poisonsAmendLicencePage.selectCalciumSulfide();
            return;
        case 'Calcium phosphide':
            await pages.poisonsAmendLicencePage.selectCalciumPhosphide();
            return;
        case 'Chloropicrin':
            await pages.poisonsAmendLicencePage.selectChloropicrin();
            return;
        case 'Fluoroacetic acid and its salts; fluoracetamide':
            await pages.poisonsAmendLicencePage.selectFluoroaceticAcid();
            return;
        case 'Hydrogen cyanide and metal cyanides':
            await pages.poisonsAmendLicencePage.selectHydrogenCyanide();
            return;
        case 'Lead acetates; compound of lead with acids from fixed oils':
            await pages.poisonsAmendLicencePage.selectLeadAcetates();
            return;
        case 'Magnesium phosphide':
            await pages.poisonsAmendLicencePage.selectMagnesiumPhosphide();
            return;
        case 'Magnesium sulfide':
            await pages.poisonsAmendLicencePage.selectMagnesiumSulfide();
            return;
        case 'Mercury and its compounds':
            await pages.poisonsAmendLicencePage.selectMercuryCompounds();
            return;
        case 'Oxalic acid above 10% (weight by weight)':
            await pages.poisonsAmendLicencePage.selectOxalicAcid();
            return;
        case 'Phenols above 60% w/w and their compounds':
            await pages.poisonsAmendLicencePage.selectPhenols();
            return;
        case 'Phosphorus yellow':
            await pages.poisonsAmendLicencePage.selectPhosphorusYellow();
            return;
        case 'Sodium sulfide':
            await pages.poisonsAmendLicencePage.selectSodiumSulfide();
            return;
        case 'Strychnine, its salts and quaternary compounds':
            await pages.poisonsAmendLicencePage.selectStrychnine();
            return;
        case 'Thallium and its salts':
            await pages.poisonsAmendLicencePage.selectThalliumSalts();
            return;
        case 'Zinc phosphide':
            await pages.poisonsAmendLicencePage.selectZincPhosphide();
            return;
        case '2,4- Dinitrophenol and derivatives including sodium dinitrophenolate':
        default:
            await pages.poisonsAmendLicencePage.select24Dinitrophenol();
            return;
    }
}

async function chooseIdentityDocumentAndUploadEvidence(pages: Pages, data: EppScenarioData) {
    const id = data.whichIdentityDocumentDoYouWantToUse;
    if (id === 'British passport') {
        await pages.whichIdentityDocUseEppNLPage.answerIdentityDocBritishPassport();
        await pages.uploadBritishPassportEppNLPage.uploadBritishPassportEpp();
    } else if (id.includes('Passport from the EU')) {
        await pages.whichIdentityDocUseEppNLPage.answerIdentityDocEU();
        await pages.uploadEUPassportEvidenceEppNLPage.uploadEUPassportEvidenceEpp();
        await pages.uploadCertificateOfConductEppNLPage.uploadCertificateConductEpp();
    } else {
        await pages.whichIdentityDocUseEppNLPage.answerIdentityUKDrivingLicence();
        await pages.uploadUKDrivingLicenceEvidenceEppNLPage.uploadUKDrivingLicenceEpp();
    }
}

async function chooseIdentityDocumentAndUploadEvidenceReplace(pages: Pages, identityDocument: string) {
    if (identityDocument === 'British passport' || identityDocument === 'British Passport') {
        await pages.whichIdentityDocumentDoYouUseRepPage.answerIdentityDocBritishPassport();
        await pages.uploadBritishPassportRepPage.answerBritishPassport();
        return;
    }

    if (identityDocument.includes('Passport from the EU') || identityDocument === 'EEA passport') {
        await pages.whichIdentityDocumentDoYouUseRepPage.answerIdentityDocEU();
        await pages.uploadPassportRepPage.answerEUPassport();
        await pages.uploadCertificateOfGoodConductRepPage.answerCertificateOfGoodConduct();
        return;
    }

    await pages.whichIdentityDocumentDoYouUseRepPage.answerIdentityUKDrivingLicence();
    await pages.uploadUKDrivingLicenceRepPage.answerUKDrivingLicence();
}

async function answerCounterIdentityDoc(pages: Pages, counterDoc: string, amend: boolean) {
    if (amend) {
        if (counterDoc === 'British passport') {
            await pages.counterSignatoryIdentityDocumentsAmendLicencePage.britishPassportCounterSignatoryIdentityDocumentsAmendLicence();
        } else if (counterDoc.includes('Passport from the EU')) {
            await pages.counterSignatoryIdentityDocumentsAmendLicencePage.EEAPassportCounterSignatoryIdentityDocumentsAmendLicence();
        } else {
            await pages.counterSignatoryIdentityDocumentsAmendLicencePage.UKDrivingLicenceCounterSignatoryIdentityDocumentsAmendLicence();
        }
        return;
    }

    if (counterDoc === 'British passport') {
        await pages.counterSignatoryIdentityDocumentsEppNLPage.britishPassportCounterSignatoryIdentityDocuments();
    } else if (counterDoc.includes('Passport from the EU')) {
        await pages.counterSignatoryIdentityDocumentsEppNLPage.EEAPassportCounterSignatoryIdentityDocuments();
    } else {
        await pages.counterSignatoryIdentityDocumentsEppNLPage.UKDrivingLicenceCounterSignatoryIdentityDocuments();
    }
}

async function answerCounterSignatoryIdentityReplace(pages: Pages, counterDoc: string) {
    if (counterDoc === 'British passport' || counterDoc === 'British Passport') {
        await pages.counterSignatoryIdentityDocumentRepPage.answerCounterSignatoryDocBritishPassport();
    } else if (counterDoc.includes('Passport from the EU') || counterDoc === 'EEA passport') {
        await pages.counterSignatoryIdentityDocumentRepPage.answerCounterSignatoryDocEU();
    } else {
        await pages.counterSignatoryIdentityDocumentRepPage.answerCounterSignatoryDocUKDrivingLicence();
    }
}

async function replaceCommonQuestions(pages: Pages, data: EppScenarioData) {
    await pages.enterYourLicenceNumberRepPage.answerLicenceNumber();
    await pages.whatIsYourNameOnTheLicenceRepPage.answerNameOnLicence();
    await pages.whatIsYourDOBRepPage.answerDOB();
    await pages.whatIsYourHomeAddressRepPage.answerHomeAddress();
    await pages.whatAreYourContactDetailsRepPage.answerContactDetails();

    if (data.haveAnyOfYourDetailsChangedSinceLicence === 'Yes') {
        await pages.haveAnyOfYourDetailsChangedRepPage.answerYesHaveDetailsChanged();
        if (data.doYouNeedToAmendYourNameOnTheLicence === 'Yes') {
            await pages.amendLicenceDetailsRepPage.answerYesLicenceDetails();
            await pages.whatIsYourNewNameRepPage.answerNameOnLicence();
            await chooseIdentityDocumentAndUploadEvidenceReplace(pages, data.whichIdentityDocumentDoYouWantToUse);
        } else {
            await pages.amendLicenceDetailsRepPage.answerNoLicenceDetails();
        }
    } else {
        await pages.haveAnyOfYourDetailsChangedRepPage.answerNoHaveDetailsChanged();
    }
}

async function answerChangeInHomeAddressReplace(pages: Pages, data: EppScenarioData) {
    if (data.doYouNeedToAmendYourHomeAddressOnTheLicence === 'Yes') {
        await pages.changeInHomeAddressRepPage.answerYesChangeInHomeAddress();
        await pages.whatIsYourNewAddressRepPage.answerNewAddress();
        await pages.uploadProofOfAddressRepPage.answerProofOfAddress();
    } else {
        await pages.changeInHomeAddressRepPage.answerNoChangeInHomeAddress();
    }
}

async function answerSubstanceReplace(pages: Pages, data: EppScenarioData) {
    if (data.doYouNeedToAmendTheSubstanceOnYourLicence === 'Yes') {
        await pages.changeInSubstancesRepPage.answerYesChangeInSubstances();
    } else {
        await pages.changeInSubstancesRepPage.answerNoChangeInSubstances();
    }
}

async function answerRegulatedEPReplace(pages: Pages, data: EppScenarioData) {
    if (data.doYouNeedToAmendTheExplosivesPrecursorsOnYourLicence === 'Yes') {
        await pages.amendEPOnLicenceRepPage.answerYesAmendEPRep();
        await selectEPFromList(pages, data.selectAnExplosivesPrecursor);
        await pages.ePDetailsRepPage.answerAmmoniumNitrate();
        await pages.explosivesPrecursorsSummaryRepPage.explosiveAndPrecursorsSummaryRep();
    } else {
        await pages.amendEPOnLicenceRepPage.answerNoAmendEPRep();
    }
}

async function answerRegulatedPoisonReplace(pages: Pages, data: EppScenarioData) {
    if (data.doYouNeedToAmendThePoisonsOnYourLicence === 'Yes') {
        await pages.regulatedPoisonsRepPage.answerYesRegulatedPoison();
        await selectPoisonFromList(pages, data.tellUsWhichPoisonsYouWantToImportAcquireUseOrPossess);
        await pages.poisonDetailsRepPage.answerDNP();
        await pages.poisonLicenceSummaryRepPage.PoisonOnLicenceSummaryRep();
    } else {
        await pages.regulatedPoisonsRepPage.answerNoRegulatedPoison();
    }
}

async function openEppPage(pages: Pages, data: EppScenarioData) {
    await pages.homePageEppPage.openEPPPage();
    await pages.whatTypeOfApplicationPage.assertPageTitle();

    switch (data.whatTypeOfApplicationDoYouNeedToMake) {
        case 'Apply for a new licence':
            await pages.whatTypeOfApplicationPage.clickApplyNewLicence();
            break;
        case 'Amend a licence':
            await pages.whatTypeOfApplicationPage.clickAmendLicence();
            break;
        case 'Renew a licence':
            await pages.whatTypeOfApplicationPage.clickRenewApplication();
            break;
        case 'Replace a licence':
            await pages.whatTypeOfApplicationPage.clickReplaceApplication();
            await answerWhyDoYouNeedRepLicence(pages, data);
            await replaceCommonQuestions(pages, data);
            break;
        default:
            throw new Error(`Unsupported application type: ${data.whatTypeOfApplicationDoYouNeedToMake}`);
    }
}

async function applyForNewLicenceRouteAnswer(pages: Pages, data: EppScenarioData, includeDeclaration = true) {
    await pages.namePageNLPage.answerNameDetails();
    if (data.haveYouEverUsedAnyOtherNames === 'Yes') {
        await pages.namePageNLPage.answerYesToOtherNameQuestion();
        await pages.otherNamesPageNLPage.answerOtherNameDetails();
        await pages.otherNamesSummaryPageNLPage.answerOtherNamesSummary();
    } else {
        await pages.namePageNLPage.answerNoToOtherNameQuestion();
    }

    await pages.yourDetailsPageNLPage.answerYourDetails(data);
    if (data.doYouHaveMoreThanOneNationality === 'Yes') {
        await pages.otherNationalitiesEppNLPage.answerOtherNationalitiesQuestions();
    }

    await pages.whatIsHomeAddressPageNLPage.answerHomeAddress();
    await pages.previousAddressPageNLPage.answerPreviousHomeAddress();
    await pages.summaryPreviousAddressLast5YearsEppNLPage.answerSummaryForPreviousAddress();
    await pages.uploadProofOfAddressEppNLPage.answerEPPAddressProofUpload();

    await pages.whatAreYourContactDetailsNLPage.whatAreYourContactDetailsEPP();
    await chooseIdentityDocumentAndUploadEvidence(pages, data);

    await pages.otherLicencesEppNLPage.selectOtherLicences('firearms', data.doYouHaveOrHaveYouEverHadAFirearmsLicence === 'Yes' ? 'Yes' : 'No');
    await pages.otherLicencesEppNLPage.selectOtherLicences('shotgun', data.doYouHaveOrHaveYouEverHadAShotgunLicence === 'Yes' ? 'Yes' : 'No');
    const refusedOrRevoked = data.haveYouEverHadAShotgunOrFirearmsLicenceRefusedOrRevoked === 'Yes';
    await pages.otherLicencesEppNLPage.selectOtherLicences('refused', refusedOrRevoked ? 'Yes' : 'No');
    await pages.otherLicencesEppNLPage.clickContinueButton();

    if (refusedOrRevoked) {
        await pages.addRefusedRevokedLicenceEppNLPage.reasonAndDateFirearmRefused();
        await pages.refusedLicenceHistoryEppNLPage.addAnotherRefusal();
        await pages.addRefusedRevokedLicenceEppNLPage.reasonAndDateShotGunRefused();
        await pages.refusedLicenceHistoryEppNLPage.revokedLicenceHistory();
    }

    if (data.doYouHaveACriminalRecord === 'Yes') {
        await pages.criminalRecordWarningsEppNLPage.answerYesCriminalQuestions();
        await pages.addCriminalRecordEntryEppNLPage.answerCriminalRecordEntry();
        await pages.criminalRecordSummaryEppNLPage.addAnotherCriminalRecord();
        await pages.addCriminalRecordEntryEppNLPage.answerCriminalRecordEntry();
        await pages.criminalRecordSummaryEppNLPage.reviewSummaryContinue();
    } else {
        await pages.criminalRecordWarningsEppNLPage.answerNoCriminalQuestions();
    }

    await pages.medicalDeclarationEppNLPage.MedicalDeclareEpp();
    await pages.yourMedicalHistoryEppNLPage.selectMedicalAdviceAndReceivedTreatment('has-seen-doctor', data.inTheLast10YearsHaveYouSeenADoctor === 'Yes' ? 'Yes' : 'No');
    await pages.yourMedicalHistoryEppNLPage.selectMedicalAdviceAndReceivedTreatment('received-treatment', data.haveYouEverHadOrReceivedTreatmentForAnyDrugOrAlcoholrelatedHealthProblems === 'Yes' ? 'Yes' : 'No');
    await pages.yourMedicalHistoryEppNLPage.clickContinueButton();
    if (data.haveYouEverHadOrReceivedTreatmentForAnyDrugOrAlcoholrelatedHealthProblems === 'Yes') {
        await pages.uploadMedicalFormEppNLPage.uploadMedicalFormEpp();
    }
    await pages.doctorContactDetailsEppNLPage.answerDoctorContactDetails();

    if (data.doesYourLicenceNeedToCoverExplosivesPrecursors === 'Yes') {
        await pages.regulatedEpNLPage.selectRegulatedEPRadioButton('yes');
        await selectEPFromList(pages, data.selectAnExplosivesPrecursor);
        await pages.ammoniumNitrateOrAbove16NitrogenNLPage.answerAmmoniumNitrate();
        await pages.explosivesPrecursorSummaryNLPage.explosiveAndPrecursorsSummary();
    } else {
        await pages.regulatedEpNLPage.selectRegulatedEPRadioButton('no');
    }

    if (data.doesYourLicenceNeedToCoverPoisons === 'Yes') {
        await pages.regulatedPoisonsEppNLPage.selectRegulatedPoisonRadioButton('yes');
        await selectPoisonFromList(pages, data.tellUsWhichPoisonsYouWantToImportAcquireUseOrPossess);
        await pages.dnpPoisonEppNLPage.answerDNP();
        await pages.poisonsOnLicenceSummaryNLPage.PoisonOnLicenceSummary();
    } else {
        await pages.regulatedPoisonsEppNLPage.selectRegulatedPoisonRadioButton('no');
    }

    if (includeDeclaration) {
        await pages.counterDetailsEppNLPage.answerCounterSignatoryDetails();
        await pages.counterSignatoryAddressNLPage.answerCounterSignatoryAddress();
        await pages.counterSignatoryContactDetailsEppNLPage.answerCounterSignatoryContactDetails();
        await answerCounterIdentityDoc(pages, data.whatIsYourCountersignatorysIdentityDocument, false);
        await pages.checkYourAnswerNewAppEppNLPage.newAppSummaryPage();
    }
}

async function amendLicenceRoute(pages: Pages, data: EppScenarioData) {
    await pages.licenceNumberPage.enterLicenceNumberToAmend();
    await pages.whatIsNameOnLicencePage.answerNameOnLicence();
    await pages.dateOfBirthForLicencePage.answerDobLicence();
    await pages.whatIsYourHomeAddressAmendLicencePage.homeAddressAmendLicence();
    await pages.whatAreYourContactDetailsAmendLicencePage.whatAreYourContactDetailsAmend();

    if (data.doYouNeedToAmendYourNameOnTheLicence === 'Yes') {
        await pages.amendLicenceDetailsPage.answerYesAmendLicenceDetails();
        await pages.whatIsYourNewNameAmendLicencePage.answerYourNewName();
        await chooseIdentityDocumentAndUploadEvidence(pages, data);
    } else {
        await pages.amendLicenceDetailsPage.answerNoAmendLicenceDetails();
    }

    if (data.doYouNeedToAmendYourHomeAddressOnTheLicence === 'Yes') {
        await pages.changeInHomeAddressAmendLicencePage.answerYesAmendHomeAddressOnLicence();
        await pages.whatIsYourNewAddressAmendLicencePage.answerNewAddress();
        await pages.uploadProofOfAddressAmendLicencePage.answerEPPAddressProofUpload();
    } else {
        await pages.changeInHomeAddressAmendLicencePage.answerNoAmendHomeAddressOnLicence();
    }

    if (data.doYouNeedToAmendTheSubstanceOnYourLicence === 'Yes') {
        await pages.changeInSubstanceAmendLicencePage.answerYesAmendSubstance();
        if (data.doYouNeedToAmendTheExplosivesPrecursorsOnYourLicence === 'Yes') {
            await pages.regulatedExplosivesPrecursorsPage.answerYesAmendExplosivePrecursorsOnLicence();
            await selectEPFromList(pages, data.selectAnExplosivesPrecursor);
            await pages.explosivesPrecursorSummaryAmendLicencePage.explosiveAndPrecursorsSummaryAmendLicence();
        } else {
            await pages.regulatedExplosivesPrecursorsPage.answerNoAmendExplosivePrecursorsOnLicence();
        }

        if (data.doYouNeedToAmendThePoisonsOnYourLicence === 'Yes') {
            await pages.regulatedPoisonsAmendLicencePage.yesNeedToAmendPoison();
            await selectPoisonFromList(pages, data.tellUsWhichPoisonsYouWantToImportAcquireUseOrPossess);
        } else {
            await pages.regulatedPoisonsAmendLicencePage.noNeedToAmendPoison();
        }
    } else {
        await pages.changeInSubstanceAmendLicencePage.answerNoAmendSubstance();
    }

    await pages.counterDetailsAmendLicencePage.answerCounterSignatoryDetailsAmendLicence();
    await pages.counterSignatoryAddressAmendLicencePage.answerCounterSignatoryAddressAmendLicence();
    await pages.counterSignatoryContactDetailsAmendLicencePage.answerCounterSignatoryContactDetailsAmendLicence();
    await answerCounterIdentityDoc(pages, data.whatIsYourCountersignatorysIdentityDocument, true);
    await pages.checkYourAnswerAmendLicencePage.checkYourAnswers();
    await pages.declarationAmendLicencePage.answerDeclarationAmendLicence();
}

async function licenceStolenReplaceRoute(pages: Pages, data: EppScenarioData) {
    await answerChangeInHomeAddressReplace(pages, data);
    await answerSubstanceReplace(pages, data);
    await answerRegulatedEPReplace(pages, data);
    await answerRegulatedPoisonReplace(pages, data);
    await pages.counterSignatoryDetailsRepPage.answerCounterSignatoryDetails();
    await pages.counterSignatoryAddressRepPage.answerCounterSignatoryAddress();
    await pages.counterSignatoryContactDetailsRepPage.answerCounterSignatoryContactDetails();
    await answerCounterSignatoryIdentityReplace(pages, data.whatIsYourCountersignatorysIdentityDocument);
    await pages.checkYourAnswersRepPage.replaceCheckYouAnswers();
}

async function licenceIsDamagedReplaceRoute(pages: Pages, data: EppScenarioData) {
    await answerChangeInHomeAddressReplace(pages, data);
    await answerSubstanceReplace(pages, data);
    await pages.counterSignatoryDetailsRepPage.answerCounterSignatoryDetails();
    await pages.counterSignatoryAddressRepPage.answerCounterSignatoryAddress();
    await pages.counterSignatoryContactDetailsRepPage.answerCounterSignatoryContactDetails();
    await answerCounterSignatoryIdentityReplace(pages, data.whatIsYourCountersignatorysIdentityDocument);
    await pages.checkYourAnswersRepPage.replaceCheckYouAnswers();
}

async function assertDeclarationPage(page: any) {
    await page.locator('h1').first().waitFor({ state: 'visible' });
    const text = (await page.locator('h1').first().innerText()).toLowerCase();
    if (!text.includes('declaration') && !text.includes('check your answers') && !text.includes('payment')) {
        throw new Error(`Expected declaration-like page, got heading: ${text}`);
    }
}

Given('Test data has been created for {string} scenarios', async ({ }, product: string) => {
    if (product !== 'EPP') {
        throw new Error(`Unsupported product data setup: ${product}`);
    }
});

Given('I selected the data for scenario {string} - {string}', async ({ }, scenarioId: string, _description: string) => {
    scenarioData = getEppScenarioData(scenarioId);
});

When('I visit the EPP page and access application link', async ({ pages }) => {
    await openEppPage(pages, scenarioData);
});

When('I fill out my answers for new application form', async ({ pages }) => {
    await applyForNewLicenceRouteAnswer(pages, scenarioData, true);
});

When('I fill out my answers for new application form e2e', async ({ pages }) => {
    await applyForNewLicenceRouteAnswer(pages, scenarioData, true);
});

When('I complete new application form with all answers set to no and submit the form', async ({ pages }) => {
    await applyForNewLicenceRouteAnswer(pages, scenarioData, false);
});

When('I complete renew application form with all answers set to no and submit the form', async ({ pages }) => {
    await pages.enterYourLicenceNumberRLPage.enterLicenceNumber();
    await applyForNewLicenceRouteAnswer(pages, scenarioData, false);
});

Then('I see page that says you don\'t need to apply for new licence', async ({ pages }) => {
    await pages.applicationSubmittedNewAppEppNLPage.assertPageTitle();
});

Then('I see page that says you don\'t need to apply for renew licence', async ({ pages }) => {
    await pages.youDoNotNeedToApplyForLicencePage.assertPageTitle();
});

When('I fill out my answers for renew application form', async ({ pages }) => {
    await pages.enterYourLicenceNumberRLPage.enterLicenceNumber();
    await applyForNewLicenceRouteAnswer(pages, scenarioData, true);
});

When('I fill out my answers for amend application form', async ({ pages }) => {
    await amendLicenceRoute(pages, scenarioData);
});

Then('I am able to see Amendment form submitted page', async ({ pages }) => {
    await pages.amendmentSubmittedPage.assertPageTitle();
});

When('I fill out my answers for licence was stolen on replace application form', async ({ pages }) => {
    await licenceStolenReplaceRoute(pages, scenarioData);
});

When('I fill out the answer for licence is lost on replace application form', async ({ pages }) => {
    await pages.checkYourAnswersRepPage.replaceCheckYouAnswers();
});

When('I fill out the answer for licence is damaged on replace application form', async ({ pages }) => {
    await licenceIsDamagedReplaceRoute(pages, scenarioData);
});

Then('I am navigated to {string} page', async ({ pages }, pageName: string) => {
    if (pageName !== 'Declaration') {
        throw new Error(`Unexpected page assertion target: ${pageName}`);
    }
    await assertDeclarationPage(pages.homePageEppPage.page);
});

Then('I should see {string} page', async ({ pages }, _pageName: string) => {
    await assertDeclarationPage(pages.homePageEppPage.page);
});
