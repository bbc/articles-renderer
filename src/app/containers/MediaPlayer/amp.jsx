import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

const AmpSetup = () => (
  <Helmet>
    <script
      async
      custom-element="amp-iframe"
      src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
    />
  </Helmet>
);

const Amp = () => {
  return (
    <Fragment>
      <AmpSetup />

      <amp-iframe
        src="https://www.bbc.co.uk/news/uk-politics-46827301/embed/p06w3lfm?#amp=1"
        width="100%"
        height="100%"
        layout="fill"
        scrolling="no"
        sandbox="allow-scripts allow-same-origin"
      >
        <amp-img
          src="https://ichef.bbci.co.uk/news/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg"
          layout="fill"
          placeholder
        />
      </amp-iframe>
    </Fragment>
  );
};

export default Amp;
