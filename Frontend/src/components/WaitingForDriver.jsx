import React, { useEffect } from "react";

const WaitingForDriver = ({ ride, setWaitingForDriverPanelOpen }) => {
  useEffect(() => {
    console.log(ride);
  }, [ride]);
  return (
    <div className="w-screen overflow-x-hidden mb-4">
      <span className="absolute top-1 left-1/2 -translate-x-1/2">
        <i
          onClick={() => setWaitingForDriverPanelOpen(false)}
          className="ri-arrow-down-wide-line font-bold text-2xl"
        ></i>
      </span>

      <div className="flex items-center justify-between p-4">
        <img
          className="h-12 w-12 rounded-full object-cover object-center"
          src="https://www.jeancoutu.com/globalassets/revamp/photo/conseils-photo/20160302-01-reseaux-sociaux-profil/photo-profil_301783868.jpg"
          alt="img"
        />
        <div className="flex flex-col justify-center items-end font-semibold text-base">
          <h2>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
          <h4 className="-my-1">{ride?.captain.vehicle.plate}</h4>
          <p className="text-xs">Color : {ride?.captain.vehicle.color}</p>
          <h1>{ride?.otp}</h1>
        </div>
      </div>

      <div className="flex flex-col justify-start items-center">
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-start items-cenigter gap-4 px-4 py-1">
            <i className="ri-map-pin-fill text-lg"></i>
            <p className="text-sm text-gray-600">{ride?.pickUp}</p>
          </div>
          <hr />
          <div className="flex justify-start items-center gap-4 px-4 py-1">
            <i className="ri-square-fill"></i>
            <p className="text-sm text-gray-600">{ride?.destination}</p>
          </div>
          <hr />
          <div className="flex justify-start items-center gap-4 px-4 mb-5">
            <i className="ri-bank-card-2-fill"></i>
            <div>
              <h3 className="font-semibold">₹{ride?.fare}</h3>
              <p className="text-sm text-gray-600">Cash - cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
