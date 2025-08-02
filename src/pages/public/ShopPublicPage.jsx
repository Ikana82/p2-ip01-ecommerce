import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebase";
import BannerSlide from "../../components/BannerSlide";
import CardPromo from "../../components/CardPromo";
import NewArrival from "../../components/NewArrival";
import CallToAction from "../../components/CallToAction";
import CategoryMen from "../../components/CategoryMen";
import CategoryWoman from "../../components/CategoryWoman";
import TheLimelight from "../../components/TheLimelight";

export default function ShopPublicPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <BannerSlide />
      <CardPromo />
      <NewArrival />
      <CallToAction />
      <CategoryMen />
      <CategoryWoman />
      <TheLimelight />
      <div>Halaman Shop</div>
      {user && <button onClick={handleLogout}>Sign Out</button>}
    </>
  );
}
