import React from "react";
import { Link } from "react-router-dom";

const ComfirmRidePopup = ({ setConfirmRidePanel }) => {
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
          <h4 className="text-lg font-medium">Swara Sawant</h4>
        </div>
        <h4 className="text-md font-medium">2.2 KM</h4>
      </div>

      <div className="flex flex-col justify-start items-center">
        <div className="w-full flex flex-col gap-2 p-2">
          <div className="flex justify-start items-center gap-4 px-4 py-1">
            <i className="ri-map-pin-fill text-lg"></i>
            <div>
              <h3 className="font-semibold">562/11-A</h3>
              <p className="text-sm text-gray-600">
                Kasaba Bawada, Kolhapur, Maharashtra
              </p>
            </div>
          </div>
          <hr />
          <div className="flex justify-start items-center gap-4 px-4 py-1">
            <i className="ri-square-fill"></i>
            <div>
              <h3 className="font-semibold">Third wave coffee</h3>
              <p className="text-sm text-gray-600">
                Shop No. 5, Near City Pride, Kolhapur
              </p>
            </div>
          </div>
          <hr />
          <div className="flex justify-start items-center gap-4 px-4 mb-4">
            <i className="ri-bank-card-2-fill"></i>
            <div>
              <h3 className="font-semibold">₹193</h3>
              <p className="text-sm text-gray-600">Cash - cash</p>
            </div>
          </div>
        </div>
        <Link
          to={"/captain-riding"}
          className="w-[95%] p-2 bg-green-500 rounded-lg text-white text-lg text-center font-semibold"
        >
          Confirm
        </Link>

        <button
          onClick={() => {
            setConfirmRidePanel(false);
          }}
          className="w-[95%] p-2 mt-2 bg-red-500 rounded-lg text-white text-lg font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ComfirmRidePopup;
