import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CartPublicPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Blue Flower Print Crop Top",
      size: "M",
      color: "Yellow",
      price: 29.0,
      quantity: 1,
      image: "https://placehold.co/105x120",
    },
    {
      id: 2,
      name: "Lavender Hoodie",
      size: "XXL",
      color: "Lavender",
      price: 119.0,
      quantity: 2,
      image: "https://placehold.co/105x120",
    },
    {
      id: 3,
      name: "Black Sweatshirt",
      size: "XXL",
      color: "Black",
      price: 123.0,
      quantity: 1,
      image: "https://placehold.co/105x120",
    },
  ]);

  const handleIncrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateSubtotal = (price, quantity) => price * quantity;

  const calculateGrandTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-[1445px] mx-auto flex flex-col items-center gap-8 lg:px-24 py-4">
      {/* Param */}
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center gap-1 text-sm font-medium text-zinc-500">
          <span className="cursor-pointer hover:text-black">Home</span>
          <MdNavigateNext />
          <span className="text-neutral-700">Cart</span>
        </div>
        <div className="text-sm text-zinc-500 leading-snug">
          Please fill in the fields below and click place order to complete your
          purchase!
          <br />
          <span className="font-semibold text-black">
            Already registered? Please login here
          </span>
        </div>
      </div>

      {/* Table Header (Desktop) */}
      <div className="w-full hidden md:grid grid-cols-[4fr_1fr_2fr_2fr_1fr] bg-black text-white text-base font-semibold py-4 px-6 rounded-md">
        <div>Product Details</div>
        <div className="text-center">Price</div>
        <div className="text-center">Quantity</div>
        <div className="text-center">Subtotal</div>
        <div className="text-center">Action</div>
      </div>

      {/* Cart Items */}
      <div className="w-full flex flex-col gap-4">
        {cartItems.map((item) => (
          <div key={item.id}>
            {/* Desktop */}
            <div className="hidden md:grid grid-cols-[4fr_1fr_2fr_2fr_1fr] items-center gap-y-4 w-full px-2 py-6 border-b border-stone-300">
              <div className="flex gap-4 items-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-28 object-cover rounded-xl"
                />
                <div className="flex flex-col gap-1">
                  <div className="text-base font-bold text-neutral-700">
                    {item.name}
                  </div>
                  <div className="text-sm text-zinc-500 font-medium">
                    Size: {item.size}
                  </div>
                  <div className="text-sm text-zinc-500 font-medium">
                    Color: {item.color}
                  </div>
                </div>
              </div>
              <div className="text-center text-sm font-semibold text-neutral-700">
                ${item.price.toFixed(2)}
              </div>
              <div className="flex justify-center">
                <div className="bg-neutral-100 rounded-xl px-3 py-2 flex items-center gap-3">
                  <button
                    className="text-lg font-bold"
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </button>
                  <span className="text-sm font-medium text-neutral-700">
                    {item.quantity}
                  </span>
                  <button
                    className="text-lg font-bold"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-center text-sm font-bold text-neutral-700">
                ${calculateSubtotal(item.price, item.quantity).toFixed(2)}
              </div>
              <div className="flex justify-center">
                <button
                  className="text-red-500 hover:text-red-600 transition"
                  onClick={() => handleDelete(item.id)}
                >
                  <RiDeleteBin6Line className="text-xl" />
                </button>
              </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden w-80 relative border border-indigo-50 rounded-[5px] bg-white py-3 px-4">
              <img
                className="w-16 h-16 absolute left-4 top-4 rounded-[5px]"
                src={item.image}
                alt={item.name}
              />
              <div className="ml-24 mt-2 text-black text-xs font-bold">
                {item.name}
              </div>
              <div className="ml-24 mt-1 text-gray-800 text-xs font-bold">
                {item.color}, {item.size}
              </div>
              <div className="ml-24 mt-1 text-black text-xs font-bold">
                ${item.price.toFixed(2)}
              </div>
              <div className="absolute left-[223px] top-[64px] flex gap-2">
                <button
                  className="w-8 h-6 border border-indigo-100 flex items-center justify-center text-sm"
                  onClick={() => handleDecrement(item.id)}
                >
                  -
                </button>
                <div className="w-10 h-6 bg-indigo-50 flex items-center justify-center border border-indigo-100">
                  <span className="text-blue-950 text-xs opacity-50">
                    {item.quantity}
                  </span>
                </div>
                <button
                  className="w-8 h-6 border border-indigo-100 flex items-center justify-center text-sm"
                  onClick={() => handleIncrement(item.id)}
                >
                  +
                </button>
              </div>
              <button
                className="absolute right-2 top-4 text-red-500"
                onClick={() => handleDelete(item.id)}
              >
                <RiDeleteBin6Line className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="w-full flex flex-col lg:flex-row justify-between gap-10">
        <div className="max-w-md flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-neutral-700">
            Discount Codes
          </h3>
          <p className="text-sm text-zinc-500">
            Enter your coupon code if you have one
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Coupon Code"
              className="flex-1 px-4 py-2 rounded-xl border border-stone-300 bg-white"
            />
            <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-semibold">
              Apply Coupon
            </button>
          </div>
          <button className="mt-4 px-5 py-3 rounded-lg border border-stone-300 text-sm font-semibold text-neutral-700">
            Continue Shopping
          </button>
        </div>

        <div className="bg-zinc-100 w-full max-w-md p-6 rounded-lg">
          <div className="flex justify-between text-sm font-medium text-neutral-700">
            <span>Sub Total</span>
            <span>${calculateGrandTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-neutral-700 mt-4">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <hr className="my-4 border-stone-300" />
          <div className="flex justify-between text-sm font-bold text-neutral-700">
            <span>Grand Total</span>
            <span>${(calculateGrandTotal() + 5).toFixed(2)}</span>
          </div>
          <button className="w-full mt-6 px-5 py-3 bg-black text-white rounded-lg text-sm font-semibold">
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
