/**
 * @service pidgin
 * @pathname /pidgin/articles/cwl08rd38l6o
 */

import runA11yTests from '../../common/a11y';
import runHeaderTests from '../../common/header';
import runFootertests from '../../common/footer';
import runSEOtests from '../../common/SEO';
import runPerformanceTests from '../../common/performance';

runA11yTests();
runHeaderTests();
runFootertests();
runSEOtests();
runPerformanceTests();

it('Image with caption', () => {
  const imageEl = document.querySelector(
    'main figure img, main figure amp-img',
  );
  const imageCaptionEl = document.querySelector('main figure figcaption');

  if (imageEl && imageCaptionEl) {
    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toBeTruthy();
    expect(imageEl.getAttribute('src')).toMatchInlineSnapshot(
      `"https://ichef.bbci.co.uk/news/640/cpsdevpb/2d93/test/494cb5d0-dee2-11e9-b23c-f1ac9644bb55.jpg"`,
    );

    expect(imageCaptionEl).toBeInTheDocument();
    expect(imageCaptionEl.textContent).toBeTruthy();
    expect(imageCaptionEl.textContent).toMatchInlineSnapshot(
      `"Wetin we call dis foto, This test image, copyright BBC, shows a map of France. The image is in the first three blocks and has this caption."`,
    );
  }
});
