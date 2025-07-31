import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";

export default function MainLayout() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("pengecekan user di MainLayout");
    if (!user) {
      navigate("/auth/login");
    }
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Tempat Navbar, dibuat tetap biar nggak ikut ke scroll */}
        <div className="sticky top-0 z-50 w-full bg-white shadow">
          <Navbar />
        </div>

        <div className="flex-grow">
          <Outlet />
        </div>

        <footer className="w-full h-[5%] text-center py-4 bg-gray-100">
          Footer
        </footer>
      </div>
    </>
  );
}
