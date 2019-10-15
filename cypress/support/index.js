import './commands';

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

Cypress.on(`window:before:load`, win => {
  cy.stub(win.console, `error`, msg => {
    cy.now(`task`, `error`, msg);
    throw new Error(msg);
  });
});

Cypress.on('fail', error => {
  // eslint-disable-next-line no-console
  console.log('One Cypress test has failed, this is the:', error);
  Cypress.runner.stop();
  process.exit(1);
  throw error; // throw error to have test fail
});
