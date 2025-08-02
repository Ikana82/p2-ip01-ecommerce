import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  const { user, role, username } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(role, username, "pengecekan user di MainLayout");
    if (!user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen">
      <div className="fixed top-0 left-0 h-full w-50 bg-white shadow-md border-r border-stone-300 z-50">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 ml-56">
        <div className="fixed top-0 left-56 right-0 h-20 bg-white shadow-md border-b border-stone-300 z-40">
          <Navbar />
        </div>

        <div className="flex-1 mt-16 bg-stone-50 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
