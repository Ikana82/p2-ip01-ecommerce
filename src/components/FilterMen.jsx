import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { LuSettings2 } from "react-icons/lu";

export default function FilterMen({ selectedFilters, handleFilterSelection }) {
  const [filterData, setFilterData] = useState({
    categories: [],
    styles: [],
    colors: [],
    sizes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const allData = querySnapshot.docs.map((doc) => doc.data());

        const uniqueCategories = [
          ...new Set(
            allData
              .flatMap((item) =>
                typeof item.style === "string"
                  ? item.category.split(/[,\s]+/).map((s) => s.trim())
                  : Array.isArray(item.category)
                  ? item.category
                  : []
              )
              .filter(Boolean)
          ),
        ];

        const uniqueStyles = [
          ...new Set(
            allData
              .flatMap((item) =>
                typeof item.style === "string"
                  ? item.style.split(/[,\s]+/).map((s) => s.trim())
                  : Array.isArray(item.style)
                  ? item.style
                  : []
              )
              .filter(Boolean)
          ),
        ];

        const uniqueColors = [
          ...new Set(
            allData
              .flatMap((item) =>
                Array.isArray(item.color)
                  ? item.color
                  : typeof item.color === "string"
                  ? item.color.split(/[,\s]+/).map((c) => c.trim())
                  : []
              )
              .filter(Boolean)
          ),
        ];

        const uniqueSizes = [
          ...new Set(
            allData
              .flatMap((item) =>
                Array.isArray(item.size)
                  ? item.size
                  : typeof item.size === "string"
                  ? item.size.split(/[,\s]+/).map((s) => s.trim())
                  : []
              )
              .filter(Boolean)
          ),
        ];

        const formattedColors = uniqueColors.map((colorName) => ({
          name: colorName,
          hex: getHexCodeForColor(colorName),
        }));

        setFilterData({
          categories: uniqueCategories,
          styles: uniqueStyles,
          colors: formattedColors,
          sizes: uniqueSizes,
        });
        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil data kategori:", err);
        setLoading(false);
      }
    };

    const getHexCodeForColor = (colorName) => {
      switch (colorName.toLowerCase()) {
        case "purple":
          return "#8B5CF6";
        case "navy":
          return "#1E3A8A";
        case "yellow":
          return "#FDE047";
        case "black":
          return "#000000";
        case "white":
          return "#FFFFFF";
        case "grey":
          return "#A1A1AA";
        case "red":
          return "#EF4444";
        case "broom":
          return "#E18235";
        case "pink":
          return "#F472B6";
        case "orange":
          return "#F97316";
        case "green":
          return "#22C55E";
        case "blue":
          return "#3B82F6";
        default:
          return "#D4D4D4";
      }
    };

    fetchAllCategories();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Memuat filter...</p>;
  }

  return (
    <div className="w-full inline-flex flex-col justify-start items-start gap-8 px-2">
      {/* Header Filter */}
      <div className="flex items-center justify-between w-full max-w-xs">
        <div className="flex items-center gap-2">
          <span className="text-zinc-600 text-lg font-semibold">Filter</span>
        </div>
        <LuSettings2 className="text-zinc-600 rotate-90" size={24} />
      </div>

      {/* Category Filter */}
      {filterData.categories?.length > 0 && (
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <span className="text-zinc-600 text-base font-semibold">
            Categories
          </span>
          {filterData.categories.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-100 transition"
              onClick={() => handleFilterSelection("categories", item)}
            >
              <span
                className={`text-base ${
                  selectedFilters.categories.includes(item)
                    ? "text-purple-600 font-semibold"
                    : "text-zinc-600"
                }`}
              >
                {item}
              </span>
              <input
                type="checkbox"
                checked={selectedFilters.categories.includes(item)}
                onChange={() => handleFilterSelection("categories", item)}
                className="form-checkbox h-5 w-5 text-purple-600 rounded"
              />
            </div>
          ))}
        </div>
      )}

      {/* Style Filter */}
      {filterData.styles?.length > 0 && (
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <span className="text-zinc-600 text-base font-semibold">
            Dress Style
          </span>
          {filterData.styles.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-100 transition"
              onClick={() => handleFilterSelection("styles", item)}
            >
              <span
                className={`text-base ${
                  selectedFilters.styles.includes(item)
                    ? "text-purple-600 font-semibold"
                    : "text-zinc-600"
                }`}
              >
                {item}
              </span>
              <input
                type="checkbox"
                checked={selectedFilters.styles.includes(item)}
                onChange={() => handleFilterSelection("styles", item)}
                className="form-checkbox h-5 w-5 text-purple-600 rounded"
              />
            </div>
          ))}
        </div>
      )}

      {/* Price Filter */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <span className="text-zinc-600 text-lg font-semibold">Price</span>
        <div className="relative w-full">
          <div className="h-[3px] bg-zinc-300 rounded w-full absolute top-[10px]" />
          <div className="h-[3px] bg-black rounded absolute left-[25%] w-[50%] top-[10px]" />
          <div className="w-4 h-4 bg-black rounded-full absolute left-[24%] top-[6px]" />
          <div className="w-4 h-4 bg-black rounded-full absolute left-[74%] top-[6px]" />
        </div>
        <div className="flex justify-between">
          <div className="border border-stone-300 rounded-lg w-24 text-center py-1 text-neutral-700 text-base font-medium">
            Rp 120.000
          </div>
          <div className="border border-stone-300 rounded-lg w-24 text-center py-1 text-neutral-700 text-base font-medium">
            Rp 500.000
          </div>
        </div>
      </div>

      {/* Color Filter */}
      {filterData.colors?.length > 0 && (
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <span className="text-neutral-600 text-lg font-semibold">Colors</span>
          <div className="grid grid-cols-4 gap-4">
            {filterData.colors.map(({ name, hex }, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition"
                onClick={() => handleFilterSelection("colors", name)}
              >
                <div
                  className={`w-9 h-9 rounded-xl ${
                    selectedFilters.colors.includes(name)
                      ? "ring-2 ring-offset-2 ring-purple-600"
                      : ""
                  }`}
                  style={{ backgroundColor: hex }}
                />
                <span
                  className={`text-sm font-medium ${
                    selectedFilters.colors.includes(name)
                      ? "text-purple-600"
                      : "text-zinc-500"
                  }`}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Size Filter */}
      {filterData.sizes?.length > 0 && (
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <span className="text-zinc-600 text-lg font-semibold">Size</span>
          <div className="grid grid-cols-3 gap-2">
            {filterData.sizes.map((size, idx) => (
              <div
                key={idx}
                onClick={() => handleFilterSelection("sizes", size)}
                className={`w-16 h-8 flex items-center justify-center border border-stone-300 rounded-lg text-sm font-semibold cursor-pointer transition ${
                  selectedFilters.sizes.includes(size)
                    ? "bg-black text-white"
                    : "text-neutral-700 hover:bg-gray-200"
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
