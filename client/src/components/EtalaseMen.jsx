import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
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

export default function EtalaseMen() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [originalProducts, setOriginalProducts] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      text: `${product.name} has been added to your shopping bag.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        const set = new Set();
        snap.forEach((doc) => {
          const data = doc.data();
          if (data.gender === "Men" && data.category) {
            set.add(data.category);
          }
        });
        setCategories([...set]);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let q = query(collection(db, "products"));

        q = query(q, where("gender", "==", "Men"));

        if (filter) {
          q = query(q, where("category", "==", filter));
        }

        const snapshot = await getDocs(q);
        let fetchedProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

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
  }, [filter, sort]);

  useEffect(() => {
    const filteredProducts = originalProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setProducts(filteredProducts);
  }, [search, originalProducts]);

  const handleSort = (newSort) => {
    if (sort === newSort) {
      setSort("");
    } else {
      setSort(newSort);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="relative w-full sm:w-1/2">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search men's product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200 shadow-sm"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="select select-bordered w-full sm:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition-all duration-200"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((item) => {
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
      )}
    </div>
  );
}
