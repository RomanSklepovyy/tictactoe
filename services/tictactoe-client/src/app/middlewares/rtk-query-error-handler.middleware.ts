import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { message, Modal } from 'antd';

export const rtkQueryErrorHandler: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorResponse = action.payload.data;
    const extendedAction = { ...action, payload: errorResponse };

    if (!errorResponse) {
      Modal.error({
        title: 'Connection Error',
        content: 'Server is unavailable',
        okText: 'Reload Page',
        cancelText: 'Home Page',
        okCancel: true,
        onOk: () => window.location.reload(),
        onCancel: () => window.location.assign('/'),
      });

      return next(action);
    }

    message.error(errorResponse?.reason);

    return next(extendedAction);
  }

  return next(action);
};
