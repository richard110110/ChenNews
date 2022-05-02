import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import Spinner from "../components/Spinner";
import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

function LandingPage() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const login = async () => {
    setLoading(true);
    try {
      const payload = {
        email,
        password,
      };
     const result = await axios.post("/api/users/login", payload);
     console.log(result.data)
      toast("login successfully", "success");
      localStorage.setItem("ChenNew-user", JSON.stringify(result.data))
      navigate('/home')
      setLoading(false);
    } catch (error) {
      toast("something went wrong");
      setLoading(false);
    }
  };

  const register = async () => {
    setLoading(true);
    try {
      const payload = {
        email,
        password,
        name,
      };
      await axios.post("/api/users/register", payload);
      toast("register successfully", "success");
      setEmail("");
      setName("");
      setPassword("");
      setLoading(false);
      setShowRegisterForm(false);
      setShowLoginForm(true);
    } catch (error) {
      toast("something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    if(localStorage.getItem("ChenNew-user"))
    navigate('/home')
  },[])

  return (
    <div className="h-screen flex items-center sm:flex-col">
      {loading && <Spinner />}
      <div className={`w-1/2 px-10 space-y-5 sm:w-screen ${(showLoginForm || showRegisterForm) && 'sm:hidden'}`}>
        <h1>
          <b className="text-[#2B8F74] text-9xl">Chen</b>
          <b className="text-9xl text-gray-700">NEWS</b>
        </h1>
        <p className="text-lg">
          Chen news provides the service of news, authentication, covid19,
          attraction, places and public news
        </p>
        <div className="space-x-5">
          <button
            className="bg-gray-400 px-10 py-3"
            onClick={() => {
              setShowLoginForm(true);
              setShowRegisterForm(false);
            }}
          >
            LOGIN
          </button>
          <button
            className="bg-[#2B8F74] px-10 py-3 text-white"
            onClick={() => {
              setShowRegisterForm(true);
              setShowLoginForm(false);
            }}
          >
            REGISTER
          </button>
        </div>
      </div>

      <div className="w-1/2 sm:w-screen">
        {!showLoginForm && !showRegisterForm && (
          <lottie-player
            src="https://assets8.lottiefiles.com/packages/lf20_qmfs6c3i.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        )}

        {showLoginForm && (
          <div className="ml-40 sm:ml-0">
            <div className="flex flex-col bg-primary h-screen justify-center items-center px-20 space-y-5">
              <h1 className="text-6xl text-gray-500 text-left w-full font-semibold my-5">
                Login
              </h1>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="border-2 h-10 w-full border-gray-300 px-5 bg-transparent text-gray-200"
                placeholder="email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border-2 h-10 w-full border-gray-300 px-5 bg-transparent text-gray-200"
                placeholder="password"
              />
              <div className="flex justify-end w-full">
                <button
                  className="bg-gray-400 px-10 py-3 text-black"
                  onClick={login}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
        {showRegisterForm && (
          <div className="ml-40 sm:ml-0">
            <div className="flex flex-col bg-primary h-screen justify-center items-center px-20 space-y-5">
              <h1 className="text-6xl text-gray-500 text-left w-full font-semibold my-5">
                Registration
              </h1>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="border-2 h-10 w-full border-gray-300 px-5 bg-transparent text-gray-200"
                placeholder="name"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="border-2 h-10 w-full border-gray-300 px-5 bg-transparent text-gray-200"
                placeholder="email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border-2 h-10 w-full border-gray-300 px-5 bg-transparent text-gray-200"
                placeholder="password"
              />
              <div className="flex justify-end w-full">
                <button
                  className="bg-gray-400 px-10 py-3 text-black"
                  onClick={register}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {(showLoginForm || showRegisterForm) && (
        <AiOutlineClose
          className="absolute top-5 right-5 z-10 cursor-pointer hover:bg-gray-100 hover:rounded-full hover:text-gray-50"
          size={30}
          color="gray"
          onClick={() => {
            setShowLoginForm(false);
            setShowRegisterForm(false);
          }}
        />
      )}
    </div>
  );
}

export default LandingPage;
