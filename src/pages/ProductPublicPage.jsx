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
// import notFoundImage from "../assets/NotFound.png";

import { addToCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const PAGE_LIMIT = 10;

const ProductPublicPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();

    const hasDiscount = product.discountPrice > 0;
    const discountedPrice = hasDiscount
      ? product.price - (product.price * product.discountPrice) / 100
      : product.price;

    dispatch(
      addToCart({
        ...product,
        originalPrice: product.price,
        price: discountedPrice,
        discount: product.discountPrice || 0,
        quantity: 1,
      })
    );

    Swal.fire({
      title: "Added to Cart!",
      text: `${product.name} has been added to the cart.`,
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

  async function fetchProducts(pageNumber) {
    setLoading(true);
    setError(null);
    try {
      const baseQuery = query(
        collection(db, "products"),
        orderBy("createdAt", "desc")
      );

      const totalSnapshot = await getDocs(baseQuery);
      const totalItems = totalSnapshot.size;
      const totalPages = Math.ceil(totalItems / PAGE_LIMIT);
      setTotalPage(totalPages || 1);

      let q;
      if (pageNumber > 1) {
        const startDocQuery = query(
          baseQuery,
          limit((pageNumber - 1) * PAGE_LIMIT)
        );
        const startDocSnapshot = await getDocs(startDocQuery);
        const startDoc =
          startDocSnapshot.docs[startDocSnapshot.docs.length - 1];
        if (!startDoc) {
          throw new Error("Start document not found for pagination.");
        }
        q = query(baseQuery, startAfter(startDoc), limit(PAGE_LIMIT));
      } else {
        q = query(baseQuery, limit(PAGE_LIMIT));
      }

      const snapshot = await getDocs(q);
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPage, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons && totalPage > maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`h-9 w-9 flex items-center justify-center text-sm rounded transition-colors ${
            i === currentPage
              ? "bg-black text-white font-bold"
              : "bg-white text-zinc-800 border border-gray-300"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col gap-8">
      {/* Search Input */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search product..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loading && (
          <p className="text-center col-span-full">
            <span className="loading loading-spinner text-neutral"></span>
          </p>
        )}

        {error && (
          <p className="text-center col-span-full text-red-500">{error}</p>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="flex justify-center items-center col-span-full flex-col p-8">
            <img alt="Products not found" className="max-w-md w-full" />
            <p className="text-gray-500 text-lg mt-4">No products found</p>
          </div>
        )}

        {!loading &&
          !error &&
          filteredProducts.map((item) => {
            const hasDiscount = item.discountPrice > 0;
            const discountedPrice = hasDiscount
              ? item.price - (item.price * item.discountPrice) / 100
              : item.price;

            return (
              <div key={item.id}>
                <div
                  className="flex flex-col items-start gap-3 border border-gray-200 bg-white hover:shadow-sm rounded-[10px] p-2 transition-shadow duration-200 cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img
                    src={item.imgUrl?.[0]}
                    alt={item.name}
                    className="w-full h-80 object-cover rounded-[10px]"
                  />
                  <div className="flex flex-col gap-1 w-full px-2">
                    <p className="text-zinc-900 text-lg font-medium truncate">
                      {item.name}
                    </p>
                    <p className="text-zinc-500 text-sm font-normal">
                      {item.category}
                    </p>

                    {/* Rating + Discount */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
                      <div className="flex items-center gap-1">
                        <MdOutlineStar className="text-yellow-400 w-5 h-5" />
                        {item.rating || "N/A"}
                      </div>
                      {hasDiscount && (
                        <span className="text-green-600 font-bold">
                          Discount {item.discountPrice}%
                        </span>
                      )}
                    </div>

                    {/* Price + Actions */}
                    <div className="flex justify-between items-center w-full mt-1">
                      <div className="flex flex-col">
                        {hasDiscount && (
                          <span className="text-gray-400 text-sm line-through">
                            Rp
                            {Number(item.price).toLocaleString("id-ID")}
                          </span>
                        )}
                        <span className="text-black text-lg font-medium">
                          Rp
                          {Number(discountedPrice).toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${item.id}`);
                          }}
                          className="w-8 h-8 p-1.5 bg-gray-100 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                        >
                          <FaRegEye className="text-black text-xl" />
                        </button>
                        <button
                          onClick={(e) => handleAddToCart(e, item)}
                          className="w-8 h-8 p-1.5 bg-gray-100 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                        >
                          <TbShoppingBagPlus className="text-black text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Pagination UI */}
      <div className="flex items-center justify-center gap-1.5 mt-8">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="px-4 py-2 bg-white rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPage || loading}
          className="px-4 py-2 bg-white rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPublicPage;
