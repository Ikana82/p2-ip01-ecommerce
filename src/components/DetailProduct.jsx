import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { rupiahFormat } from "../utils/rupiahFormatter";

import { BsCart3 } from "react-icons/bs";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";

import { addToCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";

function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImgUrl, setSelectedImgUrl] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const handleAddToCart = (p) => {
    dispatch(
      addToCart({
        ...p,
        quantity,
        // id: product.id,
        // title: product.title,
        // price: Number(product.price) || 0,
        // quantity: Number(quantity) || 1,
        // image: product.image || product.imgUrl?.[0] || "",
      })
    );
  };

  useEffect(() => {
    async function fetchProductById() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const fetchedProduct = { id: docSnap.id, ...data };
          setProduct(fetchedProduct);

          if (fetchedProduct.imgUrl && fetchedProduct.imgUrl.length > 0) {
            setSelectedImgUrl(fetchedProduct.imgUrl[0]);
          }
        } else {
          console.error("No such document with ID:", id);
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProductById();
  }, [id]);

  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (!product) return <h1 className="text-center mt-10">Product not found</h1>;

  const { name, category, gender, description, price, imgUrl, size, color } =
    product;

  const images = imgUrl && Array.isArray(imgUrl) ? imgUrl : [];
  const thumbnails = images.slice(0, 3);

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col gap-24 pl-12 py-12">
      <div className="w-full flex justify-between gap-14">
        {/* Thumbnail List */}
        <div className="flex flex-col justify-center items-center gap-6">
          {thumbnails.map((url, i) => (
            <div
              key={i}
              className={`w-16 h-16 relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
                selectedImgUrl === url
                  ? "scale-125 border-2 border-neutral-950"
                  : ""
              }`}
              onClick={() => setSelectedImgUrl(url)}
            >
              <img
                className="w-full h-full object-cover"
                src={url || "https://placehold.co/68x68"}
                alt={`thumbnail ${i}`}
              />
            </div>
          ))}
          {/* <div className="flex flex-col justify-center items-center gap-5">
            <MdKeyboardArrowUp className="w-6 h-6 p-1 bg-white text-black rounded-full border border-gray-400 shadow cursor-pointer" />
            <MdKeyboardArrowDown className="w-6 h-6 p-1 bg-neutral-700 text-white rounded-full shadow cursor-pointer" />
          </div> */}
        </div>

        {/* Main Image */}
        <img
          className="w-[520px] h-[785px] object-cover rounded-xl"
          src={selectedImgUrl || "https://placehold.co/520x785"}
          alt={name}
        />

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-9">
          <div className="flex items-center gap-3.5 text-zinc-500 text-lg font-medium">
            <span>Product</span>
            <span>/</span>
            <span>{gender || "Unknown"}</span>
            <span>/</span>
            <span>{category || "Product"}</span>
          </div>

          <h1 className="text-neutral-700 text-4xl font-semibold leading-[47.6px]">
            {name}
          </h1>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className="px-3 py-1 bg-gray-300 rounded-lg"
            >
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-300 rounded-lg"
            >
              +
            </button>
          </div>

          {/* Button & Price */}
          <div className="flex gap-4 items-center">
            <button
              onClick={() => handleAddToCart(product)}
              className="px-10 py-3 bg-neutral-950 text-white text-lg font-semibold rounded-lg flex items-center gap-3 hover:bg-neutral-800 transition"
            >
              <BsCart3 className="w-6 h-6" />
              Add to cart
            </button>
            <div className="px-10 py-3 border border-neutral-950 text-neutral-950 text-lg font-semibold rounded-lg">
              {rupiahFormat(price)}
            </div>
          </div>
        </div>
      </div>

      {/* Description & Video Section */}
      <div className="flex justify-between gap-16 items-start">
        <div className="w-[612px] flex flex-col gap-7">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-7 bg-purple-600 rounded-[10px]" />
            <h2 className="text-neutral-700 text-3xl font-semibold">
              Product Description
            </h2>
          </div>
          <p className="text-zinc-500 text-base font-normal mt-2">
            {description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
