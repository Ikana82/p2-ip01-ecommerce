import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { MdOutlineStar } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import Swal from "sweetalert2";
import notFoundData from "../assets/notfounddata.png";

export default function PromoLow() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fungsi menambah ke cart dengan harga diskon
  const handleAddToCart = (product) => {
    // Hitung harga final
    const finalPrice = product.discountPrice
      ? Math.round(product.price * (1 - product.discountPrice / 100))
      : product.price;

    // Kirim ke redux dengan harga yang sudah diskon
    dispatch(addToCart({ ...product, price: finalPrice, quantity: 1 }));

    Swal.fire({
      title: "Added to Cart!",
      text: `${product.name} has been added to your shopping bag.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    const fetchPromoLow = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "products"),
          where("discountPrice", ">=", 15),
          where("discountPrice", "<=", 30)
        );

        const snapshot = await getDocs(q);
        const fetchedProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching promo low:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromoLow();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-800">
        Special Offers You Can’t Miss – Save Up to 30%!
      </h2>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          <span className="loading loading-spinner text-neutral"></span>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full min-h-[50vh]">
          <div className="w-full max-w-sm h-auto overflow-hidden">
            <img
              src={notFoundData}
              className="w-full h-auto object-contain"
              alt="No promo found"
            />
          </div>
          <p className="mt-4 text-gray-500 text-center">
            No promotional products found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
          {products.map((product) => {
            const finalPrice = product.discountPrice
              ? Math.round(product.price * (1 - product.discountPrice / 100))
              : product.price;

            return (
              <div
                key={product.id}
                className="flex flex-col items-start gap-3 border border-gray-200 bg-white hover:shadow-sm rounded-[10px] p-2 transition-shadow duration-200"
              >
                {/* Image */}
                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="w-full aspect-[3/4] overflow-hidden rounded-[10px] cursor-pointer"
                >
                  <img
                    src={product.imgUrl || product.imageUrls?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-1 w-full px-2">
                  <p className="text-zinc-900 text-lg font-medium truncate">
                    {product.name}
                  </p>
                  <p className="text-zinc-500 text-sm font-normal">
                    {product.category}
                  </p>

                  {/* Rating + Promo */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
                    <div className="flex items-center gap-1">
                      <MdOutlineStar className="text-yellow-400 w-5 h-5" />
                      {product.rating || "N/A"}
                    </div>
                    <span className="text-green-600 font-bold space">
                      {product.discountPrice
                        ? `Discount ${product.discountPrice}%`
                        : "No Discount"}
                    </span>
                  </div>

                  {/* Price + Actions */}
                  <div className="flex justify-between items-center w-full mt-1">
                    <p className="text-black text-xl font-medium">
                      Rp{Number(finalPrice).toLocaleString("id-ID")}
                    </p>
                    <div className="flex gap-2">
                      <button
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-300 transition"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <FaRegEye className="text-black text-xl" />
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-300 transition"
                      >
                        <TbShoppingBagPlus className="text-black text-xl" />
                      </button>
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
