import React from "react";

export default function HeroBanner() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div
          className="w-full max-w-[1240px] h-[450px] justify-center relative rounded-2xl overflow-hidden mx-12 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.pinimg.com/1200x/09/f5/21/09f521c15ea287304bd1434a39ecb861.jpg')`,
          }}
        >
          {/* Right */}
          <img
            className="w-[626px] h-full absolute right-0 top-0 object-cover"
            src="https://i.pinimg.com/1200x/09/f5/21/09f521c15ea287304bd1434a39ecb861.jpg"
            alt="Fashion Banner"
          />

          {/* Left */}
          <div
            className="absolute left-0 top-0 w-[614px] h-full bg-black/70 flex items-center px-10 bg-cover bg-left"
            style={{
              backgroundImage: `url('https://grandlodgeofvirginia.org/wp-content/uploads/2022/01/AB_Header.jpg')`,
            }}
          >
            <div className="text-white space-y-6">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
                WE MADE YOUR EVERYDAY FASHION BETTER!
              </h1>
              <p className="text-xl font-normal tracking-wide max-w-md">
                In our journey to improve everyday fashion, euphoria presents
                EVERYDAY wear range - Comfortable & Affordable fashion 24/7
              </p>
              <button className="bg-white text-neutral-700 text-lg font-semibold py-3 px-11 rounded-lg hover:bg-gray-200 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
