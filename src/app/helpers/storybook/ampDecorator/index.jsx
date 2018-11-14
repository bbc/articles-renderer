import React from 'react';
import { Helmet } from 'react-helmet';

const ampNoscriptStyling = `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`;
const ampScriptStyling = `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`;

const AmpDecorator = storyFn => (
  <div>
    <Helmet htmlAttributes={{ amp: '' }}>
      <link rel="canonical" href="http://foobar.com" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,minimum-scale=1" />
      <style amp-boilerplate="">{ampScriptStyling}</style>
      <noscript>
        <style amp-boilerplate="">{ampNoscriptStyling}</style>
      </noscript>
      <script async src="https://cdn.ampproject.org/v0.js" />
    </Helmet>
    {storyFn()}
  </div>
);

export default AmpDecorator;
