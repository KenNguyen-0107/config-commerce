import { Search } from "lucide-react";
import React from "react";

const SearchBox = () => {
  return (
    <div className="relative w-full md:w-[320px]">
      <input
        type="text"
        placeholder="Search ship to"
        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded focus:outline-none"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tertiary">
        <Search size={20} />
      </div>
    </div>
  );
};

export default SearchBox;
