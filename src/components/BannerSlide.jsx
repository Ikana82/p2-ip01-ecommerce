import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const banners = [
  {
    imageUrl:
      "https://im.uniqlo.com/global-cms/spa/res284104c9ad18078c25510419f75247a3fr.jpg",
    title: "Denim Jersey Tapered Pants",
    headline: "Summer Value Pack",
    subtitle:
      "Practical & versatile jeans, perfect for your modest casual look.",
  },
  {
    imageUrl:
      "https://im.uniqlo.com/global-cms/spa/res70c9031a219ac02e3645995b83a6bf17fr.jpg",
    title: "Dry Pique Striped Polo Shirt",
    headline: "New Arrival 2025",
    subtitle: "Light & smooth classic polo, goes well with any styling.",
  },
  {
    videoUrl:
      "https://image.uniqlo.com/UQ/CMS/video/jp/2025/HOME/GL_Aseets/LWC/women_lwc_home_pc.mp4",
    title: "Jackets & Outerwear",
    headline: "2025 Fall/Winter LifeWear COLLECTION",
    subtitle: "warm / modern / sleek",
  },
];

export default function BannerSlide() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const activeBanner = banners[currentIndex];

  return (
    <div className="relative w-full h-[480px] md:h-[560px] overflow-hidden">
      {/* Image dan Video */}
      <div className="absolute inset-0 z-0">
        {activeBanner.videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src={activeBanner.videoUrl}
          />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${activeBanner.imageUrl})` }}
          />
        )}
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end md:justify-between px-6 md:px-24 pt-60 text-white bg-black/10">
        <div className="space-y-2 md:max-w-2xl">
          <h3 className="text-lg md:text-xl font-semibold drop-shadow-lg">
            {activeBanner.title}
          </h3>
          <h1
            className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-xl"
            style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.4)" }}
          >
            {activeBanner.headline}
          </h1>
          <p className="text-base md:text-xl font-medium drop-shadow">
            {activeBanner.subtitle}
          </p>
        </div>

        {/* Dot Slide */}
        <div className="flex justify-center md:justify-center gap-2 pt-6 py-4">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 md:h-1 w-8 rounded-full transition-opacity ${
                index === currentIndex
                  ? "bg-white opacity-100"
                  : "bg-white/50 opacity-50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white text-2xl"
        >
          <GrFormPrevious />
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white text-2xl"
        >
          <GrFormNext />
        </button>
      </div>
    </div>
  );
}
