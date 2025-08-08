import React, { useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Swal from "sweetalert2";
import { MdNavigateNext } from "react-icons/md";

export default function CheckOutPage() {
  const cartItems = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    saveInfo: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  const total = subtotal;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.address || !formData.phone) {
      Swal.fire("Error", "Please fill in all required fields.", "error");
      return;
    }

    try {
      await addDoc(collection(db, "addresses"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      Swal.fire(
        "Success",
        "Billing information saved successfully!",
        "success"
      );
    } catch (error) {
      console.error("Error saving billing information: ", error);
      Swal.fire("Error", "Failed to save billing information.", "error");
    }
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto p-4 md:p-8">
      <div className="flex items-center gap-2 text-lg font-medium text-zinc-500 mb-8">
        <Link to="/">Home</Link>
        <MdNavigateNext className="w-5 h-5 text-gray-500" />
        <span>Check Out</span>
      </div>

      <div className="flex flex-col gap-11 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="mb-5 flex items-center gap-3">
            <div className="w-1.5 h-7 bg-purple-600 rounded-[10px]" />
            <h2 className="text-3xl font-semibold">Check Out</h2>
          </div>
          <h3 className="text-xl font-semibold mb-6">Billing Details</h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-base font-semibold">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-neutral-100 rounded-lg text-sm text-zinc-500 focus:outline-none"
                  placeholder="First Name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-base font-semibold">Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-neutral-100 rounded-lg text-sm text-zinc-500 focus:outline-none"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-base font-semibold">
                  Country / Region*
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-neutral-100 rounded-lg text-sm text-zinc-500 focus:outline-none"
                  placeholder="Country / Region"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-base font-semibold">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-neutral-100 rounded-lg text-sm text-zinc-500 focus:outline-none"
                  placeholder="Company (optional)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-base font-semibold">
                  Street Address*
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-neutral-100 rounded-lg text-sm text-zinc-500 focus:outline-none"
                  placeholder="House number and street name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-base font-semibold">
                  Apt, suite, unit
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-neutral-100 rounded-lg text-sm text-zinc-500 focus:outline-none"
                  placeholder="apartment, suite, unit, etc. (optional)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <input
                className="input"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
              />
              <input
                className="input"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
              />
              <input
                className="input"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-base font-semibold">Phone*</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-5 py-4 bg-neutral-100 rounded-lg text-sm text-zinc-500 focus:outline-none"
                placeholder="Phone"
              />
            </div>

            <div className="w-full">
              <button
                type="submit"
                className="w-full px-5 py-4 bg-black rounded-lg text-white text-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Continue to delivery
              </button>
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded-sm border-2 border-stone-300"
                />
                <span className="text-lg font-normal">
                  Save my information for a faster checkout
                </span>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6">
          <h4 className="text-2xl font-semibold mb-6">Order Summary</h4>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold">
                    {item.name} x {item.quantity}
                  </p>
                  <p className="text-sm font-medium text-zinc-500">
                    Color: {item.color}
                  </p>
                </div>
                <span className="text-sm font-bold text-zinc-500">
                  Rp{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Subtotal ({totalItems} items)</span>
              <span>Rp{subtotal.toFixed(2)}</span>
            </div>
            <div className="w-full border-t border-gray-100 my-4" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>Rp{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
