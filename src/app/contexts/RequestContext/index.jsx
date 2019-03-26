import React from 'react';
import { node, string, func, shape } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import getOriginContext from './getOriginContext';

const RequestContext = React.createContext('default');

export const RequestContextProvider = ({
  children,
  platform,
  bbcOrigin,
  service,
  articleData,
}) => {
  const value = {
    platform,
    ...getOriginContext(bbcOrigin, service, articleData),
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

export const RequestContextConsumer = ({ children }) => (
  <RequestContext.Consumer>{children}</RequestContext.Consumer>
);

RequestContextProvider.propTypes = {
  children: node.isRequired,
  platform: string.isRequired,
  bbcOrigin: string,
  service: string.isRequired,
  articleData: shape(articlePropTypes).isRequired,
};

RequestContextProvider.defaultProps = {
  bbcOrigin: null,
};

RequestContextConsumer.propTypes = {
  children: func.isRequired,
};
