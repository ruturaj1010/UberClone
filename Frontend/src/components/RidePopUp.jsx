import React from "react";
import { useEffect } from "react";

const RidePopUp = ({ ride, setConfirmRidePanel, setRidePopupPanel, confirmRide }) => {

  return (
    <div className="w-screen overflow-x-hidden mb-4">
      <span className="absolute top-1 left-1/2 -translate-x-1/2">
        <i
          onClick={() => setRidePopupPanel(false)}
          className="ri-arrow-down-wide-line font-bold text-2xl"
        ></i>
      </span>
      <h4 className="px-4 py-2 mt-5 text-xl font-semibold">
        New Ride Available!
      </h4>

      <div className="p-2 m-2 bg-yellow-300 rounded-lg flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <img
            className="w-12 h-12 rounded-full object-cover object-center"
            src="https://www.shutterstock.com/image-photo/close-head-shot-portrait-preppy-600nw-1433809418.jpg"
            alt="img"
          />
          <h4 className="text-lg font-medium">
            {ride?.user.fullname.firstname +
              " " +
              ride?.user.fullname.lastname}
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
          <div className="flex justify-start items-center gap-4 px-4 mb-4">
            <i className="ri-bank-card-2-fill"></i>
            <div>
              <h3 className="font-semibold">₹{ride?.fare}</h3>
              <p className="text-sm text-gray-600">Cash - cash</p>
            </div>
          </div>
        </div>

        <div className="w-full px-4 flex justify-center items-center gap-4">
          <button
            onClick={() => {
              setRidePopupPanel(false);
            }}
            className="w-full px-4 py-2 bg-gray-400 rounded-lg text-white text-lg font-semibold"
          >
            Ignore
          </button>

          <button
            onClick={() => {
              confirmRide()
            }}
            className="w-full px-4 py-2 bg-green-500 rounded-lg text-white text-lg font-semibold"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
