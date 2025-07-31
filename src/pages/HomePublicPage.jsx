import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import Banner from "../components/Banner";

function HomePublicPage() {
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
