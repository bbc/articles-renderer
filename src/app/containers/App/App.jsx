import { useEffect, useState, useRef } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import path from 'ramda/src/path';
import getRouteProps from '../../routes/getInitialData/utils/getRouteProps';
import usePrevious from '#lib/utilities/usePrevious';

export const App = ({ routes, location, initialData, bbcOrigin, history }) => {
  const {
    service,
    isAmp,
    variant,
    id,
    route: { pageType },
  } = getRouteProps(routes, location.pathname);

  const { pageData, secondaryData, status, error } = initialData;

  const [state, setState] = useState({
    pageData,
    secondaryData,
    status,
    service,
    variant,
    id,
    isAmp,
    pageType,
    error,
    loading: false,
  });

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Only update on subsequent page renders
      const {
        service: nextService,
        variant: nextVariant,
        id: nextId,
        isAmp: nextIsAmp,
        route,
      } = getRouteProps(routes, location.pathname);

      setState({
        pageData: null,
        // set this to null & components handle data fetching themselves after server render
        // alternative - keep this data in context and pass functions to components to update
        secondaryData: null,
        status: null,
        service: nextService,
        variant: nextVariant,
        id: nextId,
        isAmp: nextIsAmp,
        pageType: route.pageType,
        loading: true,
        error: null,
      });

      route.getInitialData(location.pathname).then(data =>
        setState(prevState => ({
          ...prevState,
          loading: false,
          pageData: path(['pageData'], data),
          status: path(['status'], data),
          error: path(['error'], data),
        })),
      );
    }
  }, [routes, location.pathname]);

  const previousLocationPath = usePrevious(location.pathname);

  // clear the previous path on back clicks
  const previousPath = history.action === 'POP' ? null : previousLocationPath;
  return renderRoutes(routes, {
    ...state,
    bbcOrigin,
    pathname: location.pathname,
    previousPath,
  });
};

export default withRouter(App);
