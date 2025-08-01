import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import Footer from "../components/Footer";

export default function MainLayout() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("pengecekan user di MainLayout");
    if (!loading && !user) {
      navigate("/auth/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-white">
        {/* Tempat Navbar, dibuat tetap biar nggak ikut ke scroll */}
        <div className="sticky top-0 z-50 w-full bg-white shadow">
          <Navbar />
        </div>

        <div className="flex-grow">
          <Outlet />
        </div>

        <footer className="w-full h-[5%] text-center py-4 bg-gray-100">
          <Footer />
        </footer>
      </div>
    </>
  );
}
