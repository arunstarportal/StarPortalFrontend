import { setUserProfileData } from "@/redux/userProfileSlice";
import { BASE_URL } from "@/Config";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const Login = ({
  isOpen,
  onClose,
  setIsLoginOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  setIsLoginOpen: (isOpen: boolean) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [is2FaEnable, setIs2FaEnable] = useState(false);
  const [faDetails, setFaDetails] = useState(null);
  const [faCode, setFaCode] = useState("");

  if (!isOpen) return null;

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, {
        emailAddress: email,
        password: password,
      });
      const data = response.data;
      if (response.status === 200) {
        console.log(data);
        if (data.is2faEnabled === false) {
          const userData = {
            token: data.token,
            eth_Address: data.ethereumWalletAddress,
            sol_Address: data.solanaWalletAddress,
            is2FaEnable: false,
          };
          localStorage.setItem("star_authTokens", JSON.stringify(userData));
          await dispatch(setUserProfileData(data));
          setIsLoginOpen(false);
        } else {
          setFaDetails(data);
          setIs2FaEnable(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handle2FA = async () => {
    if (!faCode) return;
    try {
      const response = await axios.post(`${BASE_URL}/user/verifyOtp`, {
        token: faDetails.tempToken,
        otp: faCode,
      });
      const data = response.data;
      console.log(data);
      if (response.status === 200) {
        localStorage.setItem("star_authToken", data.token);
        await dispatch(setUserProfileData(data));
        setIsLoginOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute inset-0 w-screen h-screen bg-black/70 z-50 flex items-center justify-center">
      {/* Modal Container */}
      <div className="bg-[#171717] w-[90%] max-w-md rounded-lg p-8 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <img
              src="/svgs/user.svg" // Replace with a user icon path
              alt="User Icon"
              className="w-8 h-8 text-gray-400"
            />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Good to See You Again!
          </h2>
          <p className="text-gray-400 text-sm">
            First time here?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </p>
        </div>

        {/* Input Fields */}
        {is2FaEnable === true ? (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter Code"
              value={faCode}
              onChange={(e) => setFaCode(e.target.value)}
              className="w-full px-4 py-3 bg-[#1f1f1f] text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button
              onClick={handle2FA}
              className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Authorize
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#1f1f1f] text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#1f1f1f] text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Log in
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="px-4 text-gray-400 text-sm">or sign up with</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1f1f1f] border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-all">
            <img src="/svgs/google.svg" alt="Google" className="w-5 h-5" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1f1f1f] border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-all">
            <img src="/svgs/metamask.svg" alt="Metamask" className="w-5 h-5" />
            Metamask
          </button>
        </div>
      </div>
    </div>
  );
};
