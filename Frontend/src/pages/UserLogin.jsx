import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
    setUserData({ email: email, password: password });
    console.log(userData);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen">
      <img
        className="w-1/4 mb-7"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png"
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
          New here?
          <Link
            to={"/signup"}
            className="text-center font-medium text-blue-600 "
          >
            Create a new account
          </Link>
        </p>
      </form>

      <div>
        <Link
          to="/captain-login"
          className="block w-full text-center bg-[#f2c42dee] text-white py-2 px-3 mt-4 text-lg border-2 rounded"
          type="submit"
        >
          SignIn as a Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
