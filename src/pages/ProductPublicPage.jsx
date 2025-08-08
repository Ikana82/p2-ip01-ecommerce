import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { MdOutlineStar } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import notFoundImage from "../assets/NotFound.png";

import { addToCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const PAGE_LIMIT = 10;

const ProductPublicPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (p) => {
    dispatch(
      addToCart({
        ...p,
        quantity,
      })
    );

    Swal.fire({
      title: "Added to Cart!",
      text: `${p.name} has been added to the cart.`,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        content: "custom-swal-content",
      },
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Query to get the total item count
        const countQuery = query(collection(db, "products"));
        const countSnapshot = await getDocs(countQuery);
        const totalItems = countSnapshot.size;
        const currentTotalPage = Math.ceil(totalItems / PAGE_LIMIT);
        setTotalPage(currentTotalPage);

        // If the current page exceeds the total pages, reset to 1
        if (currentPage > currentTotalPage && currentTotalPage > 0) {
          setCurrentPage(1);
          setLoading(false);
          return;
        }

        // Main query with pagination
        let q;
        if (currentPage === 1) {
          q = query(
            collection(db, "products"),
            orderBy("createdAt", "desc"),
            limit(PAGE_LIMIT)
          );
        } else {
          const prevPageQuery = query(
            collection(db, "products"),
            orderBy("createdAt", "desc"),
            limit((currentPage - 1) * PAGE_LIMIT)
          );
          const prevPageSnapshot = await getDocs(prevPageQuery);
          const lastVisibleDoc =
            prevPageSnapshot.docs[prevPageSnapshot.docs.length - 1];

          if (lastVisibleDoc) {
            q = query(
              collection(db, "products"),
              orderBy("createdAt", "desc"),
              startAfter(lastVisibleDoc),
              limit(PAGE_LIMIT)
            );
          } else {
            console.error(
              "The last document from the previous page was not found."
            );
            setLoading(false);
            return;
          }
        }

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 flex flex-col gap-8">
        {/* Search Input */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search product ..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {loading && (
            <p className="text-gray-500 text-center col-span-full">
              <span className="loading loading-spinner text-neutral"></span>
            </p>
          )}

          {error && (
            <p className="text-red-500 text-center col-span-full">{error}</p>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="flex justify-center items-center col-span-full flex-col p-8">
              <img
                src={notFoundImage}
                alt="Products not found"
                className="max-w-md w-full"
              />
              <p className="text-gray-500 text-lg mt-4">No products found</p>
            </div>
          )}

          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-2 border border-gray-200 rounded-xl p-2 transition-all duration-300 ease-in-out hover:border-gray-300 hover:shadow-md cursor-pointer"
            >
              {/* Product Image */}
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                className="relative rounded-lg overflow-hidden aspect-[3/4]"
              >
                <img
                  src={
                    Array.isArray(product.imgUrl)
                      ? product.imgUrl[0]
                      : product.imgUrl
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col items-start px-2">
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-zinc-800 font-medium leading-tight">
                    {product.name}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-1">
                  <MdOutlineStar className="text-yellow-400 w-4 h-4" />
                  <div className="text-xs text-zinc-500 font-medium">
                    {product.rating || "N/A"}
                  </div>
                  <div className="text-xs text-zinc-500 font-medium ml-2">
                    - Happy Shopping!!
                  </div>
                </div>

                {/* Price + Actions */}
                <div className="flex justify-between items-center w-full mt-2">
                  <div className="text-sm font-semibold text-zinc-800 leading-tight">
                    Rp{Number(product.price).toLocaleString("id-ID")}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="w-8 h-8 p-1.5 bg-white rounded-lg shadow-inner border border-gray-200 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                    >
                      <FaRegEye className="w-4 h-4 text-zinc-800" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-8 h-8 p-1.5 bg-white rounded-lg shadow-inner border border-gray-200 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                    >
                      <TbShoppingBagPlus className="w-4 h-4 text-zinc-800" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination UI */}
        <div className="inline-flex justify-center items-center gap-1.5 mt-8">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`h-9 px-3 py-2 rounded outline-offset-[-1px] outline-gray-200 flex justify-center items-center gap-1 transition-all duration-200 ${
              currentPage === 1
                ? "bg-gray-100 text-zinc-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <svg
              className={`w-4 h-4 transform rotate-180 ${
                currentPage === 1 ? "text-zinc-400" : "text-zinc-600"
              }`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 8.75L14.25 12L10.75 15.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              className={`text-sm font-normal leading-tight ${
                currentPage === 1 ? "text-zinc-400" : "text-zinc-800"
              }`}
            >
              Prev
            </div>
          </button>

          {/* Page Number Buttons */}
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-9 px-3 py-2 rounded transition-all duration-200 ${
                page === currentPage
                  ? "bg-zinc-800 text-white font-bold"
                  : "bg-white outline-offset-[-1px] outline-gray-200 text-zinc-800 font-normal hover:bg-gray-50"
              }`}
            >
              <div className="text-sm leading-tight">{page}</div>
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPage}
            className={`h-9 px-3 py-2 rounded outline-offset-[-1px] outline-gray-200 flex justify-center items-center gap-1 transition-all duration-200 ${
              currentPage === totalPage
                ? "bg-gray-100 text-zinc-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <div
              className={`text-sm font-normal leading-tight ${
                currentPage === totalPage ? "text-zinc-400" : "text-zinc-800"
              }`}
            >
              Next
            </div>
            <svg
              className={`w-4 h-4 ${
                currentPage === totalPage ? "text-zinc-400" : "text-zinc-600"
              }`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 8.75L14.25 12L10.75 15.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductPublicPage;
