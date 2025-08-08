import React, { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/Kanara-logo.png";
import { auth } from "../firebase/firebase";
import { deleteCart } from "../redux/features/cartSlice";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
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
      navigate("/");
    } catch (error) {
      console.log(error);
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
                <Link to="/products" className="hover:bg-black">
                  Product
                </Link>
              </li>
              <li>
                <Link to="/men" className="hover:bg-black">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/woman" className="hover:bg-black">
                  Women
                </Link>
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
              <Link
                to="/products"
                className={`hover:font-bold ${
                  isActive("/products") ? "font-bold text-black " : ""
                }`}
              >
                Product
              </Link>
            </li>
            <li>
              <Link
                to="/men"
                className={`hover:font-bold ${
                  isActive("/men") ? "font-bold text-black " : ""
                }`}
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                to="/woman"
                className={`hover:font-bold ${
                  isActive("/woman") ? "font-bold text-black" : ""
                }`}
              >
                Women
              </Link>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end flex items-center gap-3 sm:gap-2 md:gap-4 ml-auto px-2 sm:px-4">
          {/* Notification */}
          <button className="btn btn-ghost btn-circle hover:bg-gray-300 text-gray-600">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          {/* Cart */}
          <div className="dropdown dropdown-end pr-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
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
                  Subtotal: Rp{subtotal.toFixed(2)}
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

          {/* Avatar */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-[5] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
