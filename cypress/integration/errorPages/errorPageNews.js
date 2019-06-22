import config from '../../support/config';
import {
  errorMessage,
  errorPageInlineLink,
  errorTitle,
} from '../../support/bodyTestHelper';
import { describeForLocalOnly } from '../../support/limitEnvRuns';
import news from '../../../src/app/lib/config/services/news';

describe('Article Body Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`${config.assets.newsNonExistent}`, {
      failOnStatusCode: false,
    });
  });

  it('should return a 404 error code and return HTML', () => {
    cy.testResponseCodeAndType(
      `${config.assets.newsNonExistent}`,
      404,
      'text/html',
    );
  });

  describeForLocalOnly(
    'Temporary fix to limit to local Simorgh error page',
    () => {
      it('should have the correct lang & dir attributes', () => {
        cy.hasHtmlLangDirAttributes({ lang: 'en_GB', dir: 'ltr' });
      });
    },
  );

  it('should display a relevant error message on screen', () => {
    cy.visit(`${config.assets.newsNonExistent}`, {
      failOnStatusCode: false,
    });
    errorMessage(news);

    cy.visit(`${config.assets.newsNonExistent}`, {
      failOnStatusCode: false,
    });
    errorMessage(news);
  });

  it('should have an inline link on the page that is linked to the home page', () => {
    errorPageInlineLink(news);
  });

  it('should have a relevant error title in the head', () => {
    errorTitle(news);
  });
});
