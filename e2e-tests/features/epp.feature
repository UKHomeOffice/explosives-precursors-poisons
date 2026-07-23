@EppRegression
Feature: EPP- Explosives precursors and poisons licensing

  Background:
    Given Test data has been created for "EPP" scenarios

  @EppRegressionCI
  Scenario Outline: EPP Test 1 - New application for licence
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the EPP page and access application link
    And I complete new application form with all answers set to no and submit the form
    Then I see page that says you don't need to apply for new licence
    Examples:
      | Scenario ID | Description                      |
      | 1           | New Licence all answers no route |

## Note: Submit payment page cannot be automated in CI due to whitelisting issue.
## Hence, the below scenarios are commented out for now.
  @EppRegressionCI
  Scenario Outline: EPP Test 2 - New application for licence
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the EPP page and access application link
    And I fill out my answers for new application form
    Then I am navigated to "Declaration" page
    Examples:
      | Scenario ID | Description |
      | 2           | New Licence |
      | 3           | New Licence |

## Note: Submit payment page cannot be automated in CI due to whitelisting issue.
## Hence, the below scenarios are commented out for now.
  @EppRegressionCI
  Scenario Outline: EPP Test 3 - Renew application for licence
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the EPP page and access application link
    And I fill out my answers for renew application form
    Then I am navigated to "Declaration" page
    Examples:
      | Scenario ID | Description                           |
      | 4           | Renew a application- British passport |
      | 5           | Renew my application- EU passport     |

  Scenario Outline: EPP Test 4 - Renew application for licence answering no to all questions
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the EPP page and access application link
    And I complete renew application form with all answers set to no and submit the form
    Then I see page that says you don't need to apply for renew licence
    Examples:
      | Scenario ID | Description                                |
      | 6           | Renew a application with no to all answers |

  @EppRegressionCI
  Scenario Outline: EPP Test 5 - Amend application for licence
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the EPP page and access application link
    And I fill out my answers for amend application form
    Then I am able to see Amendment form submitted page
    Examples:
      | Scenario ID | Description     |
      | 7           | Amend a licence |
      | 8           | Amend a licence |

## Note: Submit payment page cannot be automated in CI due to whitelisting issue.
## Hence, the below scenarios are commented out for now.
  @EppRegressionCI
  Scenario Outline: EPP Test 6 - Replace application for licence
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the EPP page and access application link
    And I fill out my answers for licence was stolen on replace application form
    Then I am navigated to "Declaration" page
    Examples:
      | Scenario ID | Description        |
      | 9           | Licence was Stolen |

## Note: Submit payment page cannot be automated in CI due to whitelisting issue.
## Hence, the below scenarios are commented out for now.
  @EppRegressionCI
  Scenario Outline: EPP Test 7 - Replace application for licence
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the EPP page and access application link
    And I fill out the answer for licence is lost on replace application form
    Then I am navigated to "Declaration" page
    Examples:
      | Scenario ID | Description     |
      | 10          | Licence is Lost |

## Note: Submit payment page cannot be automated in CI due to whitelisting issue.
## Hence, the below scenarios are commented out for now.
  @EppRegressionCI
  Scenario Outline: EPP Test 8 - Replace application for licence
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit the EPP page and access application link
    And I fill out the answer for licence is damaged on replace application form
    Then I am navigated to "Declaration" page
    Examples:
      | Scenario ID | Description        |
      | 11          | Licence is Damaged |



  # # Note: This is commented out because payment page cannot be react in jenkins due to whitelisting issue
  # Scenario Outline: EPP Test E2E New application
  #   Given I selected the data for scenario "<Scenario ID>" - "<Description>"
  #   When I visit the EPP page and access application link
  #   And I fill out my answers for new application form e2e
  #   Then I should see "Enter payment details" page
  #   Examples:
  #     | Scenario ID | Description |
  #     | 2           | New Licence |
  #     | 3           | New Licence |