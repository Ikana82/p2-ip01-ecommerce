import React from "react";
import { useNavigate } from "react-router";

export default function CardPromo() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/promo");
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-14 flex flex-col lg:flex-row gap-6 pt-15">
      {/* Card Kiri */}
      <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-lg relative">
        <img
          src="https://im.uniqlo.com/global-cms/spa/reseb3c1b9f037f3a0ea0195fa4a6ad5259fr.jpg"
          alt="Promo 1"
          className="w-full h-full object-cover"
        />
        <div className="z-10 w-full h-full bg-black/10 p-6 flex flex-col justify-end items-start text-white space-y-2 absolute top-0 left-0">
          <p className="text-lg font-bold">Low Price</p>
          <h3 className="text-3xl font-extrabold leading-tight">
            High Coziness
          </h3>
          <p className="text-base font-medium">UP TO 50% OFF</p>
          <button
            onClick={handleExploreClick}
            className="text-white text-xl font-extrabold underline"
          >
            Explore Items
          </button>
        </div>
      </div>

      {/* Card Kanan */}
      <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-lg relative">
        <img
          src="https://im.uniqlo.com/global-cms/spa/res23575db50bc7f7a8b1c4561089469b93fr.jpg"
          alt="Promo 2"
          className="w-full h-full object-cover"
        />
        <div className="z-10 w-full h-full bg-black/10 p-6 flex flex-col justify-end items-start text-white space-y-2 absolute top-0 left-0">
          <p className="text-lg font-bold">Beyoung Present</p>
          <h3 className="text-3xl font-extrabold leading-tight">
            Brezzy Summer Style
          </h3>
          <p className="text-base font-medium">UP TO 50% OFF</p>
          <button
            onClick={handleExploreClick}
            className="text-white text-xl font-extrabold underline"
          >
            Explore Items
          </button>
        </div>
      </div>
    </div>
  );
}
