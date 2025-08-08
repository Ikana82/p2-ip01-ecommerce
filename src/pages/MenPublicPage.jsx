import React, { useState } from "react";
import FilterMen from "../components/FilterMen";
import EtalaseMen from "../components/EtalaseMen";

function MenPublicPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    styles: [],
    colors: [],
    sizes: [],
  });

  const handleFilterSelection = (type, value) => {
    setSelectedFilters((prevFilters) => {
      const prevSelected = prevFilters[type];
      const newSelected = prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value];
      return { ...prevFilters, [type]: newSelected };
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col gap-6">
      <div className="flex flex-grow gap-4">
        <EtalaseMen selectedFilters={selectedFilters} />
        {/* <div className="w-full md:w-1/5 bg-white rounded-lg shadow p-4">
          <FilterMen
            selectedFilters={selectedFilters}
            handleFilterSelection={handleFilterSelection}
          />
        </div> */}
        {/* <div className="w-full md:w-4/5 bg-white rounded-lg shadow p-4">
          <EtalaseMen selectedFilters={selectedFilters} />
        </div> */}
      </div>
    </div>
  );
}

export default MenPublicPage;
