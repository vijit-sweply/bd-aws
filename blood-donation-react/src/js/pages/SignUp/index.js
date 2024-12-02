import React, { useReducer } from 'react';
// import axios from 'axios'; // Import Axios if not already done
import { Link } from 'react-router-dom';
import { Button, Checkbox, InputField } from '../../components/common';
import { registerAction } from '../../actions/auth';

const SignUp = () => {
  const [state, setState] = useReducer((data, newData) =>
    ({ ...data, ...newData }), {
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    address1: '',
    address2: '',
    zipcode: '',
    country: '',
    state: '',
    city: '',
  });

  const [error, setError] = useReducer((data, newData) =>
    ({ ...data, ...newData }), {
    firstName: null,
    lastName: null,
    email: null,
    confirmEmail: null,
    password: null,
    address1: null,
    address2: null,
    zipcode: null,
    country: null,
    state: null,
    city: null,
  });

  const onChangeValue = e => {
    setError({ [e.target.id]: null });
    setState({ [e.target.id]: e.target.value });
  };

  const validateEmail = () => {
    if (state.email && !state.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i)) {
      setError({ email: 'You must enter a valid email address' });
    }
  };

  const jsonData = {
    personalInfo: {
      firstName: state.firstName,
      lastName: state.lastName,
      emailAddress: state.email,
      password: state.password,
    },
    addressInfo: {
      addressOne: state.address1,
      addressTwo: state.address2,
      city: state.city,
      country: state.country,
      state: state.state,
      zipCode: state.zipcode,
    },
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = {};
    if (!state.firstName) {
      errors.firstName = 'You must enter a first name.';
    }
    if (!state.lastName) {
      errors.lastName = 'You must enter a last name.';
    }
    if (!state.email) {
      errors.email = 'You must enter a email address.';
    }

    if (state.email !== state.confirmEmail) {
      errors.confirmEmail = 'Email address does not match';
    }
    setError(errors);
    if (Object.keys(errors).length || Object.values(error).every(value => value)) {
      return;
    }

    // Example API endpoint URL

    try {
      const response = await registerAction(jsonData);

      // Handle the response from the server
      console.log('Server response:', response);
    } catch (err) {
      console.error('There was a problem with the Axios request:', err.message);
    }
  };

  const handleCheckBoxChange = e => setState({ [e.target.id]: e.target.checked });

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-6 bg-ivory-300">
      <div className="w-full my-10 rounded-lg shadow-lg bg-gray-50 md:mt-0 sm:max-w-xl xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h3 className="text-center">
            Sign Up
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <InputField
                type="text"
                name="name"
                value={state.firstName}
                placeholder="Enter First Name"
                onChange={onChangeValue}
                id="firstName"
                errorMessage={error.firstName}
              />
              <InputField
                type="text"
                name="name2"
                value={state.lastName}
                placeholder="Enter Last Name"
                onChange={onChangeValue}
                id="lastName"
                errorMessage={error.lastName}
              />
            </div>
            <InputField
              type="text"
              name="email"
              value={state.email}
              placeholder="Email"
              onChange={onChangeValue}
              id="email"
              onBlur={validateEmail}
              errorMessage={error.email}
            />
            <InputField
              type="text"
              name="email1"
              value={state.confirmEmail}
              placeholder="Confirm Email"
              onChange={onChangeValue}
              id="confirmEmail"
              errorMessage={error.confirmEmail}
            />
            <InputField
              type="password"
              value={state.password}
              placeholder="Enter your password"
              onChange={onChangeValue}
              id="password"
              errorMessage={error.password}
            />
            <InputField
              type="text"
              name="name3"
              placeholder="House Number / Block"
              value={state.address1}
              onChange={onChangeValue}
              id="address1"
              errorMessage={error.address1}
            />
            <InputField
              type="text"
              name="name4"
              placeholder="Full Address"
              value={state.address2}
              onChange={onChangeValue}
              id="address2"
              errorMessage={error.address2}
            />
            <div className="flex gap-4">
              <InputField
                type="text"
                name="name8"
                value={state.zipcode}
                placeholder="Enter Zipcode"
                onChange={onChangeValue}
                id="zipcode"
                errorMessage={error.zipcode}
              />
              <InputField
                type="text"
                name="name5"
                value={state.country}
                placeholder="Enter Country"
                onChange={onChangeValue}
                id="country"
                errorMessage={error.country}
              />
            </div>
            <div className="flex gap-4">
              <InputField
                type="text"
                name="name6"
                value={state.state}
                placeholder="Enter State"
                onChange={onChangeValue}
                id="state"
                errorMessage={error.state}
              />
              <InputField
                type="text"
                name="name7"
                value={state.city}
                placeholder="Enter City"
                onChange={onChangeValue}
                id="city"
                errorMessage={error.city}
              />
            </div>
            <Checkbox
              id="acceptedTnC"
              name="acceptedTnC"
              labelText={<>I accept the <Link to="/">Terms and Conditions</Link></>}
              checked={state.acceptedTnC}
              onChange={handleCheckBoxChange}
              labelClasses="text-gray-500"
            />
            <Button
              fullWidth
              type="submit"
              variant="filled"
              color="secondary"
              classes="py-5 mt-5 !rounded-t-none"
              disabled={!state.acceptedTnC}
            >SIGN IN
            </Button>
            <p className="mt-4 mb-0 text-sm text-gray-500">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
