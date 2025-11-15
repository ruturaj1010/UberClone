import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const closePanel = useRef(null);

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const vehiclePanelOpenref = useRef(null);

  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const confirmRideRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      gsap.to(panelRef.current, {
        height: panelOpen ? "74%" : "0%",
        padding: panelOpen ? "24px" : "0px",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(closePanel.current, {
        opacity: panelOpen ? "1" : "0",
        duration: 0.5,
        ease: "power2.out",
      });
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      gsap.to(vehiclePanelOpenref.current, {
        transform: vehiclePanelOpen ? "translateY(0)" : "translateY(100%)",
        duration: 0.5,
        ease: "power2.out",
      });
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      gsap.to(confirmRideRef.current, {
        transform: confirmRidePanelOpen ? "translateY(0)" : "translateY(100%)",
        duration: 0.5,
        ease: "power2.out",
      });
    },
    [confirmRidePanelOpen]
  );

  return (
    <div className="relative overflow-hidden">
      <img
        className="w-16 absolute top-4 left-4 z-10"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png"
        alt="img"
      />
      <div className="h-screen w-screen">
        {/* {image for temporary use} */}
        <img
          className="h-full w-full object-cover"
          src="https://media.geeksforgeeks.org/wp-content/uploads/20220218205322/WhatsAppImage20220218at54912PM-304x660.jpeg"
          alt="map img"
        />
      </div>

      <div className=" w-full h-screen flex flex-col justify-end absolute bottom-0 z-20">
        <div className="h-[26%] bg-white p-5 relative">
          <h5
            onClick={(e) => setPanelOpen(false)}
            className="absolute top-5 right-7"
          >
            <i
              ref={closePanel}
              className="ri-arrow-down-wide-line opacity-0 font-bold text-2xl"
            ></i>
          </h5>
          <h4 className="text-3xl font-semibold pl-1">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line bg-gray-800 absolute h-[52px] w-1 left-9 top-[48%] rounded-full"></div>
            <input
              className="bg-[#eee] w-full text-base font-medium px-8 py-2 rounded-lg my-2 outline-orange-400"
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              type="text"
              name="pickup"
              id="pickup"
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] w-full text-base font-medium px-8 py-2 rounded-lg outline-orange-400"
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              name="destination"
              id="destination"
              placeholder="Enter a destination"
            />
          </form>
        </div>

        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelOpenref}
        className="w-full overflow-y-auto translate-y-full fixed bottom-0 z-30 bg-white"
      >
        <VehiclePanel
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>

      <div
        className="w-full overflow-y-auto translate-y-full fixed bottom-0 z-40 bg-white"
        ref={confirmRideRef}
      >
        <ConfirmRide setConfirmRidePanelOpen={setConfirmRidePanelOpen} />
      </div>
    </div>
  );
};

export default Home;
