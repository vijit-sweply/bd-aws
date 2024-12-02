import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const outlinedColors = {
  primary: 'text-charcoal-700 border-2 border-charcoal-200 active:ring-charcoal-50 hover:bg-charcoal-50',
  secondary: 'text-primary-600 border-2 border-primary-200 active:ring-primary-50 hover:bg-primary-50 ',
  red: 'text-red-500 border-2 border-red-200 active:ring-red-50 hover:bg-red-50',
  green: 'text-green-500 border-2 border-green-200 active:ring-green-50 hover:bg-green-50',
  blue: 'text-blue-500 border-2 border-blue-200 active:ring-blue-50 hover:bg-blue-50',
  violet: 'text-violet-500 border-2 border-violet-200 active:ring-violet-50 hover:bg-violet-50',
  white: 'border-2 border-white focus:border-white active:ring-white',
};

const filledColors = {
  primary: 'text-white shadow-sm bg-charcoal-800 hover:bg-charcoal-800 active:ring-charcoal-50',
  secondary: 'text-white shadow-sm bg-primary-500 hover:bg-primary-700 active:ring-primary-50',
  red: 'text-white shadow-sm bg-red-500 hover:bg-red-600 active:ring-red-100',
  green: 'text-white shadow-sm bg-green-500 hover:bg-green-600 active:ring-green-100',
  blue: 'text-white shadow-sm bg-blue-400 hover:bg-blue-500 active:ring-blue-50',
  violet: 'text-white shadow-sm bg-violet-400 hover:bg-violet-500 active:ring-violet-50',
  white: 'text-charcoal-800 shadow-sm bg-white hover:bg-slate-50 active:ring-slate-100',
};

const Button = ({
  children,
  classes,
  color,
  endIcon,
  fullWidth,
  size,
  startIcon,
  variant,
  to,
  disabled,
  ref,
  onClick,
  type,
  dataID,
}) => {
  let buttonClasses = 'rounded-md font-sans px-4 py-2 focus:outline-none transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none select-none font-semibold';
  buttonClasses = twMerge(buttonClasses, `text-${size}`);
  if (fullWidth) buttonClasses = twMerge(buttonClasses, 'w-full');
  if (variant === 'filled') buttonClasses = twMerge(buttonClasses, filledColors[color]);
  else if (variant === 'outlined') buttonClasses = twMerge(buttonClasses, outlinedColors[color]);
  if (startIcon || endIcon) buttonClasses = twMerge(buttonClasses, 'flex items-center gap-x-2');
  if (classes) buttonClasses = twMerge(buttonClasses, classes);

  if (to) {
    return (
      <Link
        className={buttonClasses}
        to={to}
        ref={ref}
        onClick={onClick}
        tabIndex={disabled ? -1 : 0}
      >
        {startIcon || null}
        {children}
        {endIcon || null}
      </Link>
    );
  }
  return (
    <button
      className={buttonClasses}
      type={type}
      ref={ref}
      onClick={onClick}
      data-id={dataID}
      disabled={disabled}
    >
      {startIcon || null}
      {children}
      {endIcon || null}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  classes: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  endIcon: PropTypes.node,
  startIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  dataID: PropTypes.string,
  size: PropTypes.string,
  to: PropTypes.string,
  variant: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({}),
  ]),
};

Button.defaultProps = {
  onClick: () => { },
  disabled: false,
  children: null,
  classes: null,
  color: 'secondary',
  type: 'button',
  endIcon: null,
  startIcon: null,
  fullWidth: false,
  dataID: null,
  size: 'md',
  to: null,
  ref: null,
  variant: 'filled',
};

export default Button;
