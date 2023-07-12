import React from 'react';
import { Stock } from '../types/Stock';
import Link from 'next/link';

interface StockRowProps {
  stock: Stock;
}

const StockRow: React.FC<StockRowProps> = ({ stock }) => {
  return (
    <tr>
      <td>{stock.name}</td>
      <td>{stock.openPrice}</td>
      <td>{stock.range52Weeks}</td>
      <td>{stock.marketCap}</td>
      <td>{stock.peRatio}</td>
      <td>
        <Link href={`/${stock.id}`}>
          <a>View Details</a>
        </Link>
      </td>
    </tr>
  );
};

export default StockRow;