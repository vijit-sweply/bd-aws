import React, { Fragment, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { isValid } from 'date-fns';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Button, DatePicker, DropdownSelect, InputField, Notification } from '../../components/common';
import { createDonorAction } from '../../actions/donors';
import { sendOTPAction, verifyOTPAction } from '../../actions/sms';

const CreateDonor = () => {
  const navigate = useNavigate();

  const [state, setState] = useReducer((data, newData) => ({ ...data, ...newData }), {
    bloodType: 'O+',
    isOpen: false,
    otpSent: false,
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

  const handleDialogBox = () => {
    setState({ isOpen: !state.isOpen });
    if (!state.isOpen) {
      setState({ otp: null, otpSent: false, verified: false });
    }
  };

  const onChangeMobile = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      onChangeValue(e);
      if (e.target.value.length === 10) {
        setTimeout(() => {
          handleDialogBox();
        }, 500);
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!state.verified) {
      handleDialogBox();
      return;
    }

    const { phone, city, email, name, address } = state;
    const getPhoneError = () => {
      if (!phone) {
        return 'Enter Your Contact Number';
      }
      if (phone.length < 10) {
        return 'Enter correct Contact Number';
      }
      return null;
    };

    const errors = {
      name: !name ? 'Enter Your Name' : null,
      phone: getPhoneError(),
      email: !email ? 'Enter Your Email' : null,
      address: !address ? 'Provide your Address' : null,
      city: !city ? 'Provide your City' : null,
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
        navigate('/');
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

  const handleGetOTP = async () => {
    setState({ otpSent: true });
    await sendOTPAction({ phoneNumber: state.phone });
  };

  const handleVerifyOTP = async () => {
    try {
      await verifyOTPAction({ phoneNumber: state.phone, otp: state.otp });
      setState({ verified: true, isOpen: false });
    } catch (err) {
      setNotification({
        type: 'warning',
        message: err.message || 'Something went wrong! Please try agian later.',
      });
    }
  };

  return (
    <div>
      <Helmet title="Register as Donor | Gold Coin Seva Trust" />
      {notification.message ? (
        <Notification {...notification} removeNotification={removeNotification} />
      ) : null}
      <main className="w-full min-h-screen py-1 mx-auto md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <Button
            classes="hover:underline"
            variant
            startIcon={<ArrowLeftIcon className="w-5 h-5" />}
            onClick={() => navigate(-1)}
          >Back
          </Button>
          <form className="grid max-w-2xl mx-auto my-8" onSubmit={handleSubmit}>
            <div className="mx-auto text-center">
              <img
                className="object-cover w-40 h-40 mx-auto rounded-full ring-2 ring-primary-500"
                src="images/register-as-donor.jpeg"
                alt="Bordered avatar"
              />
              <h2 className="my-2">Register as Donor</h2>
            </div>
            <div className="grid w-full grid-cols-1 px-2 mt-8 md:gap-x-6 md:grid-cols-4">
              <InputField
                classes="col-span-1 md:col-span-2"
                label="Your Name"
                type="text"
                name="name"
                required
                value={state.name}
                placeholder="Enter Your Name"
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
                endIcon={state.verified ? <CheckCircleIcon className="w-5 h-5 stroke-white fill-green-500" /> : <XCircleIcon className="w-5 h-5 stroke-white fill-red-500" />}
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
            >Register
            </Button>
          </form>
          <Transition appear show={state.isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => handleDialogBox()}>
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </TransitionChild>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center">
                  <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <DialogPanel className="w-full max-w-sm p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <DialogTitle
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Verify the Mobile Number
                      </DialogTitle>
                      <div className="mt-2">
                        <InputField
                          type="text"
                          required
                          maxLength={6}
                          name="otp"
                          value={state.otp}
                          placeholder="Enter OTP"
                          onChange={onChangeMobile}
                          disabled={!state.otpSent}
                          id="otp"
                          errorMessage={error.otp}
                        />
                      </div>
                      <div className="text-right">
                        {state.otpSent
                          ? <Button size="sm" onClick={handleVerifyOTP}>Verify OTP</Button>
                          : <Button size="sm" onClick={handleGetOTP}>Get OTP</Button>}
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </main>
    </div>
  );
};

export default CreateDonor;
