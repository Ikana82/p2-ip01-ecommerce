import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { MdOutlineStar } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import notFoundData from "../assets/notfounddata.png";
import Swal from "sweetalert2";

export default function EtalaseWoman({
  selectedFilters,
  search,
  setSearch,
  sort,
  setSort,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [originalProducts, setOriginalProducts] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    Swal.fire({
      title: "Added to Cart!",
      text: `${product.name} has been added to your shopping bag.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let q = collection(db, "products");
        let queryConstraints = [where("gender", "==", "Women")];

        // Menerapkan filter berdasarkan selectedFilters
        if (selectedFilters.categories.length > 0) {
          queryConstraints.push(
            where("category", "in", selectedFilters.categories)
          );
        }
        if (selectedFilters.styles.length > 0) {
          queryConstraints.push(
            where("style", "array-contains-any", selectedFilters.styles)
          );
        }
        if (selectedFilters.colors.length > 0) {
          queryConstraints.push(
            where("color", "array-contains-any", selectedFilters.colors)
          );
        }
        if (selectedFilters.sizes.length > 0) {
          queryConstraints.push(
            where("size", "array-contains-any", selectedFilters.sizes)
          );
        }

        // Membangun query dengan semua constraint
        q = query(q, ...queryConstraints);

        const snapshot = await getDocs(q);
        let fetchedProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort on the client-side
        if (sort === "asc") {
          fetchedProducts.sort((a, b) => a.price - b.price);
        } else if (sort === "desc") {
          fetchedProducts.sort((a, b) => b.price - a.price);
        }

        setOriginalProducts(fetchedProducts);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedFilters, sort]); // Dipicu saat filter atau sort berubah

  useEffect(() => {
    // Client-side search
    const filteredProducts = originalProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setProducts(filteredProducts);
  }, [search, originalProducts]); // Dipicu saat input search berubah

  const handleSort = (newSort) => {
    if (sort === newSort) {
      setSort("");
    } else {
      setSort(newSort);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-2 justify-start items-center">
        {/* Search Input */}
        <div className="relative w-full sm:w-1/2">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search women's product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Sort Buttons */}
        <div className="flex gap-2 justify-self-end">
          <button
            className={`p-2 rounded border ${
              sort === "asc"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => handleSort("asc")}
          >
            <GoSortAsc size={20} />
          </button>
          <button
            className={`p-2 rounded border ${
              sort === "desc"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => handleSort("desc")}
          >
            <GoSortDesc size={20} />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          <span className="loading loading-spinner text-neutral"></span>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full min-h-[50vh] px-4 sm:px-0">
          <div className="w-full max-w-sm h-auto overflow-hidden">
            <img
              src={notFoundData}
              className="w-full h-auto object-contain"
              alt="No product found"
            />
          </div>
          <p className="mt-4 text-gray-500 text-center">
            No matching product found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition"
            >
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                className="aspect-[3/4] overflow-hidden rounded-lg cursor-pointer"
              >
                <img
                  src={product.imgUrl || product.imageUrls?.[0]}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-3">
                <div className="text-sm text-gray-500 font-semibold">
                  {product.brand}
                </div>
                <div className="text-base font-medium text-gray-900">
                  {product.name}
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <MdOutlineStar className="text-yellow-400 w-5 h-5" />
                  {product.rating || "N/A"} - Happy Shopping!!
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="text-lg font-bold text-zinc-800">
                    Rp{Number(product.price).toLocaleString("id-ID")}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded border hover:bg-gray-200"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <FaRegEye />
                    </button>
                    <button
                      className="p-2 rounded border hover:bg-gray-200"
                      onClick={() => handleAddToCart(product)}
                    >
                      <TbShoppingBagPlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
