import { useState } from "react";
import { auth, googleProvider } from "../configs/firebase";
import { useNavigate } from "react-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { IoEye, IoEyeOff } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    setIsLoading(true);

    // console.log(email, password);
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
      toast.error("Whoops! That combo doesn’t work. Try again.");
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden px-6 py-6">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Fashion"
          className="w-full h-full object-cover rounded-[20px]"
        />
      </div>

      <div className="w-full md:w-1/2 md:px-16 py-6 flex flex-col justify-center items-center gap-6">
        <div className="w-full flex flex-col gap-4 text-center">
          <div className="text-2xl md:text-4xl font-semibold text-gray-900">
            Sign In
          </div>
          <p className="text-base md:text-lg text-slate-700 leading-normal tracking-tight">
            Today is a new day. It's your day. You shape it. <br />
            Sign in and start expressing your style.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          action=""
          className="w-full flex flex-col gap-4 text-center"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-900">Email</label>
            <input
              type="email"
              value={email}
              placeholder="example@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 bg-slate-100 rounded-lg outline-gray-300 text-sm text-gray-900 placeholder-gray-400 placeholder:text-sm placeholder:italic"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-900">Password</label>
            <div className="flex items-center w-full h-10 bg-slate-100 rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Type password here"
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 w-full h-10 px-3 bg-slate-100 outline-none rounded-lg outline-gray-300 text-sm placeholder-gray-400 placeholder:text-sm placeholder:italic pr-10"
              />
              <div
                className={`cursor-pointer transition-opacity duration-300 pr-3 ${
                  password.length > 0
                    ? "opacity-100 text-gray-700"
                    : "opacity-50 text-gray-400"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ff0000] text-white text-base py-3 rounded-xl cursor-pointer"
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

        <div className="text-center text-sm md:text-base text-slate-700">
          Don’t you have an account?{" "}
          <span
            className="text-blue-700 cursor-pointer"
            onClick={() => navigate("/auth/register")}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}
