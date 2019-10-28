const config = {
  live: {
    baseUrl: 'https://www.bbc.com',
    dataUrl: 'https://www.bbc.com',
    assetUrl: 'https://news.files.bbci.co.uk/include/articles/public',
    assetOrigin: 'https://news.files.bbci.co.uk',
    atiAnalyticsWSBucket: '598342',
    atiAnalyticsGNLBucket: '598289',
    atiAnalyticsPlaceholderBucket: '598295',
    atiUrl: 'https://a1.api.bbc.co.uk/hit.xiti?',
    chartbeatEnabled: false,
    avEmbedBaseUrl: 'https://www.bbc.com',
  },
  test: {
    baseUrl: 'https://www.test.bbc.com',
    dataUrl: 'https://www.test.bbc.com',
    assetUrl: 'https://news.test.files.bbci.co.uk/include/articles/public',
    assetOrigin: 'https://news.test.files.bbci.co.uk',
    atiAnalyticsWSBucket: '598343',
    atiAnalyticsGNLBucket: '598290',
    atiAnalyticsPlaceholderBucket: '598297',
    atiUrl: 'https://logws1363.ati-host.net?',
    chartbeatEnabled: true,
    avEmbedBaseUrl: 'https://www.test.bbc.com',
  },
  local: {
    baseUrl: 'http://localhost:7080',
    dataUrl: 'http://localhost:7080',
    assetUrl: 'http://localhost:7080',
    assetOrigin: 'http://localhost:7080',
    atiAnalyticsWSBucket: '598343',
    atiAnalyticsGNLBucket: '598290',
    atiAnalyticsPlaceholderBucket: '598297',
    atiUrl: 'https://logws1363.ati-host.net?',
    chartbeatEnabled: false,
    avEmbedBaseUrl: 'https://www.test.bbc.com',
  },
};

const geoLocate = (conf, isUk = false) => {
  if (!isUk) return conf;

  // eslint-disable-next-line no-param-reassign
  conf.baseUrl = conf.baseUrl.replace('.com', '.co.uk');
  // eslint-disable-next-line no-param-reassign
  conf.dataUrl = conf.dataUrl.replace('.com', '.co.uk');

  return conf;
};

module.exports =
  typeof Cypress !== 'undefined'
    ? geoLocate(config[Cypress.env('APP_ENV')], Cypress.env('UK'))
    : (env, uk) => geoLocate(config[env], uk);
