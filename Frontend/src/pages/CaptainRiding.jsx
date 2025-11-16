import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      transform: finishRidePanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [finishRidePanel]);

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

      <div className="h-5/6">
        <img
          className="h-full w-full object-cover object-center"
          src="https://media.geeksforgeeks.org/wp-content/uploads/20220218205322/WhatsAppImage20220218at54912PM-304x660.jpeg"
          alt="map img"
        />
      </div>
      <div
        onClick={() => {
          setFinishRidePanel(true);
        }}
        className="w-screen h-1/6 p-6 relative flex items-center justify-between bg-yellow-400"
      >
        <span className="absolute top-1 left-1/2 -translate-x-1/2">
          <i className="ri-arrow-up-wide-line font-bold text-2xl"></i>
        </span>
        <h4 className="text-xl">4 KM Away</h4>
        <button className=" px-3 py-2 bg-green-500 rounded-lg text-white text-lg font-semibold">
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="w-full overflow-y-auto translate-y-full fixed bottom-0 z-20 bg-white"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
