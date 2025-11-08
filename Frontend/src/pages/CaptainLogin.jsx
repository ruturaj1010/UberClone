import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({ email: email, password: password });
    // console.log(captainData);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-1/4 mb-2"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
          alt="img"
        />

        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-1">What's your email</h3>
          <input
            className="w-full bg-[#eeee] border text-lg outline-none border-zinc-400 rounded px-4 py-2  placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            id="email"
            placeholder="email@example.com"
            required
          />

          <h3 className="text-lg font-medium mt-5 mb-1">Enter your password</h3>
          <input
            className="w-full bg-[#eeee] border text-lg outline-none border-zinc-400 rounded px-4 py-2 placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            id="password"
            placeholder="password"
            required
          />

          <button
            to="#"
            className="block w-full text-center cursor-pointer bg-black text-white py-2 px-3 mt-4 text-lg border-2 rounded"
            type="submit"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4 cursor-pointer">
            Join a fleet?
            <Link
              to={"/captain-signup"}
              className="pl-1 text-center font-medium text-blue-600 "
            >
              Register as Captain
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to="/login"
          className="block w-full text-center bg-[#f2bf19ee] text-white py-2 px-3 mt-4 text-lg border-2 rounded"
          type="submit"
        >
          SignIn as a User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
