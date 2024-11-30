import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Checkbox = ({
  id,
  name,
  labelText,
  isRequired,
  labelClasses,
  isDisabled,
  checked,
  onChange,
}) => {
  const checkBoxClasses = classNames({
    'pointer-events-none disabled:bg-gray-25 disabled:border-gray-200': isDisabled,
    '!bg-none cursor-pointer relative w-5 h-5 border rounded ring-1 ring-inset ring-gray-50 focus:ring-inset focus:ring-primary-600 focus:shadow-input focus:ring-opacity-0 appearance-none peer': true,
    'hover:bg-primary-50 hover:border-primary-600 focus:border-primary-600': !checked && !isDisabled,
    'checked:bg-primary-50 checked:focus:bg-primary-50 checked:hover:bg-primary-50 border-primary-600': checked,
  });

  const labelClassName = classNames({
    'flex items-center gap-2': true,
    [labelClasses]: labelClasses,
  });

  return (
    <div className={labelClassName}>
      <input
        checked={checked}
        id={id}
        type="checkbox"
        className={checkBoxClasses}
        name={name}
        onChange={onChange}
        required={isRequired}
        disabled={isDisabled}
      />
      <svg className="absolute hidden w-4 h-4 m-0.5 pointer-events-none peer-checked:block stroke-primary-500 group-disabled:stroke-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <label htmlFor={id} className={`font-sans text-sm ${isDisabled ? 'text-gray-400' : 'cursor-pointer'}`}>{labelText}</label>
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.any),
    PropTypes.node,
  ]),
  labelClasses: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  style: PropTypes.shape({}),
};

Checkbox.defaultProps = {
  checked: false,
  labelText: '',
  style: {},
  labelClasses: '',
  isRequired: false,
  isDisabled: false,
};

export default Checkbox;
