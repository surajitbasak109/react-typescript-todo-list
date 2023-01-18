import React from 'react';
import { MdSearch } from 'react-icons/md';
import { SearchBarProp } from '../@types/todo';

const SearchBar: React.FC<SearchBarProp> = ({ searchKeyword, onChange }) => {
  return (
    <div className="flex items-center justify-between w-full p-2 mt-2 mb-4 border border-orange-500 rounded-md">
      <MdSearch className="flex-shrink-0 mx-1 text-orange-500" />
      <input
        type="search"
        className="w-full text-gray-500 outline-none"
        value={searchKeyword}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search todo"
      />
    </div>
  );
};

export default SearchBar;
