import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const closePanel = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      gsap.to(panelRef.current, {
        height: panelOpen ? "72%" : "0%",
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

  return (
    <div className="relative">
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

      <div className=" h-screen flex flex-col justify-end absolute bottom-0 w-full z-20">
        <div className="h-[28%] bg-white p-5 relative">

          <h5 onClick={(e)=>setPanelOpen(false)} className="absolute top-5 right-7">
            <i ref={closePanel} className="ri-arrow-down-wide-line opacity-0 font-bold text-2xl"></i>
          </h5>
          <h4 className="text-3xl font-semibold pl-1">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line bg-gray-800 absolute h-14 w-1 left-8 top-[43%] rounded-full"></div>
            <input
              className="bg-[#eee] w-full text-base font-medium px-8 py-2 rounded-lg my-2 outline-none"
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              type="text"
              name="pickup"
              id="pickup"
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] w-full text-base font-medium px-8 py-2 rounded-lg outline-none"
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

        <div ref={panelRef} className="bg-amber-500 h-0"></div>
      </div>
    </div>
  );
};

export default Home;
