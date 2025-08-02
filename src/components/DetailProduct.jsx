import React from "react";
import { IoIosStar } from "react-icons/io";
import { BiMessageDetail } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { IoCardOutline } from "react-icons/io5";
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoShirtOutline } from "react-icons/io5";
import { TbRepeat } from "react-icons/tb";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";

function DetailProduct() {
  return (
    <>
      <div className="max-w-screen-xl mx-auto flex flex-col gap-24 px-6 py-12">
        {/* SECTION 1: Image Gallery and Product Info */}
        <div className="w-full flex justify-between gap-14">
          {/* Image Thumbnails */}
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="flex flex-col justify-center items-center gap-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-16 h-16 relative ${i === 1 ? "scale-125" : ""}`}
                >
                  <img
                    className="w-16 h-16 rounded-lg"
                    src="https://placehold.co/68x68"
                    alt="thumbnail"
                  />
                </div>
              ))}
            </div>
            {/* Navigation Arrows */}
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="w-5 h-5 relative">
                <MdKeyboardArrowUp className="w-6 h-6 p-1 bg-white text-black rounded-full border border-gray-400 shadow" />
              </div>
              <div className="w-5 h-5 relative">
                <MdKeyboardArrowDown className="w-6 h-6 p-1 bg-neutral-700 text-white rounded-full shadow" />
              </div>
            </div>
          </div>

          {/* Main Product Image */}
          <img
            className="w-[520px] h-[785px] object-cover rounded-xl"
            src="https://placehold.co/520x785"
            alt="product"
          />

          {/* Product Information */}
          <div className="flex-1 flex flex-col gap-9">
            {/* Breadcrumb */}
            <div className="flex items-center gap-3.5 text-zinc-500 text-lg font-medium">
              <span>Shop</span>
              <span>/</span>
              <span>Women</span>
              <span>/</span>
              <span>Top</span>
            </div>

            {/* Title */}
            <h1 className="text-neutral-700 text-4xl font-semibold leading-[47.6px]">
              Raven Hoodie With <br />
              Black colored Design
            </h1>

            {/* Ratings & Comments */}
            <div className="flex gap-6 items-center">
              <div className="flex gap-2.5 items-center">
                {[...Array(5)].map((_, i) => (
                  <IoIosStar key={i} className="w-6 h-6 text-yellow-400" />
                ))}
                <span className="text-zinc-500 text-lg font-medium">3.5</span>
              </div>
              <div className="flex items-center gap-2">
                <BiMessageDetail className="w-6 h-6 text-zinc-500" />
                <span className="text-zinc-500 text-lg font-medium">
                  120 comments
                </span>
              </div>
            </div>

            {/* Size */}
            <div className="flex flex-col gap-4">
              <span className="text-zinc-700 text-lg font-semibold">
                Select Size
              </span>
              <div className="flex gap-4">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <div
                    key={size}
                    className={`w-10 h-10 flex items-center justify-center border rounded-xl ${
                      size === "L"
                        ? "bg-neutral-700 text-white"
                        : "text-neutral-700 border-stone-300"
                    }`}
                  >
                    <span className="text-sm font-medium">{size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="flex flex-col gap-4">
              <span className="text-zinc-700 text-lg font-semibold">
                Colours Available
              </span>
              <div className="flex gap-4">
                {[
                  "bg-neutral-700 border border-zinc-700",
                  "bg-amber-300",
                  "bg-pink-400",
                  "bg-rose-800",
                ].map((color, i) => (
                  <div key={i} className={`w-5 h-5 rounded-full ${color}`} />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 items-center">
              <button className="px-10 py-3 bg-neutral-950 text-white text-lg font-semibold rounded-lg flex items-center gap-3">
                <BsCart3 className="w-6 h-6" />
                Add to cart
              </button>
              <div className="px-10 py-3 border border-neutral-950 text-neutral-950 text-lg font-semibold rounded-lg">
                Rp 120.000
              </div>
            </div>

            {/* Info Icons */}
            <div className="w-full border-t border-stone-300 pt-6 flex gap-16">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <IoCardOutline className="w-11 h-11 p-2 bg-neutral-100 text-neutral-600 rounded-full" />
                  <span className="text-neutral-700 text-lg font-medium">
                    Secure payment
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <MdOutlineLocalShipping className="w-11 h-11 p-2 bg-neutral-100 text-neutral-600 rounded-full" />
                  <span className="text-neutral-700 text-lg font-medium">
                    Free shipping
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <IoShirtOutline className="w-11 h-11 p-2 bg-neutral-100 text-neutral-600 rounded-full" />
                  <span className="text-neutral-700 text-lg font-medium">
                    Size & Fit
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <TbRepeat className="w-11 h-11 p-2 bg-neutral-100 text-neutral-600 rounded-full" />
                  <span className="text-neutral-700 text-lg font-medium">
                    Free Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Description & Video */}
        <div className="flex justify-between gap-16 items-start">
          {/* Description */}
          <div className="w-[612px] flex flex-col gap-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-7 bg-purple-600 rounded-[10px]" />
                <h2 className="text-neutral-700 text-3xl font-semibold">
                  Product Description
                </h2>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 w-fit gap-10 mb-2">
                <h3 className="text-neutral-700 text-lg font-medium cursor-pointer border-b-2">
                  Description
                </h3>
                <h3 className="text-neutral-700 text-lg font-medium cursor-pointer">
                  Review
                </h3>
              </div>
              <p className="text-zinc-500 text-base font-normal mt-2">
                100% Bio-washed Cotton – makes the fabric extra soft & silky.
                Flexible ribbed crew neck. Precisely stitched with no pilling &
                no fading. Provide all-time comfort. Anytime, anywhere. Infinite
                range of matte-finish HD prints.
              </p>
            </div>
            <div className="bg-neutral-100 p-6 rounded-xl grid grid-cols-3 gap-x-8 gap-y-6">
              {[
                { label: "Fabric", value: "Bio-washed Cotton" },
                { label: "Pattern", value: "Printed" },
                { label: "Fit", value: "Regular-fit" },
                { label: "Neck", value: "Round Neck" },
                { label: "Sleeve", value: "Half-sleeves" },
                { label: "Style", value: "Casual Wear" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-zinc-500 text-base">{label}</p>
                  <p className="text-neutral-700 text-base font-medium">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Video Preview */}
          <div className="w-[532px] h-80 relative rounded-xl overflow-hidden">
            <img
              src="https://placehold.co/532x328"
              alt="video preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-neutral-400 opacity-40" />

            {/* Icon Play di tengah */}
            <div className="absolute inset-0 flex items-center justify-center">
              <FaCirclePlay className="w-14 h-14 text-white bg-neutral-600 rounded-full" />
            </div>

            {/* Caption bawah kiri */}
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-xl font-medium">
                Raven Hoodie with black colored design
              </p>
            </div>

            {/* Durasi kanan atas */}
            <div className="absolute top-6 right-6 text-white text-lg">
              1:00 M
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
