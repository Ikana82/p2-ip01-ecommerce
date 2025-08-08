import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/Kanara-logo.png";
import { auth } from "../firebase/firebase";
import { deleteCart } from "../redux/features/cartSlice";
import { CgProfile } from "react-icons/cg";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const cartItems = useSelector((state) => state.cart);

  const totalProduk = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  const subtotal = cartItems
    .map((item) => (Number(item.price) || 0) * (Number(item.quantity) || 0))
    .reduce((a, b) => a + b, 0);

  const handleViewCart = () => {
    if (user) {
      navigate("/cart");
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please Log In!",
        text: "You must be logged in to view your shopping cart.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
    }
  };

  async function handleLogout() {
    try {
      await signOut(auth);
      dispatch(deleteCart());
      Swal.fire({
        icon: "success",
        title: "Logged Out!",
        text: "You have been logged out successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed!",
        text: "There was an error during logout. Please try again.",
      });
    }
  }

  return (
    <>
      <div className="navbar bg-white px-4 md:px-8 lg:px-12 text-gray-700 shadow-sm z-10">
        <div className="navbar-start flex items-center gap-2">
          {/* Hamburger Menu untuk Mobile */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-lg hover:bg-gray-200 text-gray-600"
            >
              ☰
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-white rounded-box w-40 text-sm z-[5]"
            >
              <li>
                <span onClick={() => navigate("/products")}>Product</span>
              </li>
              <li>
                <span onClick={() => navigate("/men")}>Men</span>
              </li>
              <li>
                <span onClick={() => navigate("/woman")}>Women</span>
              </li>
            </ul>
          </div>

          <div className="pr-2 cursor-pointer">
            <img
              src={logo}
              onClick={() => navigate("/")}
              alt="Logo"
              className="h-12 w-auto pt-1"
            />
          </div>

          {/* Menu untuk Desktop */}
          <ul className="menu menu-horizontal gap-3 hidden lg:flex text-base lg:text-lg">
            <li>
              <span
                onClick={() => navigate("/products")}
                className={`cursor-pointer hover:font-bold ${
                  isActive("/products") ? "font-bold text-black" : ""
                }`}
              >
                Product
              </span>
            </li>
            <li>
              <span
                onClick={() => navigate("/men")}
                className={`cursor-pointer hover:font-bold ${
                  isActive("/men") ? "font-bold text-black" : ""
                }`}
              >
                Men
              </span>
            </li>
            <li>
              <span
                onClick={() => navigate("/woman")}
                className={`cursor-pointer hover:font-bold ${
                  isActive("/woman") ? "font-bold text-black" : ""
                }`}
              >
                Women
              </span>
            </li>
          </ul>
        </div>

        {/* Right side of navbar */}
        <div className="navbar-end flex items-center gap-3 sm:gap-2 md:gap-4 ml-auto px-2 sm:px-4">
          {/* Cart Dropdown */}
          <div className="dropdown dropdown-end pr-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              onClick={handleViewCart}
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                <span className="badge badge-sm indicator-item bg-red-600 text-white">
                  {Number(totalProduk)}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[5] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">{totalProduk} Items</span>
                <span className="text-info">
                  Subtotal: Rp{subtotal.toLocaleString("id-ID")}
                </span>
                <div className="card-actions">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={handleViewCart}
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src="https://i.pinimg.com/736x/cc/02/8d/cc028d99425473e1b6517493a8ed1e5a.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-md dropdown-content bg-base-100 rounded-box z-[5] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <span className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </span>
                </li>
                <li>
                  <span>Settings</span>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="btn btn-ghost rounded-full text-zinc-700 hover:bg-gray-200 gap-1.5"
            >
              <CgProfile className="text-2xl" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
