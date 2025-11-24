import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketDataContext } from "../context/SocketContext";

const Riding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rideData = location.state?.ride;

  const { socket } = useContext(SocketDataContext);

  useEffect(() => {
    if (!socket) return;

    const handleRideEnd = () => {
      navigate("/home");
    };
    console.log("My socket ID:", socket.id);
    socket.on("ride-ended", handleRideEnd);

    return () => {
      socket.off("ride-ended", handleRideEnd);
    };
  }, [socket, navigate]);

  return (
    <div className="w-screen h-screen">
      <Link
        to="/home"
        className="fixed top-0 right-0 w-10 h-10 m-2 rounded-full bg-gray-300 flex items-center justify-center shadow-md z-10"
      >
        <i className="ri-home-5-line font-semibold text-xl"></i>
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover object-center"
          src="https://media.geeksforgeeks.org/wp-content/uploads/20220218205322/WhatsAppImage20220218at54912PM-304x660.jpeg"
          alt="map img"
        />
      </div>
      <div className="w-screen h-1/2 overflow-y-auto p-4">
        <div className="flex items-center justify-between p-4">
          <img
            className="h-12 w-16 object-cover object-center"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
            alt="img"
          />
          <div className="flex flex-col justify-center items-end font-semibold text-base">
            <h2>{rideData?.captain.fullname.firstname}</h2>
            <h4 className="-my-1">{rideData?.captain.vehicle.plate}</h4>
            <p className="text-xs">{rideData?.captain.vehicle.color}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-start items-center">
          <div className="w-full flex flex-col gap-4">
            <div className="flex justify-start items-center gap-4 px-4 py-1">
              <i className="ri-square-fill"></i>
              <p className="text-sm text-gray-600">{rideData?.destination}</p>
            </div>

            <div className="flex justify-start items-center gap-4 px-4 mb-5">
              <i className="ri-bank-card-2-fill"></i>
              <div>
                <h3 className="font-semibold">₹{rideData?.fare}</h3>
                <p className="text-sm text-gray-600">Cash - cash</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              navigate("/home");
            }}
            className="bg-green-500 text-white font-semibold text-xl border rounded-lg w-[95%] text-center py-1 mx-2"
          >
            Make a payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
