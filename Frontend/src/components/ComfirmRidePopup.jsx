import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ComfirmRidePopup = ({ ride, setConfirmRidePanel,setRidePopupPanel }) => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride/`, {
        params: {
          rideId: ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status == 200) {
      setConfirmRidePanel(false);
      setRidePopupPanel(false);
      navigate("/captain-riding", {state : {ride : ride}});
    }
  };

  return (
    <div className="w-screen overflow-x-hidden mb-4">
      <span className="absolute top-1 left-1/2 -translate-x-1/2">
        <i
          onClick={() => setConfirmRidePanel(false)}
          className="ri-arrow-down-wide-line font-bold text-2xl"
        ></i>
      </span>
      <h4 className="px-4 py-2 mt-5 text-xl font-semibold">
        Confirm Ride to Start!
      </h4>

      <div className="p-2 m-2 bg-yellow-300 rounded-lg flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <img
            className="w-12 h-12 rounded-full object-cover object-center"
            src="https://www.shutterstock.com/image-photo/close-head-shot-portrait-preppy-600nw-1433809418.jpg"
            alt="img"
          />
          <h4 className="text-lg font-medium">
            {ride?.user.fullname.firstname + " " + ride?.user.fullname.lastname}
          </h4>
        </div>
        <h4 className="text-md font-medium">{ride?.distance} KM</h4>
      </div>

      <div className="flex flex-col justify-start items-center">
        <div className="w-full flex flex-col gap-2 p-2">
          <div className="flex justify-start items-center gap-4 px-4 py-1">
            <i className="ri-map-pin-fill text-lg"></i>
            <p className="text-sm text-gray-600">{ride?.pickUp}</p>
          </div>
          <hr />
          <div className="flex justify-start items-center gap-4 px-4 py-1">
            <i className="ri-square-fill"></i>
            <p className="text-sm text-gray-600">{ride?.destination}</p>
          </div>
          <hr />
          <div className="flex justify-start items-center gap-4 px-4 ">
            <i className="ri-bank-card-2-fill"></i>
            <div>
              <h3 className="font-semibold">₹{ride?.fare}</h3>
              <p className="text-sm text-gray-600">Cash - cash</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="w-full"
        >
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            className="w-[92%] px-4 py-2 m-4 border-2 rounded-lg text-xl bg-gray-100 outline-amber-200"
            name="otp"
            id="otp"
            placeholder="Enter your otp"
          />

          <div className="px-4 flex justify-center items-center gap-4">
            <button
              type="submit"
              className=" w-full px-4 py-2 bg-green-500 rounded-lg text-white text-lg text-center font-semibold"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setConfirmRidePanel(false);
              }}
              className=" w-full px-4 py-2 bg-red-500 rounded-lg text-white text-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComfirmRidePopup;
