import React from "react";
import { MdKeyboardArrowDown, MdNavigateNext } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";

const FilterMen = () => {
  return (
    <>
      <div className="w-full inline-flex flex-col justify-start items-start gap-8 px-2">
        {/* Header Filter with Icon */}
        <div className="flex items-center justify-between w-60">
          <div className="flex items-center gap-2">
            <span className="text-zinc-600 text-lg font-semibold">Filter</span>
          </div>
          <LuSettings2 className="text-zinc-600 rotate-90" size={24} />
        </div>

        {/* Category Filter Section */}
        <div className="flex flex-col gap-3">
          {[
            "Tops",
            "Plain T-shirts",
            "Full sleeve T-shirts",
            "Joggers",
            "Payjamas",
            "Jeans",
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-60 px-2 py-1 rounded-md cursor-pointer hover:bg-zinc-100 transition"
            >
              <span className="text-zinc-600 text-base font-semibold">
                {item}
              </span>
              <MdNavigateNext className="text-zinc-500" />
            </div>
          ))}
        </div>

        {/* Price Filter */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between w-60">
            <span className="text-zinc-600 text-lg font-semibold">Price</span>
            <MdKeyboardArrowDown className="text-zinc-500" />
          </div>
          <div className="relative w-60">
            <div className="h-[3px] bg-zinc-300 rounded w-full absolute top-[10px]" />
            <div className="h-[3px] bg-purple-600 rounded absolute left-[25%] w-[50%] top-[10px]" />
            <div className="w-4 h-4 bg-purple-600 rounded-full absolute left-[24%] top-[6px]" />
            <div className="w-4 h-4 bg-purple-600 rounded-full absolute left-[74%] top-[6px]" />
          </div>
          <div className="flex justify-between w-60">
            <div className="border border-stone-300 rounded-lg w-24 text-center py-1 text-neutral-700 text-base font-medium">
              Rp 120.000.000
            </div>
            <div className="border border-stone-300 rounded-lg w-24 text-center py-1 text-neutral-700 text-base font-medium">
              Rp 500.000.000
            </div>
          </div>
        </div>

        {/* Color Filter */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between w-60">
            <span className="text-neutral-600 text-lg font-semibold">
              Colors
            </span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { color: "bg-violet-600", label: "Purple" },
              { color: "bg-blue-600", label: "Navy" },
              { color: "bg-orange-300", label: "Yellow" },
              { color: "bg-neutral-800", label: "Black" },
              { color: "bg-white border border-zinc-300", label: "White" }, // border lebih jelas
              { color: "bg-zinc-200", label: "Grey" },
              { color: "bg-orange-600", label: "Red" },
              { color: "bg-orange-400", label: "Broom" },
              { color: "bg-red-300", label: "Pink" },
              { color: "bg-orange-500", label: "Orange" },
              { color: "bg-green-500", label: "Green" },
              { color: "bg-sky-400", label: "Blue" },
            ].map(({ color, label }, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition"
              >
                <div className={`w-9 h-9 rounded-xl ${color}`} />
                <span className="text-zinc-500 text-sm font-semibold">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between w-60">
            <span className="text-zinc-600 text-lg font-semibold">Size</span>
            <MdKeyboardArrowDown className="text-zinc-500" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["XXS", "XL", "XS", "S", "M", "L", "XXL", "3XL", "4XL"].map(
              (size, idx) => (
                <div
                  key={idx}
                  className="w-16 h-8 flex items-center justify-center border border-stone-300 rounded-lg text-neutral-700 text-sm font-semibold cursor-pointer hover:bg-gray-200 transition"
                >
                  {size}
                </div>
              )
            )}
          </div>
        </div>

        {/* Dress Style Filter */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between w-60">
            <span className="text-zinc-600 text-lg font-semibold">
              Dress Style
            </span>
            <MdKeyboardArrowDown className="text-zinc-500" />
          </div>
          <div className="flex flex-col gap-2">
            {[
              "Classic",
              "Casual",
              "Business",
              "Sport",
              "Elegant",
              "Formal (evening)",
            ].map((style, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center w-60 px-2 py-1 rounded-md cursor-pointer hover:bg-zinc-100 transition"
              >
                <span className="text-zinc-600 text-base font-semibold">
                  {style}
                </span>
                <MdNavigateNext className="text-zinc-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterMen;
