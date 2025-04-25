import { FaSearch } from "react-icons/fa";

const SearchInput = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative w-full flex flex-col sm:flex-row gap-x-4 gap-y-2">
      <div className="absolute top-0 right-0 h-full px-3 bg-sky-500 flex items-center rounded-se rounded-ee cursor-pointer">
        <FaSearch className="text-lg  text-gray-200" />
      </div>
      <input
        type="text"
        placeholder="Search.."
        value={searchQuery}
        onChange={handleSearchChange}
        className="pr-14"
      />
    </div>
  );
};

export default SearchInput;
