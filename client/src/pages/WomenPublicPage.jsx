import React, { useState } from "react";
import FilterWoman from "../components/FilterWoman";
import EtalaseWoman from "../components/EtalaseWoman";

function WomenPublicPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    styles: [],
    colors: [],
    sizes: [],
  });

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto p-4 flex-grow">
        {/* Filter Sidebar */}
        <div className="w-full md:w-1/5 bg-white p-4 rounded-lg shadow-md">
          <FilterWoman
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        {/* Product Grid */}
        <div className="flex-1 p-4 rounded-lg">
          <EtalaseWoman
            selectedFilters={selectedFilters}
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
          />
        </div>
      </div>
    </div>
  );
}

export default WomenPublicPage;
