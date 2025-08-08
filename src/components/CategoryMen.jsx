import { Link } from "react-router";
import { useEffect, useState } from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import { MdOutlineStar } from "react-icons/md";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import Swal from "sweetalert2";

const PAGE_LIMIT = 5;

export default function CategoryWoman() {
  const [menProducts, setMenProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  async function fetchProducts(pageNumber) {
    setLoading(true);
    setError(null);
    try {
      const baseQuery = query(
        collection(db, "products"),
        where("gender", "==", "Men"),
        orderBy("name")
      );

      const totalSnapshot = await getDocs(baseQuery);
      const totalItems = totalSnapshot.size;
      setTotalPage(Math.ceil(totalItems / PAGE_LIMIT) || 1);

      let q;
      if (pageNumber > 1) {
        const startDocQuery = query(
          baseQuery,
          limit((pageNumber - 1) * PAGE_LIMIT)
        );
        const startDocSnapshot = await getDocs(startDocQuery);
        const startDoc =
          startDocSnapshot.docs[startDocSnapshot.docs.length - 1];
        q = query(baseQuery, startAfter(startDoc), limit(PAGE_LIMIT));
      } else {
        q = query(baseQuery, limit(PAGE_LIMIT));
      }

      const snapshot = await getDocs(q);
      setMenProducts(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (error) {
      console.error("Error fetching men products:", error);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
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
    fetchProducts(currentPage);
  }, [currentPage]);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 3;
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
    <section className="w-full px-10 md:px-6 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between px-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-7 bg-black rounded-[10px]" />
          <h2 className="text-xl md:text-2xl font-medium text-neutral-800">
            Categories For Men
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
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

      {/* Content */}
      <div className="relative w-full">
        {loading && (
          <p className="text-center col-span-full">
            <span className="loading loading-spinner text-neutral"></span>
          </p>
        )}
        {error && (
          <p className="text-center col-span-full text-red-500">{error}</p>
        )}
        {!loading && !error && menProducts.length === 0 && (
          <p className="text-center col-span-full">No men's products found.</p>
        )}

        {!loading && menProducts.length > 0 && (
          <div className="px-4 md:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full">
              {menProducts.map((item) => {
                const hasDiscount = item.discountPrice > 0;
                const discountedPrice = hasDiscount
                  ? item.price - (item.price * item.discountPrice) / 100
                  : item.price;

                return (
                  <div key={item.id}>
                    <Link to={`/product/${item.id}`}>
                      <div className="flex flex-col items-start gap-3 border border-gray-200 bg-white hover:shadow-sm rounded-[10px] p-2 transition-shadow duration-200 cursor-pointer">
                        <img
                          src={item.imgUrl || item.imageUrls?.[0]}
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

                          {/* Price */}
                          <div className="flex justify-between items-center w-full mt-1">
                            <div className="flex flex-col">
                              {hasDiscount && (
                                <span className="text-gray-400 text-sm line-through">
                                  Rp{Number(item.price).toLocaleString("id-ID")}
                                </span>
                              )}
                              <span className="text-black text-xl font-medium">
                                Rp
                                {Number(discountedPrice).toLocaleString(
                                  "id-ID"
                                )}
                              </span>
                            </div>
                            <button
                              onClick={(e) => handleAddToCart(e, item)}
                              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                            >
                              <TbShoppingBagPlus className="text-black text-xl" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
