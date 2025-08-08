import React from "react";
import FilterMen from "../../components/FilterMen";
import EtalaseMen from "../../components/EtalaseMen";

function MenPublicPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex gap-1 flex-wrap content-start px-10 py-2 flex-grow">
          <div className="w-full md:w-1/5 bg-white">
            <FilterMen />
          </div>
          <div className="grow p-4 rounded-lg">
            <EtalaseMen />
          </div>
        </div>
        <div className="w-full h-[5%] bg-amber-900 text-white text-center py-2">
          Footer
        </div>
      </div>
    </>
  );
}

export default MenPublicPage;
