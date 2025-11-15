import React from "react";

const WaitingForDriver = ({ setWaitingForDriverPanelOpen }) => {
  return (
    <div className="w-screen overflow-x-hidden mb-4">
      <span className="absolute top-1 left-1/2 -translate-x-1/2">
        <i
          onClick={() => setWaitingForDriverPanelOpen(false)}
          className="ri-arrow-down-wide-line font-bold text-2xl"
        ></i>
      </span>

      <div className="flex items-center justify-between p-4">
        <img className="h-12 w-12 rounded-full object-cover object-center"
          src="https://www.jeancoutu.com/globalassets/revamp/photo/conseils-photo/20160302-01-reseaux-sociaux-profil/photo-profil_301783868.jpg"
          alt="img"
        />
        <div className="flex flex-col justify-center items-end font-semibold text-base">
          <h2>Ruturaj</h2>
          <h4 className="-my-1">MH10 AJ 5228</h4>
          <p className="text-xs">Maruti Suzuki Baleno</p>
        </div>
      </div>

      <div className="flex flex-col justify-start items-center">
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-start items-cenigter gap-4 px-4 py-1">
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
          <div className="flex justify-start items-center gap-4 px-4 mb-5">
            <i className="ri-bank-card-2-fill"></i>
            <div>
              <h3 className="font-semibold">₹193</h3>
              <p className="text-sm text-gray-600">Cash - cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
