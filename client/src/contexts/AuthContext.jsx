import { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export const AuthContext = createContext({
  user: null,
  role: null,
  username: null,
  setUser: () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("null");
  const [isLoadPage, setLoadPage] = useState(true);
  const value = { user, username, role, setUser };

  useEffect(() => {
    setLoadPage(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        setUser(user);
        setRole(docSnap.data().role);
        setUsername(docSnap.data().username);
      } else {
        setUser(null);
      }
      setLoadPage(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoadPage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner text-black w-12 h-12"></span>
          <p className="text-black text-lg font-normal">Authenticating...</p>
        </div>
      </div>
    );
  }

  return <AuthContext value={value}>{children}</AuthContext>;
}
