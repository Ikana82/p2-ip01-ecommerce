import { useState } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Firebase Error:", error);
      toast.error("Failed to login. Please check your email and password.");
      setError("Failed to login. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);
      const errorMessage =
        error.code === "auth/popup-closed-by-user"
          ? "Login process was cancelled."
          : "Failed to login with Google. Please try again.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row">
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Left Section (Image) */}
        <div
          className="hidden md:flex flex-1 items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/1200x/f2/af/d3/f2afd331134dfa6d5ae543d6394d0f32.jpg)",
          }}
        ></div>

        {/* Right Section (Login Form) */}
        <div className="flex flex-1 md:w-1/2 items-center justify-center px-6 py-2 bg-white">
          <div className="w-full max-w-md flex flex-col items-center gap-6 py-6">
            {/* Heading */}
            <div className="w-full text-center flex flex-col gap-4">
              <div className="text-2xl md:text-2xl font-semibold text-gray-900">
                Sign In
              </div>
              <p className="text-base md:text-sm text-slate-700 leading-normal tracking-tight">
                Today is a new day. It's your day. You shape it. <br />
                Sign in and start expressing your style.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleLogin}
              className="w-full flex flex-col gap-4 text-center"
            >
              {/* Email */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-sm text-gray-900">Email</label>
                <input
                  type="email"
                  value={email}
                  placeholder="Example@mail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-100 rounded-lg outline-gray-300 text-sm text-gray-900 placeholder-gray-400 placeholder:text-sm placeholder:italic"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-sm text-gray-900">Password</label>
                <div className="flex items-center w-full h-10 bg-slate-100 rounded-lg">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Type password here"
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 w-full h-10 px-3 text-gray-900 bg-slate-100 outline-none rounded-lg outline-gray-300 text-sm placeholder-gray-400 placeholder:text-sm placeholder:italic pr-10"
                  />
                  <div
                    className={`cursor-pointer transition-opacity duration-300 pr-3 ${
                      password.length > 0
                        ? "opacity-100 text-gray-700"
                        : "opacity-50 text-gray-400"
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IoMdEye size={20} />
                    ) : (
                      <IoMdEyeOff size={20} />
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white text-base py-3 rounded-xl cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner text-white"></span>
                    Please wait...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="w-full flex items-center gap-4">
              <hr className="flex-1 border-slate-300" />
              <span className="text-sm text-slate-700">Or sign in with</span>
              <hr className="flex-1 border-slate-300" />
            </div>

            <div className="w-full flex gap-4">
              <button
                onClick={handleGoogleLogin}
                className="flex-1 flex items-center justify-center gap-3 bg-black py-2 px-2 rounded-lg cursor-pointer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                  className="w-6 h-6"
                  alt="Google"
                />
                <span className="text-base text-white">
                  Continue with Google
                </span>
              </button>
            </div>

            {/* Sign Up */}
            <div className="text-center text-xs md:text-base text-slate-700">
              Don’t you have an account?{" "}
              <span
                className="text-blue-700 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Sign up
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
