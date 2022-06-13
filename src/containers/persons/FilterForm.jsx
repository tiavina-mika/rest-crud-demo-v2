import { useState } from "react";

const FilterForm = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearchPerson = (e) => {
    const { value } = e.target;
    setSearch(value);
    onSearch(value);
  };

  return (
    <div>
      <div>
        <div>Filter shown</div>
        <div>
          <input type="text" onChange={handleSearchPerson} value={search} />
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
