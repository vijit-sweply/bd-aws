import React from 'react';
import PropTypes from 'prop-types';

const renderCell = (col, row) => {
  if (col.render) {
    return col.render(row);
  } if (typeof row === 'object') {
    return row[col.field];
  }
  return row;
};

const Table = ({ columns, data, className, options }) => (
  <table className={className}>
    <thead>
      <tr>
        {columns.map(headerItem => (
          <th
            key={headerItem.field || Math.random()}
            scope="col"
            className={headerItem.headerStyle || options.headersStyle}
          >
            {headerItem.title}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className={options.bodyStyle}>
      {data.length ? data.map(item => (
        <tr key={item.id || Math.random()} className={options.rowStyle}>
          {columns.map(col => (
            <td
              key={Math.random()}
              className={col.cellStyle}
              data-label={col.title}
            >
              {renderCell(col, item)}
            </td>
          ))}
        </tr>
      )) : (
        <tr className={`text-center ${options.rowStyle}`}>
          <td className="p-3" colSpan={columns.length}>No record to display</td>
        </tr>
      )}
    </tbody>
  </table>
);

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      title: PropTypes.string,
      headerStyle: PropTypes.string,
      cellStyle: PropTypes.string,
      render: PropTypes.func,
    }),
  ),
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}),
    ]),
  ),
  options: PropTypes.shape({
    headersStyle: PropTypes.string,
    bodyStyle: PropTypes.string,
    rowStyle: PropTypes.string,
  }).isRequired,
};

Table.defaultProps = {
  className: 'min-w-full divide-y divide-gray-300',
  columns: [],
  data: [],
};
export default Table;
