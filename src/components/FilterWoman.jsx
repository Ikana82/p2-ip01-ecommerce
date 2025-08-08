import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { LuSettings2 } from "react-icons/lu";

// Menerima props dari WomenPublicPage
export default function FilterWoman({ selectedFilters, setSelectedFilters }) {
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
        const querySnapshot = await getDocs(collection(db, "products"));
        const allData = querySnapshot.docs.map((doc) => doc.data());

        const uniqueCategories = [
          ...new Set(
            allData
              .flatMap((item) =>
                typeof item.category === "string"
                  ? item.category.split(",").map((s) => s.trim())
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
                  ? item.style.split(",").map((s) => s.trim())
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
                  ? item.color.split(",").map((c) => c.trim())
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
                  ? item.size.split(",").map((s) => s.trim())
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
          return "#D946EF";
        case "pink":
          return "#EC4899";
        case "black":
          return "#000000";
        case "white":
          return "#FFFFFF";
        case "grey":
          return "#A1A1AA";
        case "red":
          return "#EF4444";
        case "blue":
          return "#3B82F6";
        case "green":
          return "#22C55E";
        case "yellow":
          return "#FACC15";
        case "orange":
          return "#FB923C";
        default:
          return "#D4D4D4";
      }
    };

    fetchAllCategories();
  }, []);

  const handleFilterSelection = (type, value) => {
    setSelectedFilters((prevFilters) => {
      const prevSelected = prevFilters[type];
      const isSelected = prevSelected.includes(value);

      const updated = isSelected
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value];

      return { ...prevFilters, [type]: updated };
    });
  };

  if (loading) return <p className="text-gray-500">Memuat filter...</p>;

  return (
    // Menghilangkan `max-w-xs` dari setiap div filter
    <div className="w-full inline-flex flex-col justify-start items-start gap-8 px-2">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <span className="text-zinc-600 text-lg font-semibold">Filter</span>
        <LuSettings2 className="text-zinc-600 rotate-90" size={24} />
      </div>

      {/* Categories */}
      {filterData.categories?.length > 0 && (
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
      )}

      {/* Styles */}
      {filterData.styles?.length > 0 && (
        <div className="flex flex-col gap-3 w-full">
          <span className="text-zinc-600 text-base font-semibold">
            Dress Style
          </span>
          {filterData.styles.map((item, index) => {
            const isActive = selectedFilters.styles.includes(item);
            return (
              <div
                key={index}
                className="flex justify-between items-center px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-100 transition"
                onClick={() => handleFilterSelection("styles", item)}
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
                  onChange={() => handleFilterSelection("styles", item)}
                  className="form-checkbox h-5 w-5 text-purple-500 rounded"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Colors */}
      {filterData.colors?.length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          <span className="text-neutral-600 text-lg font-semibold">Colors</span>
          <div className="grid grid-cols-4 gap-4">
            {filterData.colors.map(({ name, hex }, idx) => {
              const isActive = selectedFilters.colors.includes(name);
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition"
                  onClick={() => handleFilterSelection("colors", name)}
                >
                  <div
                    className={`w-9 h-9 rounded-xl ${
                      isActive ? "ring-2 ring-offset-2 ring-purple-600" : ""
                    }`}
                    style={{ backgroundColor: hex }}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isActive ? "text-purple-600" : "text-zinc-500"
                    }`}
                  >
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sizes */}
      {filterData.sizes?.length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          <span className="text-zinc-600 text-lg font-semibold">Size</span>
          <div className="grid grid-cols-3 gap-2">
            {filterData.sizes.map((size, idx) => {
              const isActive = selectedFilters.sizes.includes(size);
              return (
                <div
                  key={idx}
                  onClick={() => handleFilterSelection("sizes", size)}
                  className={`w-16 h-8 flex items-center justify-center border border-stone-300 rounded-lg text-sm font-semibold cursor-pointer transition ${
                    isActive
                      ? "bg-black text-white"
                      : "text-neutral-700 hover:bg-gray-200"
                  }`}
                >
                  {size}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
