import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router";
import Banner from "../components/Banner";
import BannerCard from "../components/BannerCard";
import Promo from "../components/Promo";
import NewArrival from "../components/NewArrival";
import HeroBanner from "../components/HerroBanner";
import CategoryWoman from "../components/CategoryWoman";
import CategoryMen from "../components/CategoryMen";

function HomePublicPage() {
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
    <div>
      <Banner />
      <br />
      <Promo />
      <br />
      <NewArrival />
      <br />
      <HeroBanner />
      <br />
      <CategoryMen />
      <br />
      <CategoryWoman />

      {/* Disini tempat content halaman shop saja */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">Selamat datang!</h2>
        <p>Ini adalah halaman publik utama.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default HomePublicPage;
