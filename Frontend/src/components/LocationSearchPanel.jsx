import React from "react";

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanelOpen}) => {
  const locations = [
    "24B, Near 9th Lane, Biranje panand, Shahu circle, Kasaba Bawada",
    "12C, FC Road, Deccan Gymkhana, Pune",
    "56A, MG Road, Shivaji Nagar, Pune",
    "89D, Kothrud, Pune",
    "56A, MG Road, Shivaji Nagar, Pune",
  ];
  return (
    <div className="h-[70vh] overflow-y-auto flex flex-col gap-2">
      {locations.map((ele, i) => {
        return (
          <div
            key={i}
            onClick={()=>{
                setVehiclePanelOpen(true);
                setPanelOpen(false);
            }}
            className="border border-gray-300 active:border-black rounded-lg p-2 flex items-center justify-start gap-3 "
          >
            <h2>
              <i className="ri-map-pin-fill text-lg h-10 w-10 rounded-full flex justify-center items-center bg-gray-200 "></i>
            </h2>
            <h4 className="font-medium">{ele}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
