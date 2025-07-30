import { useState } from "react";
import { auth, googleProvider } from "../configs/firebase";
import { useNavigate } from "react-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const userLoggedIn = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userLoggedIn);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGoogleLogin() {
    try {
      const oauthlogin = await signInWithPopup(auth, googleProvider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(oauthlogin);
      const token = credential.accessToken;
      const user = oauthlogin.user;
      console.log(credential, "<<<< credential");
      console.log(token, "<<<< token");
      console.log(user, "<<<<user");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="min-h-screen flex">
        {/* Left */}
        <div className="hidden md:flex w-1/2 bg-amber-200 items-center justify-center">
          <p className="text-3xl font-bold text-white">Selamat Datang!</p>
        </div>

        {/* Right */}
        <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-12">
          <div className="w-full max-w-md bg-white p-8 rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Login Page</h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
              >
                Login
              </button>
              <div className="w-full flex gap-4">
                <button
                  onClick={handleGoogleLogin}
                  className="flex-1 flex items-center justify-center gap-3 bg-slate-100 py-2 px-2 rounded-lg cursor-pointer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                    className="w-6 h-6"
                    alt="Google"
                  />
                  <span className="text-base text-slate-700">
                    Continue with Google
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
