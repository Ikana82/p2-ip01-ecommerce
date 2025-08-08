import React from "react";

const NotFound = ({ onBackToShop }) => {
  return (
    <div className="w-full flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[459px] h-[458px] relative mx-auto my-auto">
        <div className="w-96 h-72 left-[32px] top-0 absolute">
          <img
            className="w-44 h-64 left-[94px] top-0 absolute"
            src="https://i.pinimg.com/1200x/dd/b0/52/ddb052d0c6d0e89f80cdff9b0fa7e8b4.jpg"
            alt="Not Found Illustration"
          />
          <div className="w-96 h-56 left-0 top-[45px] absolute">
            <div className="left-0 top-[17px] absolute text-center justify-center">
              <span className="text-zinc-800 text-[198.16px] font-semibold ">
                4
              </span>
              <span className="text-white text-[198.16px] font-semibold">
                0
              </span>
            </div>
            <div className="left-[290.16px] top-0 absolute origin-top-left rotate-[28.16deg] text-center justify-center text-zinc-800 text-[198.16px] font-semibold font-['Core_Sans_C']">
              4
            </div>
          </div>
        </div>
        <div className="w-[459px] h-44 left-0 top-[287px] absolute">
          <div className="left-[45px] top-0 absolute justify-start text-black text-4xl font-normal">
            Oops! Product not found
          </div>
          <div className="left-[-3px] top-[43px] absolute text-center justify-start text-zinc-500 text-base font-normal ">
            The product you are looking for might have been removed or
            <br />
            temporarily unavailable.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
