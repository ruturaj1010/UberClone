import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const closePanel = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const vehiclePanelOpenref = useRef(null);

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
        <h3 className="text-xl pl-2 pt-2 mb-3 font-semibold">
          Choose a vehicle
        </h3>

        <div className=" flex justify-between items-start p-2 m-2 border-2 border-white active:border-black rounded-xl bg-gray-200">
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

        <div className=" flex justify-between items-start p-2 m-2 border-2 border-white active:border-black rounded-xl bg-gray-200">
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
              <p className="text-gray-600 text-xs">
                Affortable, motorcycle ride
              </p>
            </div>
          </div>
          <div className="pr-3 font-semibold text-lg">₹80</div>
        </div>

        <div className=" flex justify-between items-start p-2 m-2 border-2 border-white active:border-black rounded-xl bg-gray-200">
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
    </div>
  );
};

export default Home;
