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
    <div className="">
      <div className=""></div>

      <EtalaseMen selectedFilters={selectedFilters} />
    </div>
  );
}

export default MenPublicPage;
