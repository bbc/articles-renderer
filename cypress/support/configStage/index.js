export default {
  baseUrl: 'https://www.stage.bbc.com',
  baseUrlNonSTLD: 'https://www.stage.bbc.com',
  assetUrl: 'https://news.files.bbci.co.uk/include/articles/public',
  assetOrigin: 'https://news.files.bbci.co.uk',
  atiAnalyticsWSBucket: '598342',
  services: {
    // Proof we can add all services in this config file, even without coding anything.
    mundo: {
      canonical: undefined,
      errorPages: undefined,
      manifestPath: undefined,
      serviceWorkerPath: undefined,
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
    news: {
      canonical: 'https://www.bbc.co.uk/news',
      errorPages: '/news/articles/cxvxrj8tvppo',
      manifestPath: '/news/articles/manifest.json',
      serviceWorkerPath: '/news/articles/sw.js',
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: {
          path: '/articles',
          basicAsset: '/news/articles/c8xxl4l3dzeo',
          fullyFeaturedAsset: undefined,
          nonExistent: '/news/articles/cxvxrj8tvppo',
          // Special case
          threeSubheadlines: '/news/articles/c5ll353v7y9o',
          featureFlags: {
            amp: true,
            atiAnalytics: true,
            cookieTests: true,
            dataEndpoint: true,
            header: true,
            footer: true,
            meta: true,
          },
        },
        frontPage: undefined,
      },
    },
    persian: {
      canonical: 'https://www.bbc.co.uk/news',
      errorPages: undefined,
      manifestPath: '/persian/articles/manifest.json',
      serviceWorkerPath: '/persian/articles/sw.js',
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
    igbo: {
      canonical: 'https://www.bbc.co.uk/news',
      errorPages: undefined,
      manifestPath: '/igbo/manifest.json',
      serviceWorkerPath: '/igbo/sw.js',
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
    pidgin: {
      canonical: 'https://www.bbc.co.uk/news',
      errorPages: undefined,
      manifestPath: '/pidgin/manifest.json',
      serviceWorkerPath: '/pidgin/sw.js',
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
    yoruba: {
      canonical: 'https://www.bbc.co.uk/news',
      errorPages: undefined,
      manifestPath: '/yoruba/manifest.json',
      serviceWorkerPath: '/yoruba/sw.js',
      attributes: {
        lang: undefined,
        dir: undefined,
      },
      pageTypes: {
        articles: undefined,
        frontPage: undefined,
      },
    },
  },
};
