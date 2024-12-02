import React, { useReducer, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { isValid } from 'date-fns';
import { Button, DatePicker, DropdownSelect, InputField, Notification } from '../../components/common';
import { createDonorAction } from '../../actions/donors';

const AdminCreateDonor = () => {
  const navigate = useNavigate();

  const [state, setState] = useReducer((data, newData) => ({ ...data, ...newData }), {
    bloodType: 'O+',
  });
  const [error, setError] = useReducer((data, newData) => ({ ...data, ...newData }), {
    bloodType: null,
  });

  const [notification, setNotification] = useState({ type: '', message: '' });

  const onChangeValue = e => {
    setError({
      name: null,
      phone: null,
      email: null,
      address: null,
    });
    setState({ [e.target.id]: e.target.value });
  };

  const onChangeMobile = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      onChangeValue(e);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { phone, email, name, address } = state;
    const getPhoneError = () => {
      if (!phone) {
        return 'Enter Donor Contact Number';
      }
      if (phone.length < 10) {
        return 'Enter correct Contact Number';
      }
      return null;
    };

    const errors = {
      name: !name ? 'Enter Donor Name' : null,
      phone: getPhoneError(),
      email: !email ? 'Enter Donor Email' : null,
      address: !address ? 'Provide Donor Address' : null,
    };
    setError(errors);

    if (Object.keys(errors).some(key => errors[key] !== null)) {
      return;
    }

    try {
      await createDonorAction(state);
      setNotification({
        type: 'success',
        message: 'Registered successfully',
        timeout: 4000,
      });
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 5000);
    } catch (err) {
      setNotification({
        type: 'warning',
        message: err.message || 'Something went wrong! Please try agian later.',
      });
    }
  };

  const removeNotification = () => {
    setNotification({ type: '', message: '' });
  };

  const onDateChange = date => {
    if (isValid(date)) {
      setState({ lastDonationDate: date });
    }
  };

  return (
    <div>
      <Helmet title="Create Donor | Gold Coin Seva Trust" />
      {notification.message ? (
        <Notification {...notification} removeNotification={removeNotification} />
      ) : null}
      <main className="w-full min-h-screen py-1 mx-auto md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <form className="grid max-w-2xl mx-auto my-8" onSubmit={handleSubmit}>
            <div className="mx-auto text-center">
              <h2 className="my-2">Create a Donor</h2>
            </div>
            <div className="grid w-full grid-cols-1 px-2 mt-8 md:gap-x-6 md:grid-cols-4">
              <InputField
                classes="col-span-1 md:col-span-2"
                label="Donor Name"
                type="text"
                name="name"
                required
                value={state.name}
                placeholder="Enter Donor Name"
                onChange={onChangeValue}
                id="name"
                errorMessage={error.name}
              />
              <InputField
                classes="col-span-1 md:col-span-2"
                label="Contact Number"
                type="text"
                required
                maxLength={10}
                name="phone"
                value={state.phone}
                placeholder="Mobile Number"
                onChange={onChangeMobile}
                id="phone"
                errorMessage={error.phone}
              />
              <InputField
                classes="col-span-1 md:col-span-2"
                label="Email"
                required
                type="text"
                name="email"
                value={state.email}
                onChange={onChangeValue}
                id="email"
                errorMessage={error.email}
              />
              <DropdownSelect
                labelText="Select Blood Type"
                options={[
                  { name: 'A+', value: 'A+' },
                  { name: 'A-', value: 'A-' },
                  { name: 'B+', value: 'B+' },
                  { name: 'B-', value: 'B-' },
                  { name: 'O+', value: 'O+' },
                  { name: 'O-', value: 'O-' },
                  { name: 'AB+', value: 'AB+' },
                  { name: 'AB-', value: 'AB-' },
                ]}
                id="bloodType"
                name="bloodType"
                value={state.bloodType}
                onChangeValue={onChangeValue}
              />
              <DatePicker
                id="lastDonationDate"
                name="lastDonationDate"
                onChange={onDateChange}
                onSelect={onDateChange}
                maxDate={new Date()}
                value={state.lastDonationDate}
                label="Last Donation Date"
                dateFormat="dd-MM-yyyy"
              />
              <InputField
                classes="col-span-1 md:col-span-4"
                label="Address"
                required
                type="text"
                name="address"
                value={state.address}
                placeholder="Enter your address"
                onChange={onChangeValue}
                id="address"
                errorMessage={error.address}
              />
              <InputField
                classes="col-span-1 md:col-span-4"
                label="City"
                required
                type="text"
                name="city"
                value={state.city}
                placeholder="Enter your address"
                onChange={onChangeValue}
                id="city"
                errorMessage={error.city}
              />
            </div>
            <Button
              type="submit"
              classes="ml-auto"
            >Create
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminCreateDonor;
