import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { Stock } from '../types/Stock';
import StockRow from './StockRow';
import Filter from './Filter';

interface StockTableProps {
  stocks: Stock[];
}

const StockTable: React.FC<StockTableProps> = ({ stocks }) => {
  const data = React.useMemo(() => stocks, [stocks]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Stock Name',
        accessor: 'name',
      },
      {
        Header: 'Open Price',
        accessor: 'openPrice',
      },
      {
        Header: '52 Weeks Range',
        accessor: 'weeksRange',
      },
      {
        Header: 'Market Cap',
        accessor: 'marketCap',
      },
      {
        Header: 'P/E Ratio',
        accessor: 'peRatio',
      },
      {
        Header: 'Recommendations',
        accessor: 'recommendations',
      },
      {
        Header: 'Action',
        accessor: 'id',
        Cell: ({ value }) => <StockRow id={value} />,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable({ columns, data }, useSortBy, usePagination);

  return (
    <>
      <Filter />
      <table {...getTableProps()} className="stock-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
      </div>
    </>
  );
};

export default StockTable;