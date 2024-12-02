import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextAreaField = ({
  label,
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
  rows,
  cols,
  wrap,
}) => {
  const textareaClasses = classNames('mb-1 border text-sm rounded-lg block w-full py-2.5 px-4 disabled:cursor-not-allowed disabled:bg-gray-100', {
    [className]: className,
    'bg-gray-25 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500': !errorMessage,
    'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500': errorMessage,
  });

  const textColor = errorMessage ? 'text-red-600' : 'text-gray-900';

  return (
    <div className={`${classes} w-full`}>
      {label
        ? (
          <label
            htmlFor={id}
            className={`block mb-2 text-sm font-medium ${textColor}`}
          >
            {label}{required ? <span className="text-red-500"> *</span> : null}
          </label>
        )
        : null}
      <div className="relative pb-6">
        <textarea
          id={id}
          onChange={onChange}
          value={value}
          className={textareaClasses}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={onBlur}
          maxLength={maxLength}
          rows={rows}
          cols={cols}
          wrap={wrap}
        />
        {helperText || errorMessage
          ? <p className={`${textColor} text-xs absolute`}>{errorMessage || helperText}</p>
          : null}
      </div>
    </div>
  );
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
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
  rows: PropTypes.number,
  cols: PropTypes.number,
  wrap: PropTypes.oneOf(['soft', 'hard']),
};

TextAreaField.defaultProps = {
  label: null,
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
  rows: 3, // Default number of rows
  cols: 30, // Default number of columns
  wrap: 'soft', // Default wrap behavior
};

export default TextAreaField;
