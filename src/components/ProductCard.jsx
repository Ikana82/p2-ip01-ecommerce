import React from "react";
import { MdOutlineStar } from "react-icons/md";
import { FaHeart, FaRegEye } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col gap-4 border border-gray-100 rounded-xl p-2 transition-all duration-300 ease-in-out hover:border-gray-300 hover:shadow-md cursor-pointer">
      {/* Gambar Produk */}
      <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-3 right-3 bg-white w-8 h-8 flex items-center justify-center rounded-full shadow transition">
          <FaHeart className="text-gray-400 hover:text-red-600 text-lg" />
        </button>
      </div>

      {/* Detail Produk */}
      <div className="flex flex-col items-start px-2">
        {/* Nama Produk */}
        <div className="flex flex-col gap-1.5">
          {/* Brand - Asumsi brand belum ada di Firestore, jadi dikosongkan */}
          <div className="text-sm font-bold text-zinc-700">Brand</div>
          <div className="text-base text-zinc-800 font-medium leading-tight">
            {product.name}
          </div>
        </div>

        {/* Rating dan Review */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1.5">
            <MdOutlineStar className="text-yellow-400 w-6 h-6" />
            <div className="text-sm text-zinc-500 font-medium">
              {product.rating}
            </div>
          </div>
          <div className="text-sm text-zinc-500 font-medium">
            (132 reviews) {/* Nilai hardcoded, bisa disesuaikan */}
          </div>
        </div>

        {/* Harga dan Aksi */}
        <div className="flex justify-between items-center w-full">
          <div className="text-base font-semibold text-zinc-800 leading-tight">
            ${Number(product.price).toFixed(2)} USD
          </div>
          <div className="flex gap-1">
            <Link
              to={`/product/${product.id}`}
              className="w-10 h-10 p-2 bg-white rounded-lg shadow-inner border border-gray-200 flex items-center justify-center hover:bg-gray-200"
            >
              <FaRegEye className="w-5 h-5 text-zinc-800" />
            </Link>
            <button className="w-10 h-10 p-2 bg-white rounded-lg shadow-inner border border-gray-200 flex items-center justify-center hover:bg-gray-200">
              <TbShoppingBagPlus className="w-5 h-5 text-zinc-800" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
