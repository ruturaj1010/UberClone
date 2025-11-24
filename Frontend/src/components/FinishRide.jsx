import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const FinishRide = ({ setFinishRidePanel, rideData }) => {
  const navigate = useNavigate();

  const endRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      { rideId: rideData._id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status == 200) {
      setFinishRidePanel(false);
      navigate("/captain-home");
    }
  };

  return (
    <div className="w-screen overflow-x-hidden mb-4">
      <span className="absolute top-1 left-1/2 -translate-x-1/2">
        <i
          onClick={() => setFinishRidePanel(false)}
          className="ri-arrow-down-wide-line font-bold text-2xl"
        ></i>
      </span>

      <h4 className="px-4 py-2 mt-5 text-xl font-semibold">Finish this Ride</h4>

      <div className="p-2 m-2 bg-yellow-300 rounded-lg flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <img
            className="w-12 h-12 rounded-full object-cover object-center"
            src="https://www.shutterstock.com/image-photo/close-head-shot-portrait-preppy-600nw-1433809418.jpg"
            alt="img"
          />
          <h4 className="text-lg font-medium">
            {rideData?.user.fullname.firstname +
              " " +
              rideData?.user.fullname.lastname}
          </h4>
        </div>
        <h4 className="text-md font-medium">{rideData?.duration} KM</h4>
      </div>

      <div className="w-full flex flex-col justify-start items-center">
        <div className="w-full flex flex-col gap-2 p-2">
          <div className="flex justify-start items-center gap-4 px-4 py-1">
            <i className="ri-map-pin-fill text-lg"></i>
            <p className="text-sm text-gray-600">{rideData?.pickUp}</p>
          </div>
          <hr />
          <div className="flex justify-start items-center gap-4 px-4 py-1">
            <i className="ri-square-fill"></i>
            <p className="text-sm text-gray-600">{rideData?.destination}</p>
          </div>
          <hr />
          <div className="flex justify-start items-center gap-4 px-4 ">
            <i className="ri-bank-card-2-fill"></i>
            <div>
              <h3 className="font-semibold">₹{rideData?.fare}</h3>
              <p className="text-sm text-gray-600">Cash - cash</p>
            </div>
          </div>
        </div>

        <div className="w-full px-4 flex justify-center items-center gap-4">
          <button
            onClick={(e) => {
              endRide(e);
            }}
            className=" w-full px-4 py-2 bg-green-500 rounded-lg text-white text-lg text-center font-semibold"
          >
            Finish ride
          </button>
        </div>
        <p className="text-sm text-center leading-tight text-red-500 mt-2">
          Click on finish ride button if you have completed the payment
        </p>
      </div>
    </div>
  );
};

export default FinishRide;
