import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebase";

export default function HomePublicPage() {
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
      <div>Halaman home public</div>
      {user && <button onClick={handleLogout}>Sign Out</button>}
    </>
  );
}
