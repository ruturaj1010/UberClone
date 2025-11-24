import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ComfirmRidePopup";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketDataContext } from "../context/SocketContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const ridePanelRef = useRef(null);

  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmridePanelRef = useRef(null);

  const [ride, setRide] = useState(null);

  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketDataContext);

  useGSAP(() => {
    gsap.to(ridePanelRef.current, {
      transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmridePanelRef.current, {
      transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [confirmRidePanel]);

  const confirmRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setConfirmRidePanel(true);
    setRidePopupPanel(false);
  };

  useEffect(() => {
    socket.emit("join", { userId: captain._id, userType: "captain" });

    const updateLocation = () => {
      if (!navigator.geolocation) {
        console.log("Geolocation is NOT supported in this browser");
        return;
      }

      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Location fetched:", position);

        socket.emit("update-location-captain", {
          userId: captain._id,
          location: {
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    };

    const locationInterval = setInterval(updateLocation, 15000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("new-ride", (rideData) => {
      console.log("NEW RIDE RECEIVED:", rideData);
      setRide(rideData);
      setRidePopupPanel(true);
    });

    return () => socket.off("new-ride");
  }, [socket]);

  return (
    <div className="w-screen h-screen">
      <div className="fixed top-2 px-2">
        <img
          className="w-16 object-contain object-left"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png"
          alt="img"
        />
      </div>

      <div className="h-4/6 relative overflow-hidden">
        <LiveTracking pickupCoords={ride?.pickup} destinationCoords={ride?.destination} />
      </div>
      <div className="w-screen h-2/6 overflow-y-auto p-4">
        <CaptainDetails />
      </div>

      <div
        ref={ridePanelRef}
        className="w-full overflow-y-auto translate-y-full fixed bottom-0 z-10 bg-white"
      >
        <RidePopUp
          ride={ride}
          setConfirmRidePanel={setConfirmRidePanel}
          setRidePopupPanel={setRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={confirmridePanelRef}
        className="w-full h-screen overflow-y-auto translate-y-full fixed bottom-0 z-20 bg-white"
      >
        <ConfirmRidePopup
          ride={ride}
          setConfirmRidePanel={setConfirmRidePanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
