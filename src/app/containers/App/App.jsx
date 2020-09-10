import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import pipe from 'ramda/src/pipe';
import { renderRoutes } from 'react-router-config';

import { withRouter } from 'react-router';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import usePrevious from '#lib/utilities/usePrevious';
import getToggles from '#app/lib/utilities/getToggles';
import routes from '#app/routes';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withLoading from '#containers/PageHandlers/withLoading';
import withStickyPlayer from '#containers/PageHandlers/withStickyPlayer';

const updatePageClientSide = async ({
  setState,
  service,
  getInitialData,
  variant,
  pageType,
  pathname,
}) => {
  const routeProps = getRouteProps(pathname);
  const toggles = await getToggles(service);
  const initialData = await getInitialData({
    path: pathname,
    service,
    variant,
    pageType,
    toggles,
  });
  setState({ ...initialData, ...routeProps, pathname, toggles });
};

const setFocusOnMainHeading = () => {
  const mainHeadingEl = document.querySelector('h1#content');

  if (mainHeadingEl) {
    mainHeadingEl.focus();
  }
};

const Routes = pipe(
  withLoading,
  withStickyPlayer,
  withPageWrapper,
  withContexts,
)(props => renderRoutes(routes, props));

export const App = ({ location, initialData, bbcOrigin, history }) => {
  const { pathname } = location;
  const hasMounted = useRef(false);
  const routeProps = getRouteProps(pathname);
  const { service, variant, pageType, getInitialData } = routeProps;
  const previousLocationPath = usePrevious(pathname);
  const previousPath = history.action === 'POP' ? null : previousLocationPath; // clear the previous path on back clicks
  const [state, setState] = useState({
    ...initialData,
    ...routeProps,
    pathname,
    errorCode: routeProps.errorCode || initialData.errorCode, // wat
  });
  const isTransitioningRoutes = state.pathname !== pathname;

  useEffect(() => {
    if (hasMounted.current) {
      updatePageClientSide({
        setState,
        service,
        getInitialData,
        variant,
        pageType,
        pathname,
      });
    } else {
      hasMounted.current = true;
    }
  }, [service, getInitialData, variant, pageType, pathname]);

  useLayoutEffect(() => {
    if (hasMounted.current) {
      if (isTransitioningRoutes) {
        window.scrollTo(0, 0);
      } else {
        setFocusOnMainHeading();
      }
    }
  }, [isTransitioningRoutes]);

  return (
    <Routes
      {...state}
      bbcOrigin={bbcOrigin}
      previousPath={previousPath}
      loading={isTransitioningRoutes}
    />
  );
};

export default withRouter(App);
