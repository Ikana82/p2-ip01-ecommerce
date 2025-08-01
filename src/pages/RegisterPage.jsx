import { useState } from "react";
import { useNavigate } from "react-router";
import { auth, db, googleProvider } from "../configs/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password tidak cocok");
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        createdAt: new Date(),
      });

      toast.success("Registrasi berhasil!");
      navigate("/");
    } catch (error) {
      console.error("Firebase Error:", error);
      toast.error("Gagal registrasi: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: user.displayName || "Anonymous",
        createdAt: new Date(),
      });

      toast.success("Registrasi dengan Google berhasil!");
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google Sign Up gagal: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Left Section (Image) */}
      <div
        className="hidden md:flex flex-1 items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/1200x/f2/af/d3/f2afd331134dfa6d5ae543d6394d0f32.jpg)",
        }}
      ></div>

      {/* Right Section (Form) */}
      <div className="flex flex-1 md:w-1/2 items-center justify-center px-6 py-2 bg-black">
        <div className="w-full max-w-md flex flex-col items-center gap-6 py-6">
          {/* Heading */}
          <div className="w-full text-center flex flex-col gap-4">
            <div className="text-2xl font-semibold text-white">Sign Up</div>
            <p className="text-sm text-gray-300">
              Today is a new day. It's your day. You shape it.
              <br />
              Sign up and start expressing your style.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleRegister}
            className="w-full flex flex-col gap-4 text-center"
          >
            {/* Username */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-white">Username</label>
              <input
                type="text"
                value={username}
                placeholder="Your username"
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full h-10 px-3 bg-gray-800 text-white rounded-lg outline-none placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-white">Email</label>
              <input
                type="email"
                value={email}
                placeholder="Example@mail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 px-3 bg-gray-800 text-white rounded-lg outline-none placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-white">Password</label>
              <div className="flex items-center w-full h-10 bg-gray-800 rounded-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex-1 w-full h-10 px-3 bg-gray-800 text-white outline-none rounded-lg placeholder-gray-400 pr-10"
                />
                <div
                  className="cursor-pointer pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoMdEye size={20} />
                  ) : (
                    <IoMdEyeOff size={20} />
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 ml-0.5">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </p>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-white">Confirm Password</label>
              <div className="flex items-center w-full h-10 bg-gray-800 rounded-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  placeholder="Retype password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="flex-1 w-full h-10 px-3 bg-gray-800 text-white outline-none rounded-lg placeholder-gray-400 pr-10"
                />
                <div
                  className="cursor-pointer pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoMdEye size={20} />
                  ) : (
                    <IoMdEyeOff size={20} />
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 ml-0.5">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black text-base py-2 rounded-xl cursor-pointer font-semibold hover:opacity-90 transition"
            >
              {isLoading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          <div className="w-full flex items-center gap-4 text-gray-300">
            <hr className="flex-1 border-gray-600" />
            <span className="text-sm">Or sign up with</span>
            <hr className="flex-1 border-gray-600" />
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-2 px-2 rounded-lg"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-base">Continue with Google</span>
          </button>

          <div className="text-center text-sm text-gray-300">
            Sudah punya akun?{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => navigate("/auth/login")}
            >
              Sign In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
