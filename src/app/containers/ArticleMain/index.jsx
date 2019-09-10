import React from 'react';
import path from 'ramda/src/path';
import { articleDataPropTypes } from '../../models/propTypes/article';
import MetadataContainer from '../Metadata';
import ArticleMetadata from '../ArticleMetadata';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import timestamp from '../ArticleTimestamp';
import { GhostGrid } from '../../lib/styledGrid';
import ATIAnalytics from '../ATIAnalytics';
import ChartbeatAnalytics from '../ChartbeatAnalytics';
import mediaPlayer from '../MediaPlayer';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  audio: mediaPlayer,
  video: mediaPlayer,
  text,
  image,
  timestamp,
};

const ArticleMain = ({ articleData }) => {
  const { content, metadata, promo } = articleData;
  const { blocks } = content.model;

  return (
    <>
      <ATIAnalytics data={articleData} />
      <ChartbeatAnalytics data={articleData} />
      <MetadataContainer metadata={metadata} promo={promo} />
      <ArticleMetadata
        firstPublished={path('firstPublished', metadata)}
        lastPublished={path('lastPublished', metadata)}
        articleSection={path('passport', 'genre', metadata)}
        aboutTags={path('tags', 'about', metadata)}
        mentionsTags={path('tags', 'mentions', metadata)}
      />
      <main role="main">
        <GhostGrid>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </GhostGrid>
      </main>
    </>
  );
};

ArticleMain.propTypes = {
  articleData: articleDataPropTypes.isRequired,
};

export default ArticleMain;
