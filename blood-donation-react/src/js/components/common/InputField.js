import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const InputField = ({
  label,
  type,
  onChange,
  value,
  className,
  classes,
  id,
  placeholder,
  disabled,
  errorMessage,
  helperText,
  onBlur,
  maxLength,
  required,
  endIcon,
}) => {
  const inputClasses = classNames('mb-1 border text-sm rounded-lg block w-full py-2.5 px-4 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:placeholder:text-gray-400', {
    [className]: className,
    'bg-gray-25 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500': !errorMessage,
    'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500': errorMessage,
  });
  const labelColor = () => {
    if (disabled) {
      return 'text-gray-400';
    }
    if (errorMessage) {
      return 'text-red-600';
    }
    return 'text-gray-900';
  };

  return (
    <div className={`${classes} w-full pb-6`}>
      {label
        ? (
          <label
            htmlFor={id}
            className={`block mb-2 text-sm font-medium ${labelColor()}`}
          >
            {label}{required ? <span className="text-red-500"> *</span> : null}
          </label>
        )
        : null}
      <div className="relative">
        {/* <div className="absolute inset-y-0 flex items-center w-3 h-10
        pointer-events-none left-2.5">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
             strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div> */}
        <input
          type={type}
          id={id}
          onChange={onChange}
          value={value}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={onBlur}
          maxLength={maxLength}
        />
        {endIcon
          ? (
            <div className="absolute end-2.5 top-0 flex items-center w-4 h-full
        pointer-events-none"
            >{endIcon}
            </div>
          )
          : null}
        {helperText || errorMessage
          ? <p className={`${labelColor()} text-xs absolute`}>{errorMessage || helperText}</p>
          : null}
      </div>
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  classes: PropTypes.string,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  endIcon: PropTypes.node,
};

InputField.defaultProps = {
  label: null,
  type: 'text',
  value: '',
  className: '',
  classes: '',
  errorMessage: null,
  helperText: null,
  placeholder: null,
  disabled: false,
  onBlur: () => { },
  maxLength: null,
  required: false,
  endIcon: null,
};

export default InputField;
