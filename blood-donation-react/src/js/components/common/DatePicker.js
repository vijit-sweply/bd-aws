import 'react-datepicker/dist/react-datepicker.css';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DatePickerInput from 'react-datepicker';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';

const DatePicker = ({
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
  required,
  dateFormat,
  onSelect,
  maxDate,
  minDate,
}) => {
  const inputClasses = classNames('mb-1 border text-sm rounded-lg block w-full py-2.5 px-4 disabled:cursor-not-allowed disabled:bg-gray-100', {
    [className]: className,
    'bg-gray-25 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500': !errorMessage,
    'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500': errorMessage,
  });

  const dateRef = useRef(null);

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
        <DatePickerInput
          selected={value}
          ref={dateRef}
          onChange={onChange}
          className={inputClasses}
          placeholder={placeholder}
          id={id}
          type={type}
          disabled={disabled}
          onSelect={onSelect}
          dateFormat={dateFormat}
          maxDate={maxDate}
          minDate={minDate}
        />
        <i
          role="button"
          aria-label="Calendar"
          className="absolute flex items-center justify-center w-6 h-6 cursor-pointer top-[0.375rem] right-2"
          onClick={() => dateRef.current.setFocus()}
          onKeyDown={() => dateRef.current.setFocus()}
          tabIndex={-1}
        >
          <CalendarDaysIcon className="mt-[3px] text-gray-600" />
        </i>
        {helperText || errorMessage
          ? <p className={`${textColor} text-xs absolute`}>{errorMessage || helperText}</p>
          : null}
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  className: PropTypes.string,
  classes: PropTypes.string,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  dateFormat: PropTypes.string,
  onSelect: PropTypes.func,
  required: PropTypes.bool,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
};

DatePicker.defaultProps = {
  label: null,
  type: 'text',
  value: '',
  className: null,
  classes: null,
  errorMessage: null,
  helperText: null,
  placeholder: null,
  disabled: false,
  dateFormat: 'MM/dd/yyyy',
  onSelect: () => { },
  required: false,
  maxDate: null,
  minDate: null,
};

export default DatePicker;
