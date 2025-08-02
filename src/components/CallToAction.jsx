import React from "react";

export default function CallToAction() {
  return (
    <div className="flex items-center justify-center pt-15">
      <div
        className="w-full max-w-[1240px] h-[450px] relative rounded-2xl overflow-hidden mx-4 sm:mx-6 md:mx-12 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://grandlodgeofvirginia.org/wp-content/uploads/2022/01/AB_Header.jpg')`,
        }}
      >
        {/* Right Image */}
        <img
          className="w-[600px] h-full absolute right-0 top-0 object-cover hidden md:block"
          src="https://i.pinimg.com/1200x/09/f5/21/09f521c15ea287304bd1434a39ecb861.jpg"
          alt="Fashion Banner"
        />

        {/* Left Content */}
        <div className="absolute left-0 top-0 w-full md:w-[614px] h-full flex items-center px-6 sm:px-10 bg-left">
          <div className="text-white space-y-6 max-w-lg">
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight">
              WE MADE YOUR EVERYDAY FASHION BETTER!
            </h2>
            <p className="text-base sm:text-lg font-normal tracking-wide">
              As part of our mission to elevate daily style, Kanara proudly
              introduces
              <span className="block font-semibold">
                The Everyday Collection
              </span>{" "}
              — thoughtfully designed for comfort and affordability, all day,
              every day.
            </p>

            <button className="bg-white text-neutral-800 text-sm sm:text-lg font-semibold py-2 sm:py-3 px-6 sm:px-11 rounded-lg hover:bg-gray-200 transition">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
