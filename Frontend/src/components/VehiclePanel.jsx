import React from "react";

const VehiclePanel = ({ setConfirmRidePanelOpen ,setVehiclePanelOpen}) => {
  return (
    <div>
      <span className="absolute top-1 left-1/2 -translate-x-1/2">
        <i
          onClick={() => setVehiclePanelOpen(false)}
          className="ri-arrow-down-wide-line font-bold text-2xl"
        ></i>
      </span>
      <h3 className="text-xl pt-8 p-3 pb-0 mb-3 font-semibold">
        Choose a vehicle {"  "} <i className="ri-taxi-fill"></i>
      </h3>

      <div onClick={()=>{setConfirmRidePanelOpen(true)
        setVehiclePanelOpen(false)
      }} className=" flex justify-between items-start p-2 m-2 border-2 border-white active:border-black rounded-xl bg-gray-200">
        <div className="flex justify-start items-start gap-4">
          <img
            className="h-12 w-14 object-center"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
            alt="img"
          />

          <div className="flex flex-col leading-tight text-sm justify-center items-start">
            <h4 className="font-semibold text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-3-fill text-sm"></i> 4
              </span>
            </h4>
            <p className="flex justify-start items-center gap-2 font-medium">
              2 mins away{" "}
              <span className="w-1.5 h-1.5 block rounded-full bg-black"></span>{" "}
              <span>15:24</span>
            </p>
            <p className="text-gray-600 text-xs">Affortable, compact size</p>
          </div>
        </div>
        <div className="pr-3 font-semibold text-lg">₹193</div>
      </div>

      <div onClick={()=>{setConfirmRidePanelOpen(true)
        setVehiclePanelOpen(false)
      }} className=" flex justify-between items-start p-2 m-2 border-2 border-white active:border-black rounded-xl bg-gray-200">
        <div className="flex justify-start items-start gap-4">
          <img
            className="h-10 w-14 pt-2"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n"
            alt="img"
          />

          <div className="flex flex-col leading-tight text-sm justify-center items-start">
            <h4 className="font-semibold text-base">
              Moto{" "}
              <span>
                <i className="ri-user-3-fill text-sm"></i> 1
              </span>
            </h4>
            <p className="flex justify-start items-center gap-2 font-medium">
              3 mins away{" "}
              <span className="w-1.5 h-1.5 block rounded-full bg-black"></span>{" "}
              <span>15:24</span>
            </p>
            <p className="text-gray-600 text-xs">Affortable, motorcycle ride</p>
          </div>
        </div>
        <div className="pr-3 font-semibold text-lg">₹80</div>
      </div>

      <div onClick={()=>{setConfirmRidePanelOpen(true)
        setVehiclePanelOpen(false)
      }} className=" flex justify-between items-start p-2 m-2 border-2 border-white active:border-black rounded-xl bg-gray-200">
        <div className="flex justify-start items-start gap-4">
          <img
            className="h-10 w-14 pt-2"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n"
            alt="img"
          />

          <div className="flex flex-col leading-tight text-sm justify-center items-start">
            <h4 className="font-semibold text-base">
              Auto{" "}
              <span>
                <i className="ri-user-3-fill text-sm"></i> 3
              </span>
            </h4>
            <p className="flex justify-start items-center gap-2 font-medium">
              2.5 mins away{" "}
              <span className="w-1.5 h-1.5 block rounded-full bg-black"></span>{" "}
              <span>15:24</span>
            </p>
            <p className="text-gray-600 text-xs">Affortable, compact size</p>
          </div>
        </div>
        <div className="pr-3 font-semibold text-lg">₹120</div>
      </div>
    </div>
  );
};

export default VehiclePanel;
