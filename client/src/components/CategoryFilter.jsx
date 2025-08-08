// src/components/filters/CategoryFilter.jsx
import React from "react";

export default function CategoryFilter({
  filterData,
  selectedFilters,
  handleFilterSelection,
}) {
  return (
    filterData.categories?.length > 0 && (
      <div className="flex flex-col gap-3 w-full">
        <span className="text-zinc-600 text-base font-semibold">
          Categories
        </span>
        {filterData.categories.map((item, index) => {
          const isActive = selectedFilters.categories.includes(item);
          return (
            <div
              key={index}
              className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-100 transition`}
              onClick={() => handleFilterSelection("categories", item)}
            >
              <span
                className={`text-base ${
                  isActive ? "text-purple-600 font-semibold" : "text-zinc-600"
                }`}
              >
                {item}
              </span>
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => handleFilterSelection("categories", item)}
                className="form-checkbox h-5 w-5 text-purple-500 rounded"
              />
            </div>
          );
        })}
      </div>
    )
  );
}
