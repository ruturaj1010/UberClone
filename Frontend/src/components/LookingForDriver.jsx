import React from "react";

const LookingForDriver = ({
  pickUp,
  destination,
  fare,
  selectVehicle,
  setVehicleFoundPanelOpen,
}) => {
  return (
    <div className="w-screen overflow-x-hidden mb-4">
      <span className="absolute top-0 left-1/2 -translate-x-1/2">
        <i
          onClick={() => setVehicleFoundPanelOpen(false)}
          className="ri-arrow-down-wide-line font-bold text-2xl"
        ></i>
      </span>
      <h4 className="p-4 mt-5 text-lg font-semibold">Looking for Driver</h4>

      <div className="flex flex-col justify-start items-center">
        <img
          className=" w-56 h-28 object-cover rounded-lg mb-4"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
          alt="img"
        />
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-start items-center gap-4 px-4 py-1">
            <i className="ri-map-pin-fill text-lg"></i>
            <p className="text-sm text-gray-900">{pickUp}</p>
          </div>
          <hr />
          <div className="flex justify-start items-center gap-4 px-4 py-1">
            <i className="ri-square-fill"></i>

            <p className="text-sm text-gray-900">{destination}</p>
          </div>
          <hr />
          <div className="flex justify-start items-center gap-4 px-4 mb-5">
            <i className="ri-bank-card-2-fill"></i>
            <div>
              <h3 className="font-semibold">
                ₹{fare?.fares?.[selectVehicle] ?? "--"}
              </h3>
              <p className="text-sm text-gray-600">Cash - cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
