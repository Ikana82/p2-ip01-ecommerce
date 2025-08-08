import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function PublicLayout() {
  const { user } = useContext(AuthContext);

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-wrap content-start">
      <div className="w-full h-[5%]">
        <Navbar />
      </div>
      <div className="grow h-3/4">
        <Outlet />
      </div>
      <div className="w-full h-[5%] pt-5">
        <Footer />
      </div>
    </div>
  );
}

export default PublicLayout;
