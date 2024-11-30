import React, { useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { isValid } from 'date-fns';
import { Button, DatePicker, DropdownSelect, InputField, Notification } from '../../components/common';
import { getDonorAction, updateDonorAction } from '../../actions/donors';

const UpdateDonor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = useReducer((data, newData) => ({ ...data, ...newData }), {
    bloodType: 'O+',
  });

  const [error, setError] = useReducer((data, newData) => ({ ...data, ...newData }), {
    bloodType: null,
  });

  const [notification, setNotification] = useState({ type: '', message: '' });

  const onChangeValue = e => {
    setError({
      contactPersonName: null,
      contactPhoneNumber: null,
      patientName: null,
      requiredUnits: null,
      address: null,
      hospital: null,
      status: null,
    });
    setState({ [e.target.id]: e.target.value });
  };

  const onChangeMobile = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      onChangeValue(e);
    }
  };

  useEffect(() => {
    getDonorAction(id)
      .then(({ donor, bloodTypes }) =>
        setState({ ...donor, bloodTypes }));
  }, []);

  const onDateChange = date => {
    if (isValid(date)) {
      setState({ lastDonationDate: date });
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
      await updateDonorAction(state);
      setNotification({
        type: 'success',
        message: 'Updated successfully',
        timeout: 3000,
      });
      setTimeout(() => {
        navigate('/admin/donors');
      }, 3000);
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

  return (
    <div>
      <Helmet title="Update Donor | Gold Coin Seva Trust" />
      {notification.message ? (
        <Notification {...notification} removeNotification={removeNotification} />
      ) : null}
      <main className="w-full min-h-screen py-1 mx-auto md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <form className="grid max-w-2xl mx-auto my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <h2 className="m-0">Update Donor</h2>
              <div><i>Can Donate To: </i>
                <span className="font-semibold text-primary-600">{state.bloodTypes?.join(', ')}</span>
              </div>
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
                label="City"
                required
                type="text"
                name="city"
                value={state.city}
                placeholder="Enter your city"
                onChange={onChangeValue}
                id="city"
                errorMessage={error.city}
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
            </div>
            <Button
              type="submit"
              classes="ml-auto"
            >Update
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdateDonor;
