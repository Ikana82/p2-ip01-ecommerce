import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import LogoKanara from "../assets/logo-kanara.png";

import {
  IoIosAddCircle,
  IoIosCard,
  IoIosHome,
  IoMdPerson,
} from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    try {
      await signOut(auth);
      console.log("Logout Success");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  }

  const isActive = (path) => {
    return location.pathname === path;
  };

  const iconSize = "text-xl";

  const menuSections = [
    {
      label: "Main Menu",
      items: [
        {
          label: "Dashboard",
          path: "#",
          icon: IoIosHome,
        },
        {
          label: "Categories",
          path: "/list-category",
          icon: TbCategoryFilled,
        },
        {
          label: "Transaction",
          path: "#",
          icon: IoIosCard,
        },
      ],
    },
    {
      label: "Products",
      items: [
        {
          label: "Product List",
          path: "/",
          icon: FaBoxOpen,
        },
        {
          label: "Add Products",
          path: "/add",
          icon: IoIosAddCircle,
        },
      ],
    },
    {
      label: "Admin",
      items: [
        {
          label: "Admin Role",
          path: "#",
          icon: IoMdPerson,
        },
      ],
    },
  ];

  return (
    <div className="h-full w-56 bg-white border-r border-gray-100 flex flex-col">
      <div className="p-5 flex items-center gap-3">
        <img
          className="w-40 h-14 object-contain"
          src={LogoKanara}
          alt="Kanara Logo"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4 last:mb-0">
            {section.label && (
              <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wider px-3.5 py-2 mb-1">
                {section.label}
              </p>
            )}
            <nav className="flex flex-col gap-1">
              {" "}
              {section.items.map((item) => {
                const IconComponent = item.icon;
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`
                      relative flex items-center gap-3 py-2.5 px-3.5 rounded-md text-left
                      transition-colors duration-200 group // Added group for hover effects on children
                      ${active ? "bg-red-600" : "hover:bg-gray-100"}
                    `}
                    aria-current={active ? "page" : undefined}
                  >
                    <IconComponent
                      className={`${iconSize} ${
                        active
                          ? "text-white"
                          : "text-neutral-500 group-hover:text-neutral-700"
                      }`}
                    />
                    <span
                      className={`
                        flex-1 whitespace-nowrap text-sm
                        ${
                          active
                            ? "text-white font-semibold"
                            : "text-neutral-700 font-normal group-hover:text-neutral-800"
                        }
                      `}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="pb-5 pt-3 px-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className={`
            w-full px-3.5 py-3
            bg-white rounded-md shadow-sm flex items-center gap-3
            hover:bg-gray-100 transition-colors duration-200
          `}
        >
          <FiLogOut className={`${iconSize} text-teal-950`} />
          <span
            className={`
              flex-1 text-teal-950 text-base font-medium whitespace-nowrap
            `}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
