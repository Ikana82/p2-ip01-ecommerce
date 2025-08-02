import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import NavbarHome from "../components/NavbarHome";
import Footer from "../components/Footer";
import BannerSlide from "../components/BannerSlide";
import CardPromo from "../components/CardPromo";
import NewArrival from "../components/NewArrival";
import CallToAction from "../components/CallToAction";
import CategoryMen from "../components/CategoryMen";
import CategoryWoman from "../components/CategoryWoman";
import TheLimelight from "../components/TheLimelight";

export default function PublicLayout() {
  //   const [isLoadPage, setLoadPage] = useState(true);
  //   const navigate = useNavigate();
  //   const { user } = useContext(AuthContext);
  //   useEffect(() => {
  //     if (!user) {
  //       navigate("/auth/login");
  //     } else if (user) {
  //       navigate("/");
  //     }
  //     setLoadPage(false);
  //   }, []);

  //   if (isLoadPage) {
  //     return (
  //       <div>
  //         <span className="loading loading-spinner text-secondary"></span>
  //       </div>
  //     );
  //   }
  return (
    <>
      <NavbarHome />
      {/* <BannerSlide />
      <CardPromo />
      <NewArrival />
      <CallToAction />
      <CategoryMen />
      <CategoryWoman />
      <TheLimelight /> */}
      <header>-- Public Side --</header>
      <Outlet />
      <Footer />
    </>
  );
}
