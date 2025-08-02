import React from "react";
import { useNavigate } from "react-router";

export default function Promo() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/promo");
  };

  return (
    <>
      <div className="w-full max-w-[1400px] mx-auto px-14 flex flex-col lg:flex-row gap-6 pt-4">
        {/* Card Kiri */}
        <div className="w-full lg:w-1/2 h-70 rounded-xl overflow-hidden shadow-lg flex items-end justify-start relative">
          <div className="z-0 w-full h-full">
            <img
              src="https://im.uniqlo.com/global-cms/spa/reseb3c1b9f037f3a0ea0195fa4a6ad5259fr.jpg"
              alt="Promo 1"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="z-10 w-full h-full bg-black/10 p-6 flex flex-col justify-end items-start text-white space-y-2 absolute top-0 left-0">
            <div className="text-lg font-extrabold">Low Price</div>
            <div className="text-3xl font-extrabold leading-tight">
              High Coziness
            </div>
            <div className="text-base font-medium">UPTO 50% OFF</div>
            <button
              onClick={handleExploreClick}
              className="text-white text-xl font-extrabold underline"
            >
              Explore Items
            </button>
          </div>
        </div>

        {/* Card Kanan */}
        <div className="w-full lg:w-1/2 h-70 rounded-xl overflow-hidden shadow-lg flex items-end justify-start relative">
          <div className="z-0 w-full h-full">
            <img
              src="https://im.uniqlo.com/global-cms/spa/res23575db50bc7f7a8b1c4561089469b93fr.jpg"
              alt="Promo 1"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="z-10 w-full h-full bg-black/10 p-6 flex flex-col justify-end items-start text-white space-y-2 absolute top-0 left-0">
            <div className="text-lg font-extrabold">Beyoung Present</div>
            <div className="text-3xl font-extrabold leading-tight">
              Brezzy SUmmer Style
            </div>
            <div className="text-base font-medium">UPTO 50% OFF</div>
            <button
              onClick={handleExploreClick}
              className="text-white text-xl font-extrabold underline"
            >
              Explore Items
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
