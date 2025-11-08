import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;

      setUser(data.user);

      navigate("/home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
        <img
          className="w-1/4 mb-7"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png"
          alt="img"
        />

        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-base font-medium mb-1">What's your name</h3>
          <div className="flex justify-between items-center gap-2">
            <input
              className="w-full bg-[#eeee] border text-lg outline-none border-zinc-400 rounded px-4 py-2  placeholder:text-base"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="firstname"
              id="firstname"
              placeholder="First Name"
              required
            />
            <input
              className="w-full bg-[#eeee] border text-lg outline-none border-zinc-400 rounded px-4 py-2  placeholder:text-base"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              name="lastname"
              id="lastname"
              placeholder="Last Name"
              required
            />
          </div>

          <h3 className="text-base font-medium mt-5 mb-1">What's your email</h3>
          <input
            className="w-full bg-[#eeee] border text-lg outline-none border-zinc-400 rounded px-4 py-2  placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            placeholder="email@example.com"
            required
          />

          <h3
            className="text-base.
           font-medium mt-5 mb-1"
          >
            Enter your password
          </h3>
          <input
            className="w-full bg-[#eeee] border text-lg outline-none border-zinc-400 rounded px-4 py-2 placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Already have an Account?
            <Link
              to={"/login"}
              className="pl-1 text-center font-medium text-blue-600 "
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>

      <p className="text-[9px] leading-tight text-left">
        By proceeding, you consent to get Calls, Whatsapp, SMS, Messages ,
        including by automated means, from uber and its affiliates to the number
        provided.
      </p>
    </div>
  );
};

export default UserSignup;
