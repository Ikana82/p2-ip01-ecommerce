import React, { useState } from "react";
import logo from "../assets/Kanara-logo.png";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="navbar bg-white px-8 text-gray-700 shadow-sm z-10">
      <div className="navbar-start flex items-center gap-4">
        {/* Hamburger Menu untuk Mobile */}
        <div className="dropdown lg:hidden">
          <button className="btn btn-ghost btn-lg hover:bg-gray-200 text-gray-600">
            ☰
          </button>
          <ul className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-white rounded-box w-40 text-sm">
            <li>
              <a className="hover:bg-black">Shop</a>
            </li>
            <li>
              <a className="hover:bg-black">Men</a>
            </li>
            <li>
              <a className="hover:bg-black">Woman</a>
            </li>
          </ul>
        </div>
        <div className="pr-2 cursor-default">
          <img src={logo} alt="Logo" className="h-12 w-auto pt-1" />
        </div>

        {/* Menu untuk layar besar */}
        <ul className="menu menu-horizontal gap-3 hidden lg:flex text-sm">
          <li>
            <a className="hover:font-bold">Shop</a>
          </li>
          <li>
            <a className="hover:font-bold">Men</a>
          </li>
          <li>
            <a className="hover:font-bold">Woman</a>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end flex items-center gap-3 ml-auto px-4">
        {/* Search */}
        <div className="dropdown dropdown-end">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="btn btn-ghost btn-circle hover:bg-gray-300 text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {showSearch && (
            <div className="dropdown-content z-[1] mt-2 w-64 p-2 bg-white rounded-box shadow">
              <input
                type="text"
                placeholder="Search products..."
                className="input input-bordered w-full"
              />
            </div>
          )}
        </div>

        {/* Notification */}
        <button className="btn btn-ghost btn-circle hover:bg-gray-300 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        {/* Cart */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle hover:bg-gray-300 text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div className="dropdown-content bg-white z-[1] mt-2 w-52 p-3 shadow rounded-box text-sm">
            <span>8 Items</span>
            <span>Subtotal: $999</span>
            <button className="btn btn-primary btn-block mt-2">
              View cart
            </button>
          </div>
        </div>

        {/* Avatar */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:bg-gray-300 text-gray-600"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul className="menu menu-sm dropdown-content bg-white z-[1] mt-2 w-52 p-2 rounded-box shadow text-sm">
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
