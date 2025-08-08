import React from "react";
import Navbar from "../components/Navbar";
import BannerSlide from "../components/BannerSlide";
import NewArrival from "../components/NewArrival";
import CategoryMen from "../components/CategoryMen";
import CategoryWoman from "../components/CategoryWoman";
import CallToAction from "../components/CallToAction";
import Promo from "../components/Promo";

function HomePublicPage() {
  return (
    <>
      <BannerSlide />
      <Promo />
      <CategoryMen />
      <CategoryWoman />
      <CallToAction />
      {/* <NewArrival /> */}
    </>
  );
}

export default HomePublicPage;
