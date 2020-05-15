// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) =>
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('On Demand Radio body', () => {
      it('should render a H1, which contains/displays a styled headline', () => {
        cy.request(`${Cypress.env('currentPath')}.json?renderer_env=live`).then(
          ({ body }) => {
            cy.get('h1').should('contain', body.promo.headlines.headline);
          },
        );
      });

      it('should render a paragraph, which contains/displays a styled summary', () => {
        cy.request(`${Cypress.env('currentPath')}.json?renderer_env=live`).then(
          ({ body }) => {
            cy.get('[role="main"] p').should(
              'contain',
              body.promo.media.synopses.medium,
            );
          },
        );
      });
    });

    describe('Brand image visible above 400, not visible below 400', () => {
      const sizesBelowBreakpoint = ['iphone-6'];

      sizesBelowBreakpoint.forEach(size => {
        // make assertions on the image using
        // an array of different viewports
        it(`Should display image on ${size} screen`, () => {
          if (Cypress._.isArray(size)) {
            cy.viewport(size[0], size[1]);
          } else {
            cy.viewport(size);
          }

          cy.visit(`${Cypress.env('currentPath')}.amp`);
          // Just using hamburger menu button as an example until the image is on test
          cy.get('nav').find('button').should('be.visible');
        });
      });
    });

    describe('LinkedData', () => {
      // will be addressed by this https://github.com/bbc/simorgh/issues/3117
      it.skip('should include mainEntityOfPage in the LinkedData', () => {
        cy.get('script[type="application/ld+json"]')
          .should('contain', 'mainEntityOfPage')
          .and('contain', 'headline');
      });
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
