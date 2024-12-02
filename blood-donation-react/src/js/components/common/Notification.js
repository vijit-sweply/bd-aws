import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const getAlertType = type => {
  switch (type) {
    case 'info':
      return {
        color: 'blue',
        layout: 'text-blue-800 border-t-4 border-blue-300 bg-blue-50',
      };
    case 'warning':
      return {
        color: 'red',
        layout: 'text-red-800 border-t-4 border-red-300 bg-red-50',
      };
    case 'success':
      return {
        color: 'green',
        layout: 'text-green-800 border-t-4 border-green-300 bg-green-50',
      };
    default:
      return {
        color: 'yellow',
        layout: 'text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50',
      };
  }
};

const Notification = ({
  positionX,
  positionY,
  type,
  timeout,
  message,
  removeNotification,
}) => {
  const [hidden, setHidden] = useState(false);

  const hideNotification = () => {
    setHidden(true);
    removeNotification();
  };

  useEffect(() => {
    if (timeout) {
      setTimeout(() => {
        hideNotification();
      }, timeout);
    }
  }, []);

  const { color, layout } = getAlertType(type);
  const classes = classNames(
    'fixed flex items-center p-4 mt-12 mb-4 transition-opacity ease-in-out delay-150 duration-700 max-w-lg min-w-[20rem] z-[100]',
    {
      [`${positionX} ${positionY}`]: true,
      [layout]: true,
      'opacity-100': !hidden,
      'opacity-0': hidden,
    },
  );

  return (
    <div className={classes} role="alert">
      <svg
        className="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="text-sm font-medium ms-3">{message}</div>
      <button
        type="button"
        className={`ms-auto -mx-1.5 -my-1.5 bg-${color}-50 rounded-lg focus:ring-2 focus:ring-${color}-400 p-1.5 hover:bg-${color}-200 inline-flex items-center justify-center h-8 w-8`}
        data-dismiss-target="#alert-border-2"
        aria-label="Close"
        onClick={() => hideNotification()}
      >
        <span className="sr-only">Dismiss</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

Notification.propTypes = {
  positionX: PropTypes.string,
  positionY: PropTypes.string,
  type: PropTypes.string,
  timeout: PropTypes.number,
  message: PropTypes.string,
  removeNotification: PropTypes.func,
};

Notification.defaultProps = {
  positionX: 'right-5',
  positionY: 'top-5',
  type: 'warning',
  timeout: 0,
  message: '',
  removeNotification: () => { },
};

export default Notification;
