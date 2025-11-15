import React from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";

const CaptainHome = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full fixed top-0 flex justify-between items-center px-2">
        <img
          className="w-16 object-contain object-left"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png"
          alt="img"
        />
        <Link
          to="/captain-home"
          className="w-[42px] h-10 m-2 rounded-full bg-gray-300 flex items-center justify-center shadow-md z-10"
        >
          <i className="ri-logout-box-r-line font-semibold text-xl"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover object-center"
          src="https://media.geeksforgeeks.org/wp-content/uploads/20220218205322/WhatsAppImage20220218at54912PM-304x660.jpeg"
          alt="map img"
        />
      </div>
      <div className="w-screen h-2/5 overflow-y-auto p-4">
        <CaptainDetails />
      </div>
    </div>
  );
};

export default CaptainHome;
