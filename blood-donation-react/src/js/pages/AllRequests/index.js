import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { PencilIcon } from '@heroicons/react/20/solid';
import Pagination from 'rc-pagination';
import { cloneDeep, throttle } from 'lodash';
import { Button, InputField } from '../../components/common';
import Table from '../../components/common/Table';
import { getBloodRequestsAction } from '../../actions/admin';
import 'rc-pagination/assets/index.css';

const AllRequests = () => {
  const countPerPage = 20;
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [requests, setRequests] = useState([]);
  const [total, setTotal] = useState(0);
  const [collection, setCollection] = useState([]);

  const searchData = throttle(val => {
    const query = val.toLowerCase();
    setCurrentPage(1);
    const request = requests;
    const data = request
      .filter(o =>
        Object.values(o).some(valu =>
          valu?.toString().toLowerCase().includes(query),
        ),
      );
    setTotal(data.length);
    setCollection(data.slice(0, countPerPage));
  }, 400);

  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(requests.slice(from, to)));
  };

  useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData(value);
    }
  }, [value]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBloodRequestsAction();
        setRequests(response);
        setTotal(response.length);
        setCollection(cloneDeep(response.slice(0, countPerPage)));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full p-5 m-4 mx-auto shadow-lg md:w-2/3 lg:w-11/12">
      <Helmet title="All Requests | Gold Coin Seva Trust" />
      <div className="flex flex-col justify-between w-full md:flex-row">
        <h3 className="mt-2">All Blood Requests</h3>
        <InputField
          classes="max-w-sm"
          placeholder="Search"
          id="search"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <div className="w-full overflow-auto">
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
              cellStyle: 'py-2 pl-0 pr-2 md:pl-2 font-medium max-w-[10rem] truncate',
              field: 'patientName',
            },
            {
              title: 'Contact',
              cellStyle: 'py-2 pl-0 pr-2 md:pl-2 whitespace-nowrap',
              field: 'contactPhoneNumber',
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
              title: 'Group',
              cellStyle: 'py-2 pl-0 pr-2 md:pl-2 w-4',
              headerStyle: 'py-3 pl-0 md:pl-2 pr-2 w-4 font-semibold',
              field: 'bloodType',
            },
            {
              title: 'Edit',
              cellStyle: 'py-3.5 pl-0 pr-2 md:pl-2 max-w-[6rem]',
              headerStyle: 'py-3 pl-0 md:pl-2 pr-2 text-left max-w-[2rem] font-semibold',
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
          data={collection}
          options={{
            rowStyle: 'even:bg-ivory-500',
            headersStyle: 'py-3 pl-0 md:pl-2 pr-2 text-left font-semibold',
            bodyStyle: 'divide-y divide-gray-200',
          }}
        />
      </div>
      {total > countPerPage
        ? (
          <div className="flex justify-end py-3">
            <Pagination
              className=""
              pageSize={countPerPage}
              onChange={updatePage}
              current={currentPage}
              showTotal={(t, range) => `Showing ${range[0]}-${range[1]} of ${t}`}
              total={total}
              showSizeChanger={false}
            />
          </div>
        )
        : null}
    </div>
  );
};

export default AllRequests;