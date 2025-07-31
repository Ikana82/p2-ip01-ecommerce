import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function MainLayout() {
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
