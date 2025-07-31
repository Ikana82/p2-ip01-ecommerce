import React from "react";
import Banner from "../components/Banner";

function HomePublicPage() {
  return (
    <div>
      <Banner />
      {/* Disini tempat content halaman shop saja */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">Selamat datang!</h2>
        <p>Ini adalah halaman publik utama.</p>
      </div>
    </div>
  );
}

export default HomePublicPage;
