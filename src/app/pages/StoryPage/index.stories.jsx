import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';

import { StoryPage } from '..';
import mundoPageData from './fixtureData/mundo';
import persianPageData from './fixtureData/persian';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

const withSecondaryColumnsKnob = pageData => storyFn => {
  const options = {
    'without Top Stories': 'topStories',
    'without Features': 'features',
    'without Features & Top Stories': ['features', 'topStories'],
    default: '',
  };
  const selectedColumns = select(
    'Select secondary column options',
    options,
    '',
    'STY-SECONDARY-COLUMN',
  );

  const secondaryColumn = {
    ...(!selectedColumns.includes('topStories') && {
      topStories: pageData.secondaryColumn.features,
    }),
    ...(!selectedColumns.includes('features') && {
      features: pageData.secondaryColumn.features,
    }),
  };

  const storyProps = {
    data: {
      ...pageData,
      secondaryColumn,
    },
  };
  return storyFn(storyProps);
};
[
  {
    service: 'mundo',
    pageData: mundoPageData,
  },
  {
    service: 'persian',
    pageData: persianPageData,
  },
].forEach(({ service, pageData }) => {
  return storiesOf('Pages/Story Page', module)
    .addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>)
    .addDecorator(withKnobs)
    .addDecorator(withSecondaryColumnsKnob(pageData))
    .add(service, () => {
      return (
        <BrowserRouter>
          <StoryPage
            pageType={STORY_PAGE}
            isAmp={false}
            pathname="/path"
            status={200}
            pageData={pageData}
            service={service}
            mostReadEndpointOverride="./data/mundo/mostRead/index.json"
            toggles={{
              eventTracking: {
                enabled: true,
              },
            }}
          />
        </BrowserRouter>
      );
    });
});
