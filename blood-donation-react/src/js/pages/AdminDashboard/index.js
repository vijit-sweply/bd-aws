/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  EllipsisVerticalIcon,
  PencilIcon,
} from '@heroicons/react/20/solid';
import { twMerge } from 'tailwind-merge';
import { Chart } from 'chart.js/auto';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getBloodRequestsAction } from '../../actions/admin';
import { Button } from '../../components/common';
import Table from '../../components/common/Table';

function getLast7DaysSalesCount(salesData) {
  const last7DaysSalesCount = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    let count = 0;
    const salesForCurrentDay = salesData.filter(sale => {
      const saleDate = new Date(sale.createdAt);
      return saleDate.toDateString() === date.toDateString();
    });
    count = salesForCurrentDay.length;
    last7DaysSalesCount.unshift({ date: format(date, 'dd-MM-yyyy'), count });
  }

  return last7DaysSalesCount;
}

const countInArray = (array, keyName, value) =>
  array.reduce((count, obj) => (obj[keyName] === value ? count + 1 : count), 0);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(null);
  const [data, setData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const chartRef = useRef(null);
  const lineRef = useRef(null);
  const lineInstance = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBloodRequestsAction();
        setLineData(getLast7DaysSalesCount(response));
        setData({
          labels: ['Cancelled', 'Pending', 'Completed'],
          datasets: [
            {
              label: 'Requests',
              data: [countInArray(response, 'status', 'cancelled'), countInArray(response, 'status', 'pending'), countInArray(response, 'status', 'completed')],
              backgroundColor: [
                '#F04438',
                '#FEC84B',
                '#7FAF7F',
              ],
              borderColor: [
                '#FDA29B',
                '#FDB022',
                '#6FA56F',
              ],
              borderWidth: 1,
            },
          ],
        });
        setRequests(response.slice(0, 10));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current && data) {
      if (!chartInstance.current) {
        chartInstance.current = new Chart(chartRef.current, {
          type: 'pie',
          data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Blood Requests',
              },
            },
          },
        });
      } else {
        // Update chart data
        chartInstance.current.data = data;
        chartInstance.current.update();
      }
    }
    if (lineRef.current && lineData) {
      if (!lineInstance.current) {
        lineInstance.current = new Chart(lineRef.current, {
          type: 'line',
          data: {
            labels: lineData.map(({ date }) => date),
            datasets: [{
              label: 'Blood Requests',
              fill: false,
              lineTension: 0,
              backgroundColor: '#F04438',
              borderColor: '#FDA29B',
              data: lineData.map(({ count }) => count),
            }],
          },
          options: {
            legend: { display: false },
            plugins: {
              title: {
                display: true,
                text: 'Blood Requests in 7 days',
              },
            },
          },
        });
      }
    }
  }, [requests]);

  return requests ? (
    <>
      <Helmet title="Admin Dashboard | Gold Coin Seva Trust" />
      <header className="relative isolate">
        <div className="absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
          <div className="absolute -mt-16 opacity-50 left-16 top-full transform-gpu blur-3xl xl:left-1/2 xl:-ml-80">
            <div
              className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#c24a4a] to-[#9089FC]"
              style={{
                clipPath:
                  'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
              }}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
        </div>

        <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto gap-x-8 lg:mx-0 lg:max-w-none">
            <div className="flex items-center gap-x-4">
              <img
                src={`${window.location.origin}/images/logo.svg`}
                alt=""
                className="flex-none w-16 h-16 rounded-full ring-1 ring-gray-900/10"
              />
              <h4 className="mb-0">Blood Requests</h4>
            </div>
            <div className="flex items-center gap-x-4 sm:gap-x-6">
              <Link to="/admin/create-donor" type="button" className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block">
                Create Donor
              </Link>
              <Button
                variant="filled"
                color="secondary"
                classes="sm:block hidden"
                to="/admin/create-request"
              >
                Create Request
              </Button>
              <Menu as="div" className="relative sm:hidden">
                <Menu.Button className="block p-3 -m-3">
                  <span className="sr-only">More</span>
                  <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          className={twMerge(
                            'block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900',
                            active ? 'bg-gray-50' : '',
                          )}
                        >
                          View Categories
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="?#"
                          className={twMerge(
                            'block px-3 py-1 text-sm leading-6 text-gray-900',
                            active ? 'bg-gray-50' : '',
                          )}
                        >
                          Create Service
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-start max-w-2xl grid-cols-1 grid-rows-1 gap-8 mx-auto lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="col-span-2">
            <canvas ref={lineRef} />
          </div>
          {/* Invoice summary */}
          <div className="lg:col-start-3">
            <canvas ref={chartRef} />
          </div>
          <div className="w-full pb-8 mt-10 overflow-auto shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-start-1 xl:px-16 xl:pb-20 lg:col-end-4">
            <div className="flex items-center justify-between w-full my-4">
              <h3 className="mb-0">Last 10 Blood Requests</h3>
              <Link to="/admin/requests">View All</Link>
            </div>
            <Table
              className="w-full text-sm divide-y divide-gray-300 text-charcoal-900"
              columns={[
                {
                  title: 'Person Name',
                  cellStyle: 'py-2 pl-0 pr-2 md:pl-2 font-medium max-w-[8rem] truncate',
                  field: 'contactPersonName',
                },
                {
                  title: 'Patient Name',
                  cellStyle: 'py-2 pl-0 pr-2 md:pl-2 font-medium max-w-[8rem] truncate',
                  field: 'patientName',
                },
                {
                  title: 'Contact',
                  cellStyle: 'py-2 pl-0 pr-2 md:pl-2 whitespace-nowrap',
                  field: 'contactPhoneNumber',
                },
                {
                  title: 'Type',
                  cellStyle: 'py-2 pl-0 pr-2 md:pl-2 font-medium w-20',
                  field: 'bloodType',
                },
                {
                  title: 'Created',
                  cellStyle: 'py-2 pl-0 pr-2 md:pl-2 whitespace-nowrap',
                  render: rowData => format(rowData.createdAt, 'dd-MM-yyyy'),
                },
                {
                  title: 'Status',
                  cellStyle: 'py-2 pl-0 pr-2 md:pl-2 min-w-[3rem]',
                  render: rowData => `${rowData.status.charAt(0).toUpperCase() + rowData.status.slice(1)}`,
                },
                {
                  title: 'Units',
                  cellStyle: 'py-2 pl-0 pr-2 md:pl-2 w-4 text-right',
                  headerStyle: 'py-3 pl-0 md:pl-2 pr-2 text-right w-4 font-semibold',
                  field: 'requiredUnits',
                },
                {
                  title: 'Edit',
                  cellStyle: 'py-3.5 pl-0 pr-2 md:pl-2 flex max-w-[6rem]',
                  render: rowData => (
                    <Button
                      classes="max-w-[6rem]"
                      onClick={() => navigate(`/admin/request/${rowData.id}`)}
                      startIcon={<PencilIcon className="w-4 h-4" />}
                    >Edit
                    </Button>
                  ),
                },
              ]}
              data={requests}
              options={{
                rowStyle: 'even:bg-ivory-500',
                headersStyle: 'py-3 pl-0 md:pl-2 pr-2 text-left font-semibold',
                bodyStyle: 'divide-y divide-gray-200',
              }}
            />
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default AdminDashboard;
