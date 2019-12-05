import React from 'react';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import { variantSanitiser, getVariant } from '#lib/utilities/variantHandler';
import {
  getPreferredVariant,
  setPreferredVariant,
} from '#contexts/UserContext/cookies';

const redirect = (location, service, defaultVariant) => {
  const preferredVariant = getPreferredVariant(service);
  return (
    <Redirect
      to={{
        ...location,
        pathname: `${location.pathname}/${preferredVariant || defaultVariant}`,
      }}
    />
  );
};

const withVariant = Component => {
  const VariantContainer = props => {
    const { service, variant } = useParams();
    const location = useLocation();
    const defaultVariant = getVariant({ service, variant });
    const sanitizedVariant = variantSanitiser(variant);
    const isNotDefaultVariant = defaultVariant !== 'default';

    if (!sanitizedVariant && isNotDefaultVariant) {
      return redirect(location, service, defaultVariant);
    }

    if (sanitizedVariant) setPreferredVariant(service, sanitizedVariant);

    return <Component {...props} />;
  };

  return VariantContainer;
};

export default withVariant;
