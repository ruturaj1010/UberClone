import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LiveTracking({ pickupCoords, destinationCoords }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current && containerRef.current) {
      mapRef.current = L.map(containerRef.current, {
        center: [20.5937, 78.9629], // India default
        zoom: 16
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    if (!navigator.geolocation) return;

    // Center the map to the user's current location immediately
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude, heading } = pos.coords;
        updateUserMarker(latitude, longitude, heading);
      },
      err => console.log("Geolocation (initial) error:", err),
      { enableHighAccuracy: true }
    );

    watchIdRef.current = navigator.geolocation.watchPosition(
      pos => {
        const { latitude, longitude, heading } = pos.coords;
        updateUserMarker(latitude, longitude, heading);
      },
      err => console.log("Geolocation (watch) error:", err),
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchIdRef.current);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const updateUserMarker = (lat, lng, heading) => {
    const latlng = [lat, lng];

    if (!userMarkerRef.current) {
      userMarkerRef.current = L.marker(latlng).addTo(mapRef.current);
    } else {
      userMarkerRef.current.setLatLng(latlng);
    }

    if (heading !== null) {
      const el = userMarkerRef.current.getElement();
      if (el) {
        el.style.transformOrigin = "center";
        el.style.transform = `rotate(${heading}deg)`;
      }
    }

    mapRef.current.setView(latlng, 17);
  };

  // Add pickup marker
  useEffect(() => {
    if (!pickupCoords || !mapRef.current) return;

    if (!pickupCoords.marker) {
      pickupCoords.marker = L.marker(pickupCoords).addTo(mapRef.current);
    } else {
      pickupCoords.marker.setLatLng(pickupCoords);
    }
  }, [pickupCoords]);

  // Add destination marker
  useEffect(() => {
    if (!destinationCoords || !mapRef.current) return;

    if (!destinationCoords.marker) {
      destinationCoords.marker = L.marker(destinationCoords).addTo(mapRef.current);
    } else {
      destinationCoords.marker.setLatLng(destinationCoords);
    }
  }, [destinationCoords]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute top-0 left-0 z-0"
    />
  );
}
