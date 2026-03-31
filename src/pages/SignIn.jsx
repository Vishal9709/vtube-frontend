import React, { useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/playtube1.png";
import { showCustomAlert } from "../component/CustomAlert";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

function SignIn() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step == 1) {
      if (!email) {
        showCustomAlert("Fill all the fields");
        return;
      }
    }
    if (step == 2) {
      if (!password) {
        showCustomAlert("Fill all the fields");
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signin",
        { email, password },
        { withCredentials: true },
      );
      console.log(result.data);
      navigate("/");
      setLoading(false);
      showCustomAlert("User SignIn Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      showCustomAlert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#181818]">
      <div className="bg-[#202124] p-10 rounded-2xl w-full max-w-md shadow-lg">
        <div className="flex items-center mb-6">
          <button
            className="text-gray-300 mr-3 hover:text-white"
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              } else {
                navigate("/");
              }
            }}
          >
            <FaArrowLeft size={20} />
          </button>
          <span className="text-white text-2xl font-medium">EngineerTube</span>
        </div>

        {/* step1 */}

        {step == 1 && (
          <>
            <h1 className="flex items-center gap-2 mb-5 text-white font-normal text-2xl">
              <img src={logo} alt="" className="w-8 h-8" />
              SignIn
            </h1>
            <p className="text-gray-400 text-sm mb-6">
              with your Account to continue to PlayTube.
            </p>

            <input
              type="text"
              placeholder="Email"
              className="w-full border border-gray-500 rounded-md px-3 py-3 mb-4 text-white focus:outline-none focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <div className="flex justify-between items-center mt-10">
              <button
                className="text-orange-400 text-sm hover:underline"
                navi
                onClick={() => navigate("/signup")}
              >
                Create Account
              </button>
              <button
                className=" bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-4xl p-2"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* step2 */}

        {step == 2 && (
          <>
            <h1 className="flex items-center gap-2 mb-5 text-white font-normal text-2xl">
              <img src={logo} alt="" className="w-8 h-8" />
              Welcome
            </h1>

            <div className="flex items-center bg-[#3c4043] text-white px-3 py-2 rounded-full w-fit mb-6">
              <FaUserCircle className="mr-2" size={20} />
              {email}
            </div>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-500 rounded-md px-3 py-3 mb-4 text-white focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <div className="flex items-center gap-3 mt-3 ">
              <input
                type="checkbox"
                id="showpass"
                checked={showPassword}
                className="cursor-pointer"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label
                htmlFor="showpass"
                className="text-gray-300 cursor-pointer"
              >
                Show Password
              </label>
            </div>

            <div className="flex justify-between items-center mt-10">
              <button className="text-orange-400 text-sm hover:underline">
                forget password
              </button>
              <button className=" bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-4xl p-2" onClick={handleSignIn} disabled={loading}>
                {loading? <ClipLoader color="black" size={20}/> : "SignIn"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SignIn;
