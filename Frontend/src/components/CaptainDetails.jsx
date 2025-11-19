import React, { useContext, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  
  return (
    <div>
      <div className="p-2 mb-4 flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <img
            className="w-14 h-14 rounded-full object-cover object-center"
            src="https://t3.ftcdn.net/jpg/06/39/64/14/360_F_639641415_lLjzVDVwL0RwdNrkURYFboc4N21YIXJR.jpg"
            alt="img"
          />
          <h4 className="text-lg font-medium">
            {captain.fullname.firstname + " " + captain.fullname.lastname}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹193</h4>
          <p className="text-sm font-thin text-gray-500">Earned</p>
        </div>
      </div>

      <div className="p-2 flex justify-center items-center gap-8 bg-yellow-300 rounded-lg">
        <div className="text-center">
          <i className="ri-timer-2-line font-thin text-3xl"></i>
          <h5 className="font-medium text-md">10.2</h5>
          <p className="text-sm font-light">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="ri-speed-up-line font-thin text-3xl"></i>
          <h5 className="font-medium text-md">54.6</h5>
          <p className="text-sm font-light">Km/hr Speed</p>
        </div>
        <div className="text-center">
          <i className="ri-booklet-line font-thin text-2xl"></i>
          <h5 className="font-medium text-md">10</h5>
          <p className="text-sm font-light">Rides</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
