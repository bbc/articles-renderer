import React from 'react';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import { variantSanitiser, getVariant } from '#lib/utilities/variantHandler';
import {
  getPreferredVariant,
  setPreferredVariant,
} from '#contexts/UserContext/cookies';

const WithVariant = Component => {
  const VariantContainer = props => {
    const { service, variant } = useParams();
    const location = useLocation();
    const defaultVariant = getVariant({ service, variant });
    const sanitizedVariant = variantSanitiser(variant);

    // If no variant in path and service has a default variant which isn't 'default'.
    if (!sanitizedVariant && defaultVariant && defaultVariant !== 'default') {
      const preferredVariant = getPreferredVariant(service);
      const usedVariant = preferredVariant || defaultVariant;
      return (
        <Redirect
          to={{
            ...location,
            pathname: `${location.pathname}/${usedVariant}`,
          }}
        />
      );
    }

    if (variant) setPreferredVariant(service, variant);

    return <Component {...props} />;
  };

  return VariantContainer;
};

export default WithVariant;
