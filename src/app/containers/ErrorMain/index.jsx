import React, { useContext } from 'react';
import { number, oneOf, string, shape } from 'prop-types';
import Helmet from 'react-helmet';
import Grid, { GelPageGrid } from '#app/components/Grid';
import { ServiceContext } from '#contexts/ServiceContext';
import ErrorPageComponent from '#app/components/ErrorPage';

/*
 * MVP Metadata for the error
 * This will be refactored out in https://github.com/bbc/simorgh/issues/1350
 */
const ErrorMetadata = ({ dir, lang, messaging, brandName, themeColor }) => {
  const { title } = messaging;

  const pageTitle = `${title} - ${brandName}`;

  return (
    <Helmet htmlAttributes={{ lang, dir }}>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet="utf-8" />
      <meta name="robots" content="noindex,nofollow" />
      <meta name="theme-color" content={themeColor} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <title>{pageTitle}</title>
      <meta name="og:description" content={title} />
      <meta name="og:title" content={pageTitle} />
      <meta name="twitter:description" content={title} />
      <meta name="twitter:title" content={pageTitle} />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </Helmet>
  );
};

const ErrorMain = ({ status }) => {
  const {
    brandName,
    dir,
    lang,
    script,
    service,
    themeColor,
    translations,
  } = useContext(ServiceContext);
  const messaging = translations.error[status] || translations.error[500];

  return (
    <>
      <ErrorMetadata
        brandName={brandName}
        dir={dir}
        lang={lang}
        messaging={messaging}
        themeColor={themeColor}
      />
      <GelPageGrid
        forwardedAs="main"
        role="main"
        columns={{
          group0: 6,
          group1: 6,
          group2: 6,
          group3: 6,
          group4: 8,
          group5: 20,
        }}
        enableGelGutters
        enableGelMargins
      >
        <Grid
          item
          startOffset={{
            group0: 1,
            group1: 1,
            group2: 1,
            group3: 1,
            group4: 2,
            group5: 5,
          }}
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 5,
            group4: 5,
            group5: 10,
          }}
        >
          <ErrorPageComponent
            {...messaging}
            script={script}
            service={service}
          />
        </Grid>
      </GelPageGrid>
    </>
  );
};

ErrorMain.propTypes = {
  status: number.isRequired,
};

ErrorMetadata.propTypes = {
  dir: oneOf(['rtl', 'ltr']).isRequired,
  lang: string.isRequired,
  messaging: shape({ title: string.isRequired }).isRequired,
  brandName: string.isRequired,
  themeColor: string.isRequired,
};

export default ErrorMain;
