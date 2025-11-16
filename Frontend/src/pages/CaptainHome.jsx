import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ComfirmRidePopup";

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const ridePanelRef = useRef(null);

  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmridePanelRef = useRef(null)

  useGSAP(()=>{
    gsap.to(ridePanelRef.current,{
      transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
      duration:0.5,
      ease:"power2.out"
    })
  }, [ridePopupPanel]);

  useGSAP(()=>{
    gsap.to(confirmridePanelRef.current,{
      transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
      duration:0.5,
      ease:"power2.out"
    })
  },[confirmRidePanel]);

  return (
    <div className="w-screen h-screen">
      <div className="fixed top-2 px-2">
        <img
          className="w-16 object-contain object-left"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png"
          alt="img"
        />
      </div>

      <div className="h-4/6">
        <img
          className="h-full w-full object-cover object-center"
          src="https://media.geeksforgeeks.org/wp-content/uploads/20220218205322/WhatsAppImage20220218at54912PM-304x660.jpeg"
          alt="map img"
        />
      </div>
      <div className="w-screen h-2/6 overflow-y-auto p-4">
        <CaptainDetails />
      </div>

      <div
        ref={ridePanelRef}
        className="w-full overflow-y-auto translate-y-full fixed bottom-0 z-10 bg-white"
      >
        <RidePopUp setConfirmRidePanel={setConfirmRidePanel} setRidePopupPanel={setRidePopupPanel}/>
      </div>

      <div
        ref={confirmridePanelRef}
        className="w-full h-screen overflow-y-auto translate-y-full fixed bottom-0 z-20 bg-white"
      >
        <ConfirmRidePopup setConfirmRidePanel={setConfirmRidePanel} />
      </div>

    </div>
  );
};

export default CaptainHome;
