import type { Middleware } from '@reduxjs/toolkit';

export const newLocationHandler: Middleware = () => (next) => (action) => {
  const location = action.payload?.location;

  if (location) {
    window.open(location, '_blank', 'noopener,noreferrer');
  }

  return next(action);
};
