import React, { useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button, Checkbox, DropdownSelect, InputField, Notification, TextAreaField } from '../../components/common';
import { getGroupDonorsAction, getRequestAction, updateRequestAction } from '../../actions/bloodrequest';
import Table from '../../components/common/Table';

const UpdateRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = useReducer((data, newData) => ({ ...data, ...newData }), {
    bloodType: 'O+',
    search: '',
    DonorId: null,
    status: '',
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
    getRequestAction(id)
      .then(({ bloodrequest, bloodTypes, donors }) =>
        setState({ ...bloodrequest, bloodTypes, donors }));
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const { search, bloodType } = state;
      if (search && bloodType) {
        getGroupDonorsAction(bloodType, search)
          .then(({ donors, bloodGroups }) =>
            setState(({ donors, bloodGroups })));
      }
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [state.search]);

  const handleSubmit = async e => {
    e.preventDefault();

    const { contactPersonName, contactPhoneNumber, patientName, requiredUnits } = state;
    const getPhoneError = () => {
      if (!contactPhoneNumber) {
        return 'Enter Your Contact Number';
      }
      if (contactPhoneNumber.length < 10) {
        return 'Enter correct Contact Number';
      }
      return null;
    };

    const errors = {
      contactPersonName: !contactPersonName ? 'Enter Your Name' : null,
      contactPhoneNumber: getPhoneError(),
      patientName: !patientName ? 'Enter Patient Name' : null,
      requiredUnits: !requiredUnits ? 'Enter Units required' : null,
      address: !state.address ? 'Enter Address' : null,
      status: !state.status ? 'Please select Status' : null,
    };
    setError(errors);

    if (Object.keys(errors).some(key => errors[key] !== null)) {
      return;
    }

    try {
      await updateRequestAction(state);
      // localStorage.setItem('data', jsonData);
      setNotification({
        type: 'success',
        message: 'Blood Request Updated successfully',
        timeout: 4000,
      });
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 5000);
    } catch (err) {
      setNotification({
        type: 'warning',
        message: 'Something went wrong! Please try agian later.',
      });
    }
  };

  const removeNotification = () => {
    setNotification({ type: '', message: '' });
  };

  const handleCheckBoxChange = DonorId =>
    setState({ DonorId: DonorId === state.DonorId ? null : DonorId });

  return (
    <div>
      <Helmet title="Request Blood | Gold Coin Seva Trust" />
      {notification.message ? (
        <Notification {...notification} removeNotification={removeNotification} />
      ) : null}
      <main className="w-full min-h-screen py-1 mx-auto md:w-2/3 lg:w-11/12">
        <div className="p-2 md:p-4">
          <form className="w-full mt-8 lg:grid" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-between w-full lg:flex-row">
              <span className="text-lg">
                <i>Can Receive From:</i> <span className="font-semibold text-primary-600">{state.bloodTypes?.join(', ')}</span>
              </span>
              <Button
                type="submit"
              >Update Blood Request
              </Button>
            </div>
            <div className="w-full grid-cols-1 px-2 mt-8 lg:grid md:gap-x-6 lg:grid-cols-3">
              <InputField
                label="Person Name"
                required
                type="text"
                name="contactPersonName"
                value={state.contactPersonName}
                placeholder="Name"
                onChange={onChangeValue}
                id="contactPersonName"
                errorMessage={error.contactPersonName}
              />
              <InputField
                label="Patient Name"
                required
                type="text"
                name="patientName"
                value={state.patientName}
                onChange={onChangeValue}
                id="patientName"
                errorMessage={error.patientName}
              />
              <InputField
                label="Contact Number"
                type="text"
                required
                maxLength={10}
                name="contactPhoneNumber"
                value={state.contactPhoneNumber}
                placeholder="Mobile Number"
                onChange={onChangeMobile}
                id="contactPhoneNumber"
                errorMessage={error.contactPhoneNumber}
              />
              <div className="mt-2">
                <DropdownSelect
                  labelText="Blood Type"
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
                <InputField
                  label="Required Units"
                  required
                  type="number"
                  name="requiredUnits"
                  value={state.requiredUnits}
                  placeholder="1 Unit = 450ml"
                  onChange={onChangeValue}
                  id="requiredUnits"
                  errorMessage={error.requiredUnits}
                />
              </div>
              <TextAreaField
                label="Address"
                required
                type="text"
                name="address"
                value={state.address}
                placeholder="Address"
                onChange={onChangeValue}
                rows={5}
                id="address"
                errorMessage={error.address}
              />
              <TextAreaField
                label="Hospital"
                type="text"
                rows={5}
                name="hospital"
                value={state.hospital}
                placeholder="Hospital Name"
                onChange={onChangeValue}
                id="hospital"
                errorMessage={error.hospital}
              />
              <hr className="w-5/6 col-span-3 mx-auto mt-8 border-2 rounded-full mb-14 border-primary-500" />
              <DropdownSelect
                labelText="Select Blood Request Status"
                options={[
                  { name: 'Select Any Option', value: '' },
                  { name: 'Pending', value: 'pending' },
                  { name: 'Completed', value: 'completed' },
                  { name: 'Cancelled', value: 'cancelled' },
                ]}
                id="status"
                errorMessage={error.status}
                name="status"
                value={state.status}
                onChangeValue={onChangeValue}
              />
              <InputField
                classes="col-start-3 !pb-0"
                type="text"
                label="Search Donor"
                name="search"
                value={state.search}
                placeholder="Search Compatible Donors"
                onChange={onChangeValue}
                id="search"
                endIcon={<MagnifyingGlassIcon className="w-3" />}
              />
              <div className="max-w-full col-span-3 py-3 overflow-x-auto">
                <Table
                  className="w-full text-sm text-charcoal-900"
                  columns={[
                    {
                      title: 'Select',
                      cellStyle: 'border border-slate-600 py-3.5 pl-0 pr-2 md:pl-2 w-4',
                      render: rowData => (
                        <Checkbox
                          id="DonorId"
                          name="DonorId"
                          checked={state.DonorId === rowData.id}
                          onChange={() => handleCheckBoxChange(rowData.id)}
                          labelClasses="text-gray-500"
                        />
                      ),
                    },
                    {
                      title: 'ID',
                      cellStyle: 'border border-slate-600 text-right py-2 pl-0 pr-2 md:pl-2 font-medium w-4',
                      field: 'id',
                    },
                    {
                      title: 'Group',
                      cellStyle: 'border border-slate-600 py-2 pl-0 pr-2 md:pl-2 font-medium w-4',
                      field: 'bloodType',
                    },
                    {
                      title: 'Name',
                      cellStyle: 'border border-slate-600 py-2 pl-0 pr-2 md:pl-2 font-medium max-w-[8rem] truncate',
                      field: 'name',
                    },
                    {
                      title: 'Phone',
                      cellStyle: 'border border-slate-600 py-2 pl-0 pr-2 md:pl-2 whitespace-nowrap w-20',
                      field: 'phone',
                    },
                    {
                      title: 'Last Donation',
                      cellStyle: 'border border-slate-600 py-2 pl-0 pr-2 md:pl-2 w-20 whitespace-nowrap',
                      render: rowData => rowData.lastDonationDate && format(rowData.lastDonationDate, 'dd-MM-yyyy'),
                    },
                    {
                      title: 'Created',
                      cellStyle: 'border border-slate-600 py-2 pl-0 pr-2 md:pl-2 whitespace-nowrap',
                      render: rowData => format(rowData.createdAt, 'dd-MM-yyyy'),
                    },
                    {
                      title: 'City',
                      cellStyle: 'border border-slate-600 py-2 pl-0 pr-2 md:pl-2 max-w-[8rem] truncate',
                      field: 'city',
                    },
                  ]}
                  data={state.donors?.length ? state.donors : []}
                  options={{
                    rowStyle: 'even:bg-ivory-500',
                    headersStyle: 'py-3 pl-0 md:pl-2 pr-2 text-left text-white font-semibold whitespace-nowrap border border-slate-600 bg-charcoal-800',
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdateRequest;
