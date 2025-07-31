import { useState } from "react";
import { auth, googleProvider } from "../configs/firebase";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Firebase Error:", error);
      setError("Failed to login. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);
      const errorMessage =
        error.code === "auth/popup-closed-by-user"
          ? "Login process was cancelled."
          : "Failed to login with Google. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
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
