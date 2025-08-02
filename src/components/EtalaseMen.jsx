import React from "react";
import { MdOutlineStar } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";

const EtalaseMen = () => {
  const products = [
    {
      title: "Brushed Jersey Jacket | Pattern",
      price: "123.00",
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/481006001/item/idgoods_08_481006001_3x4.jpg?width=369",
    },
    {
      title: "Miracle Air Blazer",
      price: "11.00",
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/477704/item/idgoods_69_477704_3x4.jpg?width=294",
    },
    {
      title: "AIRism Cotton Pique Polo Shirt",
      price: "119.00",
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/475367/item/idgoods_08_475367_3x4.jpg?width=294",
    },
    {
      title: "Miracle Air Blazer",
      price: "11.00",
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/477704/item/idgoods_69_477704_3x4.jpg?width=294",
    },
    {
      title: "Brushed Jersey Jacket | Pattern",
      price: "123.00",
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/481006001/item/idgoods_08_481006001_3x4.jpg?width=369",
    },
    {
      title: "AIRism Cotton Pique Polo Shirt",
      price: "119.00",
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/475367/item/idgoods_08_475367_3x4.jpg?width=294",
    },
    {
      title: "Brushed Jersey Jacket | Pattern",
      price: "123.00",
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/481006001/item/idgoods_08_481006001_3x4.jpg?width=369",
    },
  ];

  const ProductCard = ({
    title,
    brand,
    price,
    image,
    rating = 4.5,
    reviews = 132,
  }) => {
    return (
      <div className="flex flex-col gap-4 border border-gray-100 rounded-xl p-2 transition-all duration-300 ease-in-out hover:border-gray-300 hover:shadow-md cursor-pointer">
        {/* Gambar Produk */}
        <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <button className="absolute top-3 right-3 bg-white w-8 h-8 flex items-center justify-center rounded-full shadow transition">
            <FaHeart className="text-gray-400 hover:text-red-600 text-lg" />
          </button>
        </div>

        {/* Detail Produk */}
        <div className="flex flex-col items-start px-2">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <div className="text-sm font-bold text-zinc-700">{brand}</div>
            <div className="text-base text-zinc-800 font-medium leading-tight">
              {title}
            </div>
          </div>

          {/* Rating dan Review */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1.5">
              <MdOutlineStar className="text-yellow-400 w-6 h-6" />
              <div className="text-sm text-zinc-500 font-medium">{rating}</div>
            </div>
            <div className="text-sm text-zinc-500 font-medium">
              ({reviews} reviews)
            </div>
          </div>

          {/* Harga dan Cart */}
          <div className="flex justify-between items-center w-full">
            <div className="text-base font-semibold text-zinc-800 leading-tight">
              {price} USD
            </div>
            <div className="flex gap-1">
              <button className="w-10 h-10 p-2 bg-white rounded-lg shadow-inner border border-gray-200 flex items-center justify-center hover:bg-gray-200">
                <FaRegEye className="w-5 h-5 text-zinc-800" />
              </button>
              <button className="w-10 h-10 p-2 bg-white rounded-lg shadow-inner border border-gray-200 flex items-center justify-center hover:bg-gray-200">
                <TbShoppingBagPlus className="w-5 h-5 text-zinc-800" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full max-w-[895px] mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-center text-xl font-semibold text-zinc-700">
          <span>Men’s Clothing</span>
          <div className="flex gap-4 text-base">
            <span className="text-purple-600">New</span>
            <span className="text-zinc-700">Recommended</span>
          </div>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default EtalaseMen;
