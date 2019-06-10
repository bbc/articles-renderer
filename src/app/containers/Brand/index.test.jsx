import React from 'react';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';
import BrandContainer from './index';
import { ServiceContext } from '../../contexts/ServiceContext';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

const newsServiceContextStub = {
  brandName: 'BBC News',
  brandSVG,
};

const igboServiceContextStub = {
  brandName: 'BBC News Ìgbò',
  brandSVG,
};

const BrandContainerWithContext = context => (
  <ServiceContext.Provider value={context}>
    <BrandContainer />
  </ServiceContext.Provider>
);

describe(`BrandContainer`, () => {
  shouldMatchSnapshot(
    'should render correctly',
    BrandContainerWithContext(newsServiceContextStub),
  );
});

describe(`BrandContainer with Igbo context`, () => {
  shouldMatchSnapshot(
    'should render correctly',
    BrandContainerWithContext(igboServiceContextStub),
  );
});
