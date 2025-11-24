import React from "react";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export function LiveMap({
  zoom = 16,
  tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const watchIdRef = useRef(null);

  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // initialize map
    mapRef.current = L.map(containerRef.current, {
      center: [0, 0],
      zoom,
      zoomControl: true,
    });

    // add OpenStreetMap tile layer
    L.tileLayer(tileUrl, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // try to get a quick initial position (one-off) then start watchPosition
    const setPosition = (lat, lng, heading = null) => {
      const latlng = [lat, lng];
      if (!markerRef.current) {
        markerRef.current = L.marker(latlng).addTo(mapRef.current);
      } else {
        markerRef.current.setLatLng(latlng);
      }

      // rotate marker icon if heading available (simple CSS transform)
      if (heading != null) {
        const iconElem = markerRef.current.getElement();
        if (iconElem) {
          iconElem.style.transformOrigin = "center";
          iconElem.style.transform = `rotate(${heading}deg)`;
        }
      }

      mapRef.current.setView(latlng, Math.max(mapRef.current.getZoom(), zoom));
    };

    const onPositionSuccess = (pos) => {
      const { latitude, longitude, heading } = pos.coords;
      setPosition(latitude, longitude, heading);
    };

    const onPositionError = (err) => {
      // keep behavior minimal: log error
      // In production, surface a UI message to the user
      // console.warn("Geolocation error:", err);
    };

    // one-shot getCurrentPosition to center map quickly (optional)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => onPositionSuccess(pos),
        () => {},
        { enableHighAccuracy: true }
      );

      // start watching position for live updates
      watchIdRef.current = navigator.geolocation.watchPosition(
        onPositionSuccess,
        onPositionError,
        {
          enableHighAccuracy: true,
          maximumAge: 5000,
          timeout: 10000,
        }
      );
    } else {
      // no geolocation available
      // (could show fallback UI if desired)
    }

    // cleanup on unmount
    return () => {
      if (watchIdRef.current != null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [tileUrl, zoom]);

  // the container will grow to fill its parent; style as needed where used
  return (
    <div
      ref={containerRef}
      style={{
      width: "100%",
      height: "100vh",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 5,
    }}
    />
  );
}
const LiveTracking = () => {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen z-10">
      <LiveMap />
    </div>
  );
};

export default LiveTracking;
