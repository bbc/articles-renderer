import React from 'react';
import { filterForBlockType } from '../../helpers/blockHandlers';
import { imageModelPropTypes } from '../../models/propTypes/image';
import Figure from '../Figure';

const getText = ({ model }) => model.blocks[0].model.blocks[0].model.text;

const getCaption = block => {
  if (!block) {
    return null;
  }
  return getText(block);
};

const getCopyright = copyrightHolder => {
  if (copyrightHolder === 'BBC') {
    return null;
  }

  const copyrightOffscreenText = 'Copyright';
  const copyrightText = `${copyrightOffscreenText} ${copyrightHolder}`;

  return copyrightText;
};

const ImageContainer = ({ blocks }) => {
  if (!blocks) {
    return null;
  }

  const rawImageBlock = filterForBlockType(blocks, 'rawImage');
  const altTextBlock = filterForBlockType(blocks, 'altText');
  const captionBlock = filterForBlockType(blocks, 'caption');

  if (!rawImageBlock || !altTextBlock) {
    return null;
  }

  const hardcodedImageWidth = 728;
  const { locator, copyrightHolder, height, width } = rawImageBlock.model;
  const altText = getText(altTextBlock);
  const copyright = getCopyright(copyrightHolder);
  const caption = getCaption(captionBlock);
  const ratio = height / width;
  const reservedImageHeight = hardcodedImageWidth * ratio;
  const rawImageSrc = `https://ichef.bbci.co.uk/news/${hardcodedImageWidth}${locator}`;

  return (
    <Figure
      src={rawImageSrc}
      alt={altText}
      reservedImageHeight={reservedImageHeight}
      copyright={copyright}
      caption={caption}
    />
  );
};

ImageContainer.propTypes = imageModelPropTypes;

export default ImageContainer;
