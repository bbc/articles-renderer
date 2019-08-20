import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import * as getStatsDestination from './getStatsDestination';
import * as getStatsPageIdentifier from './getStatsPageIdentifier';
import * as getOriginContext from './getOriginContext';
import * as getEnv from './getEnv';
import * as getMetaUrls from './getMetaUrls';

const { RequestContextProvider, RequestContext } = require('./index');

const Component = () => {
  useContext(RequestContext);
  return null;
};

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn().mockImplementation(original.useContext),
  };
});

jest.mock('./getStatsDestination');
jest.mock('./getStatsPageIdentifier');
jest.mock('./getOriginContext');
jest.mock('./getEnv');
jest.mock('./getMetaUrls');

getStatsDestination.default.mockReturnValue('getStatsDestination');
getStatsPageIdentifier.default.mockReturnValue('getStatsPageIdentifier');
getOriginContext.default.mockReturnValue({ isUK: true, origin: 'origin' });
getEnv.default.mockReturnValue('getEnv');
getMetaUrls.default.mockReturnValue({
  canonicalLink: 'http://localhost.bbc.com:7080/service/',
  ampLink: 'http://localhost.bbc.com:7080/service.amp',
  canonicalUkLink: 'http://localhost.bbc.co.uk:7080/service',
  ampUkLink: 'http://localhost.bbc.co.uk:7080/service.amp',
  canonicalNonUkLink: 'http://localhost.bbc.com:7080/service',
  ampNonUkLink: 'http://localhost.bbc.com:7080/service.amp',
});

const input = {
  bbcOrigin: 'bbcOrigin',
  id: 'id',
  isAmp: true,
  pageType: 'frontPage',
  service: 'service',
  serviceVariant: null,
  previousPath: '/previous-path',
};

const expectedOutput = {
  env: 'getEnv',
  id: input.id,
  isUK: true,
  origin: 'origin',
  pageType: input.pageType,
  platform: 'amp',
  statsDestination: 'getStatsDestination',
  statsPageIdentifier: 'getStatsPageIdentifier',
  previousPath: '/previous-path',
  canonicalLink: 'http://localhost.bbc.com:7080/service/',
  ampLink: 'http://localhost.bbc.com:7080/service.amp',
  canonicalUkLink: 'http://localhost.bbc.co.uk:7080/service',
  ampUkLink: 'http://localhost.bbc.co.uk:7080/service.amp',
  canonicalNonUkLink: 'http://localhost.bbc.com:7080/service',
  ampNonUkLink: 'http://localhost.bbc.com:7080/service.amp',
};

describe('RequestContext', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return expected values', () => {
    render(
      <RequestContextProvider {...input}>
        <Component />
      </RequestContextProvider>,
    );

    expect(getStatsDestination.default).toHaveBeenCalledWith({
      env: 'getEnv',
      isUK: true,
      service: 'service',
    });

    expect(getStatsPageIdentifier.default).toHaveBeenCalledWith({
      id: 'id',
      pageType: 'frontPage',
      service: 'service',
    });

    expect(getOriginContext.default).toHaveBeenCalledWith('bbcOrigin');

    expect(getEnv.default).toHaveBeenCalledWith('origin');

    expect(getMetaUrls.default).toHaveBeenCalledWith(
      'origin',
      'service',
      null,
      'frontPage',
      'id',
    );

    expect(React.useContext).toHaveReturnedWith(expectedOutput);
  });

  describe('platform', () => {
    it('should be "amp" when isAmp is true', () => {
      render(
        <RequestContextProvider {...input} isAmp>
          <Component />
        </RequestContextProvider>,
      );

      expect(React.useContext).toHaveReturnedWith({
        ...expectedOutput,
        platform: 'amp',
      });
    });

    it('should be "canonical" when isAmp is false', () => {
      render(
        <RequestContextProvider {...input} isAmp={false}>
          <Component />
        </RequestContextProvider>,
      );

      expect(React.useContext).toHaveReturnedWith({
        ...expectedOutput,
        platform: 'canonical',
      });
    });
  });
});
