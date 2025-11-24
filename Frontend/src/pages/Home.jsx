import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketDataContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const [selectVehicle, setSelectVehicle] = useState("");

  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketDataContext);

  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const closePanel = useRef(null);

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const vehiclePanelOpenref = useRef(null);

  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const confirmRideRef = useRef(null);

  const [vehicleFoundPanelOpen, setVehicleFoundPanelOpen] = useState(false);
  const lookingPanelRef = useRef(null);

  const [waitingForDriverPanelOpen, setWaitingForDriverPanelOpen] = useState(false);
  const waitingPanelRef = useRef(null);

  const [ride, setRide] = useState(null);

  const navigate = useNavigate();

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

  useGSAP(
    function () {
      gsap.to(lookingPanelRef.current, {
        transform: vehicleFoundPanelOpen ? "translateY(0)" : "translateY(100%)",
        duration: 0.5,
        ease: "power2.out",
      });
    },
    [vehicleFoundPanelOpen]
  );

  useGSAP(
    function () {
      gsap.to(waitingPanelRef.current, {
        transform: waitingForDriverPanelOpen
          ? "translateY(0)"
          : "translateY(100%)",
        duration: 0.5,
        ease: "power2.out",
      });
    },
    [waitingForDriverPanelOpen]
  );

  const findTrip = async (e) => {
    e.preventDefault();

    try {
      setPanelOpen(false);

      const params = new URLSearchParams({
        pickUp: pickUp,
        destination: destination,
      }).toString();

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare?${params}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setFare(res.data.fare);

      setVehiclePanelOpen(true);
    } catch (err) {
      console.error("Fare API error:", err);

      alert("Unable to fetch fare. Please check your locations.");
    }
  };

  const createRide = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create-ride`,
        { pickUp, destination, vehicleType: selectVehicle },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Create Ride API error:", error);
      alert("Unable to create ride. Please try again.");
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      const query = activeField === "pickUp" ? pickUp : destination;

      if (!query || query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/maps/get-suggestions?query=${query}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSuggestions(response.data.predictions || []);
      } catch (err) {
        console.error("Suggestions error:", err);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [pickUp, destination, activeField]);

  useEffect(() => {
    socket.emit("join", { userId: user._id, userType: "user" });
  }, []);

  socket.on("ride-confirmed", (ride) => {
    setRide(ride);
    setVehicleFoundPanelOpen(false);
    setWaitingForDriverPanelOpen(true);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriverPanelOpen(false);
    navigate("/riding", { state: { ride: ride } });
  });

  return (
    <div className="relative overflow-hidden">
      <img
        className="w-16 absolute top-4 left-4 z-10"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png"
        alt="img"
      />
      <div className="h-screen w-screen">
        <LiveTracking
          pickupCoords={fare?.pickupCoords || null}
          destinationCoords={fare?.destinationCoords || null}
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
              findTrip(e);
            }}
          >
            <div className="line bg-gray-800 absolute h-[52px] w-1 left-9 top-[48%] rounded-full"></div>
            <input
              className="bg-[#eee] w-full text-base font-medium px-8 py-2 rounded-lg my-2 outline-orange-400"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickUp");
              }}
              value={pickUp}
              onChange={(e) => {
                setPickUp(e.target.value);
                setActiveField("pickUp");
                setPanelOpen(true);
              }}
              type="text"
              placeholder="Add a pick-up location"
            />

            <input
              className="bg-[#eee] w-full text-base font-medium px-8 py-2 rounded-lg outline-orange-400"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setActiveField("destination");
                setPanelOpen(true);
              }}
              type="text"
              placeholder="Enter a destination"
            />

            <button
              type="submit"
              className="bg-black text-white w-full text-center py-1 rounded-lg font-medium mt-6"
            >
              Search for rides
            </button>
          </form>
        </div>

        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            suggestions={suggestions}
            activeField={activeField}
            setPickUp={setPickUp}
            setDestination={setDestination}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelOpenref}
        className="w-full overflow-y-auto translate-y-full fixed bottom-0 z-30 bg-white"
      >
        <VehiclePanel
          fare={fare}
          setSelectVehicle={setSelectVehicle}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>

      <div
        className="w-full overflow-y-auto translate-y-full fixed bottom-0 z-40 bg-white"
        ref={confirmRideRef}
      >
        <ConfirmRide
          createRide={createRide}
          pickUp={pickUp}
          destination={destination}
          fare={fare}
          selectVehicle={selectVehicle}
          setVehicleFoundPanelOpen={setVehicleFoundPanelOpen}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
        />
      </div>

      <div
        className="w-full overflow-y-auto translate-y-full fixed bottom-0 z-40 bg-white"
        ref={lookingPanelRef}
      >
        <LookingForDriver
          pickUp={pickUp}
          destination={destination}
          fare={fare}
          selectVehicle={selectVehicle}
          setVehicleFoundPanelOpen={setVehicleFoundPanelOpen}
        />
      </div>

      <div
        className="w-full overflow-y-auto fixed translate-y-full bottom-0 z-40 bg-white"
        ref={waitingPanelRef}
      >
        <WaitingForDriver
          ride={ride}
          setWaitingForDriverPanelOpen={setWaitingForDriverPanelOpen}
        />
      </div>
    </div>
  );
};

export default Home;
