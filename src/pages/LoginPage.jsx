import { useState } from "react";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";

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
  return (
    <>
      <div className="min-h-screen flex">
        {/* Left */}
        <div className="hidden md:flex w-1/2 bg-amber-200 items-center justify-center">
          <p className="text-3xl font-bold text-white">Selamat Datang!</p>
        </div>

        {/* Right */}
        <div className="flex w-full md:w-1/2 bg-amber-500 items-center justify-center px-6 py-12">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
