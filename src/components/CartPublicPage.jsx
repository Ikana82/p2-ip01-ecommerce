import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  addToCart,
  removeFromCart,
  editCartProduct,
} from "../redux/features/cartSlice";
import { rupiahFormat } from "../utils/rupiahFormatter";

export default function CartPublicPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  const handleIncrement = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(editCartProduct({ id, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(editCartProduct({ id, quantity: item.quantity - 1 }));
    }
  };

  const handleQuantityChange = (id, value) => {
    const newQuantity = parseInt(value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      dispatch(editCartProduct({ id, quantity: newQuantity }));
    }
  };

  const handleDelete = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const calculateSubtotal = (price, quantity) => price * quantity;

  const calculateGrandTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      Swal.fire(
        "Keranjang kosong",
        "Tambahkan produk sebelum checkout.",
        "warning"
      );
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="max-w-[1445px] mx-auto flex flex-col items-center gap-8 lg:px-24 py-4">
      {/* Params */}
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center gap-1 text-sm font-medium text-zinc-500">
          <span className="cursor-pointer hover:text-black">Product</span>
          <MdNavigateNext />
          <span className="text-neutral-700">Cart</span>
        </div>
        <div className="text-sm text-zinc-500 leading-snug">
          Login successful! Make sure your shopping list is correct before
          completing the checkout process.
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
                  src={item.imgUrl}
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
                {rupiahFormat(item.price)}
              </div>
              <div className="flex justify-center">
                <div className="bg-gray-50 rounded-xl px-3 py-2 flex items-center gap-3">
                  <button
                    className="text-lg font-bold"
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    className="w-12 text-center text-sm font-medium text-neutral-700 bg-gray-50 focus:outline-none"
                  />

                  <button
                    className="text-lg font-bold"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-center text-sm font-bold text-neutral-700">
                {rupiahFormat(calculateSubtotal(item.price, item.quantity))}
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
            <div className="md:hidden w-100 relative border rounded-[5px] bg-white py-3 px-4">
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
                Rp{item.price}
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
          {/* <h3 className="text-lg font-semibold text-neutral-700">
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
          </button> */}
        </div>

        <div className="bg-zinc-100 w-full max-w-md p-6 rounded-lg">
          <div className="flex justify-between text-sm font-medium text-neutral-700">
            <span>Sub Total</span>
            <span>{rupiahFormat(calculateGrandTotal())}</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-neutral-700 mt-4">
            <span>Shipping</span>
            <span>Rp5.000</span>
          </div>
          <hr className="my-4 border-stone-300" />
          <div className="flex justify-between text-sm font-bold text-neutral-700">
            <span>Grand Total</span>
            <span>{rupiahFormat(calculateGrandTotal() + 5000)}</span>
          </div>
          <button
            onClick={handleProceedToCheckout}
            className="w-full mt-6 px-5 py-3 bg-black text-white rounded-lg text-sm font-semibold"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
