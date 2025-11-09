import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        type: vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );
      if (response.status == 200) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.log(error);
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="p-5 h-screen flex flex-col justify-between ">
      <div>
        <img
          className="w-1/5 mb-2"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
          alt="img"
        />

        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-base font-medium mb-1">What's your name</h3>
          <div className="flex justify-between items-center gap-2">
            <input
              className="w-full bg-[#eeee] border text-lg outline-none border-zinc-400 rounded px-3 py-1  placeholder:text-base"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="firstname"
              id="firstname"
              placeholder="First Name"
              required
            />
            <input
              className="w-full bg-[#eeee] border text-lg outline-none border-zinc-400 rounded px-3 py-1  placeholder:text-base"
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
            className="w-full bg-[#eeee] border text-lg outline-none border-zinc-400 rounded px-3 py-1  placeholder:text-base"
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
            className="w-full bg-[#eeee] border text-lg outline-none border-zinc-400 rounded px-3 py-1 placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            placeholder="password"
            required
          />

          <h3
            className="text-base.
           font-medium mt-5 mb-1"
          >
            Enter your vehicle details
          </h3>
          <div className="flex justify-between items-center gap-2">
            <input
              className="w-full bg-[#eeee] border text-lg outline-none border-zinc-400 rounded px-3 py-1  placeholder:text-base"
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              name="vehicleColor"
              id="vehicleColor"
              placeholder="Color"
              required
            />
            <input
              className="w-full bg-[#eeee] border text-lg outline-none border-zinc-400 rounded px-3 py-1  placeholder:text-base"
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              name="vehiclePlate"
              id="vehiclePlate"
              placeholder="Plate"
              required
            />
          </div>
          <div className="flex justify-between items-center gap-2 mt-2">
            <input
              className="w-[50%] bg-[#eeee] border text-lg outline-none border-zinc-400 rounded px-3 py-1  placeholder:text-base"
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              name="vehicleCapacity"
              id="vehicleCapacity"
              placeholder="Capacity"
              required
            />
            <select
              className="w-full bg-[#eeee] border text-lg outline-none border-zinc-400 rounded px-3 py-1  placeholder:text-base"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              name="vehicleType"
              id="vehicleType"
              required
            >
              <option value="" disabled>
                select vehicle type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          <button
            to="#"
            className="block w-full text-center cursor-pointer bg-black text-white py-2 px-3 mt-4 text-lg border-2 rounded"
            type="submit"
          >
            Create Captain Account
          </button>

          <p className="text-center text-sm mt-4 cursor-pointer">
            Already have an Account?
            <Link
              to={"/captain-login"}
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

export default CaptainSignup;
