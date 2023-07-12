import React, { useState } from 'react';

interface FilterProps {
  onFilter: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilterSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFilter(filter);
  };

  return (
    <form onSubmit={handleFilterSubmit}>
      <input
        type="text"
        placeholder="Filter stocks..."
        value={filter}
        onChange={handleFilterChange}
      />
      <button type="submit">Filter</button>
    </form>
  );
};

export default Filter;