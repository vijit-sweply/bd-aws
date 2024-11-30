import React from 'react';
import PropTypes from 'prop-types';

const DropdownSelect = props => (
  <div>
    <label htmlFor={props.id} className="block mb-1 text-sm font-medium leading-6 text-left text-gray-700">
      {props.labelText}
    </label>
    <div className="relative">
      <select
        id={props.id}
        name={props.name}
        value={props.value}
        className="mb-1 border text-sm rounded-lg block w-full py-2.5 px-4 disabled:cursor-not-allowed disabled:bg-gray-100 bg-gray-25 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500"
        onChange={props.onChangeValue}
        disabled={props.isDisabled}
        required={props.isRequired}
      >
        {props.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
    {props.helperText && !props.errorMessage
      ? (
        <p className="mt-2 font-sans text-sm text-left text-gray-500">
          {props.helperText}
        </p>
      ) : null}
    {props.errorMessage
      ? (
        <p className="h-4 mt-2 font-sans text-sm text-left text-red-500">
          {props.errorMessage}
        </p>
      ) : null}
  </div>
);

DropdownSelect.propTypes = {
  labelText: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  })),
  onChangeValue: PropTypes.func.isRequired,
  helperText: PropTypes.string,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

DropdownSelect.defaultProps = {
  value: undefined,
  options: [],
  labelText: '',
  errorMessage: '',
  helperText: '',
  isRequired: false,
  isDisabled: false,
};

export default DropdownSelect;
